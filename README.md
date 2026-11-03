# Vocalis

La memoria musical de tu equipo de alabanza: tonos por director, versiones de casa y setlists para el próximo servicio.

This repository currently contains the mobile-first home page, built with mock data.

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- [daisyUI 5](https://daisyui.com) with a custom `vocalis` theme
- [Lucide](https://lucide.dev) icons
- Geist and Quicksand via `next/font`

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start the dev server     |
| `npm run build` | Create a production build |
| `npm start`     | Serve the production build |
| `npm run lint`  | Run ESLint               |

## Structure

```text
app/                 Routes, layout, metadata and global theme
components/          Brand, layout and shared UI components
features/            Home, songs, team and setlist code
assets/              Vocalis brand assets
```

Brand colors and typography live in `app/globals.css`. Home data is mocked in `features/*/data`.
