# ioarts.eu

The ioarts.eu storefront is a responsive art and design site built with Next.js. It gets product and collection content from Hygraph and includes home, shop, collection, product, contact, and policy pages.

## Features

- Product and collection listings powered by Hygraph
- Product detail pages with image galleries and metadata
- Responsive storefront layout and navigation
- Terms of sale, privacy, copyright, and contact pages
- Sitemap, Open Graph metadata, and structured data

## Tech stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Hygraph GraphQL API
- pnpm (the repository includes `pnpm-lock.yaml`)

## Getting started

### Prerequisites

- Node.js 20.9 or later
- Corepack with pnpm enabled
- A Hygraph project with the product and category content used by this site

### Install and run

```bash
corepack enable
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment variables

Create a `.env.local` file in the project root:

```dotenv
# Hygraph GraphQL API endpoint. Use the server-only variable when possible.
HYGRAPH_ENDPOINT=https://your-region.hygraph.com/v2/your-project-id/master

# Optional: required only if your Hygraph API requires a token.
# Keep this server-only; do not prefix it with NEXT_PUBLIC_.
HYGRAPH_TOKEN=

# Optional: used for canonical URLs, sitemap entries, and metadata.
NEXT_PUBLIC_SITE_URL=https://www.ioarts.eu
```

The site also accepts `NEXT_PUBLIC_HYGRAPH_ENDPOINT` if a public endpoint is needed. If neither endpoint variable is set, the home page shows a Hygraph setup message and product or collection data is unavailable. Never commit `.env.local` or API tokens.

In Hygraph, make the GraphQL API available to this app and provide the product and category fields queried by the application, including product names, slugs, prices, descriptions, images, and category names and slugs. Product images should use URLs supported by the site's Next.js image configuration.

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run the configured lint command |

## Project structure

```text
app/                  App Router pages, layouts, metadata, and sitemap
components/           Shared layout, product, cart, and UI components
lib/hygraph/          Hygraph client, queries, data adapters, and types
public/               Static images, icons, and other public assets
styles/               Shared styles
```

## Deployment

Deploy as a Next.js application on Vercel or another platform that supports Next.js. Configure `HYGRAPH_ENDPOINT` (and `HYGRAPH_TOKEN` if needed) in the deployment environment. Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL when it differs from `https://www.ioarts.eu`.
