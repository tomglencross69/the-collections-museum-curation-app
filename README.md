# TheCollections - Exhibition/Musuem Curation Platform

# Live - here! [TheCollections](https://the-collections-museum-curation-app.vercel.app/)

TheCollections is a virtual space for exploring and curating exhibitions from two heritage collections, designed with a clean, accessible user experience in mind.

Built with Nuxt 3, Pinia, and TailwindCSS, it integrates two open-access APIs to deliver a fully responsive interface, intuitive navigation, and user-curated exhibitions.

## Features

- Search across collections from the **Portable Antiquities Scheme** and **Europeana** APIs with pagination.
- Filter and sort records
- Individual artwork views with images and essential metadata
- Save artworks to temporary exhibitions and view them in curated galleries
- Built with responsiveness, accessibility, and semantic HTML.

## Tech Stack

- Built in Nuxt 3, a framework based on Vue 3.
- Uses Pinia as a lightweight state management tool
- Styled with TailwindCSS for responsiveness and accessibility
- Queried and normalised data from Portable Antiquities Scheme API and Europeana API

## Figma and Wireframes 
- You can view the Figma, planning, wireframes and component tree for the project here: [Figma](https://www.figma.com/board/GneUPcx4qQbnQFL75d1iGA/museum-curator?node-id=0-1&p=f&t=n7RRd4SXXz3gYvAo-0)

---

## Setup, Development, and Environment Variables 

To run a development server and explore TheCollections locally:

1. Install dependencies:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install
```

2. Run the local dev server at http://localhost:3000:

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev

# bun
bun run dev
```
Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information on running your own development server, and on production.

3. In order to successfully query the Europeana API and run the app locally, visit https://apis.europeana.eu/en, and follow the 'request an api key' link to make an account.

4. Add your API keys to a `.env` file in the root directory in the following format:

```
EUROPEANA_API=your_europeana_key_here
```

`.env` is ignored in version control by default (`.gitignore` included).

## MVP Goals

- [x] Search artworks from two APIs, querying and normalising their data 
- [x] Paginated list browsing
- [x] Designing an accessible, responsive UI with Tailwind and semantic HTML and descriptive class names
- [x] Filtering/sorting capabilities
- [x] Detail views with metadata
- [x] Securing API keys in `.env` for local development
- [x] Save/remove artworks in a curated "exhibition"
- [x] View user-curated exhibition page, using Pinia and `localStorage` for persistent, reactive state.
- [x] Project hosted publicly with complete documentation

## Scope for further development...
- [ ] Implement database storage for user accounts and authentication
- [ ] Saved collections are currently managed in Pinia and persistant 'localStorage'; for production scalability and data integrity, saved collections should be migrated to a database with access handled through RESTful API endpoints
- [ ] Additional API searches collections, with more complex search filters


## Author

**Tom Glencross**  
🌐 [tomglencross.com](https://tomglencross.com)



