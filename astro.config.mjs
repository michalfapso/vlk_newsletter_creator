// @ts-check
import { defineConfig } from 'astro/config';
import rehypeRewrite from 'rehype-rewrite';

import mdx from '@astrojs/mdx';

// const SITE_URL = 'https://michalfapso.github.io/vlk_newsletter_creator';
const SITE_URL = 'http://localhost:4321';

export default defineConfig({
  site: SITE_URL,

  markdown: {
    rehypePlugins: [
      [rehypeRewrite, {
        // Odstránili sme `selector`, aby funkcia bežala pre každý element
        rewrite: (node) => {
          //console.log('node:', node);
          if (node.type !== 'element') return;

          // Logika pre obrázky bola presunutá do MarkdownImage.astro.
          // Tento plugin sa teraz stará len o ostatné elementy.

          // 1. Pravidlo pre NADPISY 2. ÚROVNE (<h2>)
          if (node.tagName === 'h2') {
            node.properties.style = 'color:#007bff; font-size:20px; margin:30px 0 15px; font-family: Roboto, Arial, sans-serif;';
          }

          // 3. Pravidlo pre ODSTAVCE (<p>)
          if (node.tagName === 'p') {
            // Pridáme len štýly, ktoré sú špecifické pre obsah
            node.properties.style = 'margin: 0 0 15px; text-align:justify;';
          }
          
          // ... sem môžeš pridať ďalšie pravidlá pre <h1>, <h3>, <ul> atď.
        }
      }],
    ],
  },

  integrations: [mdx()],
});