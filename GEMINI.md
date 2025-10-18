This AstroJS project is for creating html newsletters that are copied and sent via a web email service. Newsletters are an Astro collection stored in `src/content/newsletters/`, each newsletter having a separate folder containing its index.md and also all images used in that newsletter.

It has a github action for automatic build and deployment to github pages.

It also uses SveltiaCMS in `./public/admin` backed by the OAuth service implemented as a Cloudflare worker in `./oauth_cloudflare_service/`.