# Sugar Down — Shopify Hydrogen

Headless storefront using **Shopify Hydrogen**, **React Router 7**, and **Vite** ([Hydrogen docs](https://shopify.dev/docs/custom-storefronts/hydrogen)).

The previous **Next.js** implementation is preserved under `archive/next-app/` for reference (legacy HTML/CSS in `legacy-pages/` and `legacy-css/` is unchanged).

## Requirements

- **Node.js** 22 or 24 (`engines` in `package.json`)
- Shopify store with **Headless** / **Hydrogen** channel and **Storefront API** access

## Setup

1. **Environment**

   ```bash
   cp .env.example .env
   ```

   Set `SESSION_SECRET` (at least 32 characters). Add storefront variables from Shopify Admin or CLI:

   ```bash
   npx shopify hydrogen link --storefront "Sugar Down"
   ```

2. **Install**

   ```bash
   npm install
   ```

3. **Develop**

   ```bash
   npm run dev
   ```

## Scripts

| Script          | Description                                      |
|-----------------|--------------------------------------------------|
| `npm run dev`   | Local dev server with codegen                    |
| `npm run build` | Production build (`dist/` + Oxygen bundle)       |
| `npm run preview` | Preview production build locally               |
| `npm run codegen` | GraphQL codegen + React Router typegen       |
| `npm run typecheck` | TypeScript check                           |

## Deploy

Deploy to **Shopify Oxygen** from the Shopify admin or CI ([Hydrogen deployment](https://shopify.dev/docs/custom-storefronts/hydrogen/deploy)).

## Customer Account API (`/account`)

See [Hydrogen Customer Account API setup](https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/hydrogen).
