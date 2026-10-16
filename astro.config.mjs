// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// TODO(owner): replace `site` with the production domain before deploy.
// It is required for canonical URLs, sitemap.xml and robots.txt.
export default defineConfig({
  site: 'https://example.com',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/styleguide'),
    }),
  ]
});
