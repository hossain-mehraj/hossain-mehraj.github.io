/**
 * Turns Markdown images into captioned figures.
 *
 *   ![alt text](./photo.jpg "Caption")             -> <figure><img><figcaption>
 *   A paragraph that holds only images (2 or more) -> <div class="gallery"> of figures
 *   Title starting with "[wide]"                   -> wider than the text column on large screens
 *
 * The image title becomes the caption. Images are never cropped: in a gallery row each
 * figure gets a flex-grow equal to its aspect ratio, so every image in the row ends up
 * the same height and is shown whole. The images stay ordinary Markdown images, so Astro
 * still optimises them (resized, WebP, lazy-loaded).
 */
import path from 'node:path';
import sharp from 'sharp';

// Start an image's title with "[wide]" to let it break out of the text column on large screens.
const WIDE_TAG = /^\[wide\]\s*/;
const isBlank = (n) => (n.type === 'text' && !n.value.trim()) || n.type === 'break';

// Tell Astro how wide each image is displayed (content column is 640px).
const WIDE = { width: 1920, sizes: '(min-width: 1048px) 1000px, calc(100vw - 48px)' };
const SIZES = {
  1: { width: 1440, sizes: '(min-width: 700px) 640px, 100vw' },
  2: { width: 1440, sizes: '(min-width: 700px) 320px, 100vw' },
  3: { width: 1280, sizes: '(min-width: 700px) 213px, 100vw' },
};

async function aspect(file, url) {
  if (/^[a-z]+:/i.test(url) || !file.path) return 1.5;
  try {
    const m = await sharp(path.resolve(path.dirname(file.path), decodeURI(url))).metadata();
    return m.width && m.height ? m.width / m.height : 1.5;
  } catch {
    return 1.5;
  }
}

function toFigure(image, perRow, ratio, wide) {
  image.data = { ...image.data, hProperties: { ...(image.data?.hProperties ?? {}), ...(wide ? WIDE : SIZES[perRow]) } };
  const caption = image.title?.replace(WIDE_TAG, '') || null;
  image.title = null;
  const children = [image];
  if (caption) {
    children.push({ type: 'figcaption', data: { hName: 'figcaption' }, children: [{ type: 'text', value: caption }] });
  }
  const props = {};
  if (perRow > 1) props.style = `flex: ${ratio.toFixed(4)} 1 0%`;
  if (wide && perRow === 1) props.className = ['wide'];
  return { type: 'figure', data: { hName: 'figure', hProperties: props }, children };
}

export default function remarkFigures() {
  return async (tree, file) => {
    const jobs = [];
    const walk = (node) => {
      if (!node.children) return;
      node.children.forEach((child, i) => {
        if (child.type !== 'paragraph') return walk(child);
        const content = child.children.filter((c) => !isBlank(c));
        if (!content.length || !content.every((c) => c.type === 'image')) return;
        jobs.push(
          (async () => {
            const perRow = Math.min(content.length, 3);
            const ratios = await Promise.all(content.map((img) => aspect(file, img.url)));
            const wide = content.some((img) => WIDE_TAG.test(img.title ?? ''));
            const figures = content.map((img, j) => toFigure(img, perRow, ratios[j], wide));
            node.children[i] =
              figures.length === 1
                ? figures[0]
                : { type: 'gallery', data: { hName: 'div', hProperties: { className: wide ? ['gallery', 'wide'] : ['gallery'] } }, children: figures };
          })(),
        );
      });
    };
    walk(tree);
    await Promise.all(jobs);
  };
}
