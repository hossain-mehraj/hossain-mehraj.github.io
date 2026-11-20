/**
 * Turns Markdown images into captioned figures.
 *
 *   ![alt text](./photo.jpg "Caption")           -> <figure><img><figcaption>
 *   A paragraph that holds only images (2 or more) -> <div class="gallery"> of figures
 *
 * The image title becomes the caption. The images stay ordinary Markdown images,
 * so Astro still optimises them (resized, WebP, lazy-loaded).
 */
const isBlank = (n) => (n.type === 'text' && !n.value.trim()) || n.type === 'break';

// Tell Astro how wide each image is actually displayed, so it doesn't ship
// oversized files (content column is 720px; galleries span up to 960px).
const SIZES = {
  1: { width: 1440, sizes: '(min-width: 768px) 720px, 100vw' },
  2: { width: 1440, sizes: '(min-width: 1000px) 472px, (min-width: 641px) 50vw, 100vw' },
  3: { width: 1280, sizes: '(min-width: 1000px) 309px, (min-width: 641px) 33vw, 100vw' },
};

function toFigure(image, perRow) {
  image.data = { ...image.data, hProperties: { ...(image.data?.hProperties ?? {}), ...SIZES[perRow] } };
  const caption = image.title;
  image.title = null;
  const children = [image];
  if (caption) {
    children.push({
      type: 'figcaption',
      data: { hName: 'figcaption' },
      children: [{ type: 'text', value: caption }],
    });
  }
  return { type: 'figure', data: { hName: 'figure' }, children };
}

export default function remarkFigures() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type !== 'paragraph') {
          walk(child);
          return child;
        }
        const content = child.children.filter((c) => !isBlank(c));
        if (!content.length || !content.every((c) => c.type === 'image')) return child;
        const perRow = Math.min(content.length, 3);
        const figures = content.map((img) => toFigure(img, perRow));
        if (figures.length === 1) return figures[0];
        return {
          type: 'gallery',
          data: {
            hName: 'div',
            hProperties: { className: ['gallery', `gallery-${perRow}`] },
          },
          children: figures,
        };
      });
    };
    walk(tree);
  };
}
