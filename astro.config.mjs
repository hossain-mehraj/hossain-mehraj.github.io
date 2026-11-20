// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkFigures from './src/lib/remark-figures.mjs';
import rehypeTableLabels from './src/lib/rehype-table-labels.mjs';
import remarkTabs from './src/lib/remark-tabs.mjs';

export default defineConfig({
  site: 'https://hossain-mehraj.github.io',
  trailingSlash: 'ignore',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  markdown: {
    processor: unified({ remarkPlugins: [remarkFigures, remarkTabs], rehypePlugins: [rehypeTableLabels] }),
  },
});
