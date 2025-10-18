# Newsletter Creator

## Instructions

Open https://michalfapso.github.io/vlk_newsletter_creator/, then either open the "Admin" link for creating/editing newsletters or open a newsletter, copy it from browser and paste it to an email body.

## Project Structure

```text
/
├── public/
│   └── admin/  - for editing content via SveltiaCMS directly in browser
│   └── assets/ - static images (newsletter header and footer images used in all newsletters)
├── src/        - all editable content
│   └── content/
│       └── newsletters/ - all newsletters
│           └── 2025-10-15_pokus/ - a single newsletter folder with index.mdx and all images
│   └── pages/  - other individual pages and templates
└── oauth_cloudflare_service/ - OAuth service needed for SveltiaCMS to be able to authenticate with github
```

## AstroJS Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## DecapCMS with Cloudflare Worker Authentication

This project is configured to use DecapCMS for content management, with a Cloudflare Worker handling GitHub OAuth for authentication.

### Setup Instructions:

1.  **Create a GitHub OAuth App**:
    *   Go to your GitHub settings > "Developer settings" > "OAuth Apps" and create a new app.
    *   **Homepage URL**: Set this to your GitHub Pages URL (e.g., `https://michalfapso.github.io/vlk_newsletter_creator`).
    *   **Authorization callback URL**: You will get this from your Cloudflare Worker in the next steps. For now, you can use your Homepage URL as a placeholder.
    *   Generate a **Client Secret** and keep it safe. You will also need the **Client ID**.

2.  **Deploy the Cloudflare Worker**:
    *   You will need a Cloudflare account and the `wrangler` CLI installed (`npm install -g wrangler`).
    *   Log in to your Cloudflare account with `wrangler login`.
    *   In the project root, run `wrangler deploy`. This will deploy the worker defined in `index.js` and `wrangler.toml`.
    *   After deployment, you will get a worker URL (e.g., `https://vlk-newsletter-creator-decap-oauth.your-subdomain.workers.dev`).

3.  **Configure Worker Secrets**:
    *   In your Cloudflare dashboard, go to the worker's settings.
    *   Under "Environment Variables", add two secrets:
        *   `GITHUB_CLIENT_ID`: Your GitHub OAuth App's Client ID.
        *   `GITHUB_CLIENT_SECRET`: Your GitHub OAuth App's Client Secret.

4.  **Update GitHub OAuth App**:
    *   Go back to your GitHub OAuth App settings.
    *   Update the **Authorization callback URL** to your worker's URL.

5.  **Update DecapCMS Configuration**:
    *   In `public/admin/config.yml`, replace `<YOUR_WORKER_URL>` with your actual worker URL.

6.  **Access the CMS**:
    *   Once everything is configured, you can access the CMS at `/admin` on your GitHub Pages site.