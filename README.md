# kings-chair

Static Astro gallery site for King's Chair — a hairdressing salon.

## Local development

```bash
npm install
npm run dev
```

Open the URL Astro prints (usually http://localhost:4321).

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Customisation

- Logo: `src/assets/images/logo.png` (brand colours: `#ffffff`, `#313131`, `#f46910`)
- Hero image: `src/assets/images/hero.jpg`
- Gallery: `src/assets/images/gallery/` — update entries in `src/data/gallery.ts`
- Reviews: `src/data/reviews.ts`
- Update the Book now link in `src/components/Hero.astro` if you add a dedicated booking URL
