# Project Guidelines — chrod-portfolio-v2

Personal developer portfolio built with **Astro 5** and **Tailwind CSS 4**.

---

# Project Goal

This project is a **modern personal developer portfolio**.

Goals:

- Showcase projects and technical skills
- Present professional experience
- Provide a way for potential clients or recruiters to contact me
- Maintain a minimal, modern, and high-performance website

Target audience:

- Recruiters
- Potential freelance clients
- Other developers

---

# Architecture

- `src/pages/` — Astro page files (file-based routing). Each `.astro` file = one route.
- `src/components/ui/` — Small reusable UI components (buttons, badges, cards).
- `src/components/sections/` — Full page sections (Hero, Projects, Contact).
- `src/components/layout/` — Layout components (Navbar, Footer, Container).
- `src/layouts/` — Page layout wrappers.
- `src/styles/global.css` — Global styles entry point; imports Tailwind via `@import "tailwindcss"`.
- `public/` — Static assets served as-is (favicons, images, fonts).

---

# Website Structure

The portfolio should contain the following sections:

- Hero / Introduction
- About Me
- Skills / Technologies
- Projects / Portfolio
- Reviews / Testimonials (optional)
- Experience (optional)
- Contact (Should be a contact form displayed in a drawer)
- Footer

Sections should be implemented as reusable components.

---

# Build & Dev

```bash
npm run dev       # Dev server at http://localhost:4321
npm run build     # Production build → ./dist/
npm run preview   # Preview production build locally
```

---

# Code Style

- **TypeScript strict mode** — all `.astro` frontmatter and `.ts` files must satisfy `astro/tsconfigs/strict`.
- **Tailwind CSS 4** — use utility classes directly in markup.
- Avoid custom CSS unless strictly necessary.
- Keep components small and reusable.
- Use arrow functions for React components.

---

# Framework Usage

- Prefer **Astro components (`.astro`)** by default.
- Use **React components only when real interactivity is required**.

Examples of when to use React:

- interactive forms
- animated UI components
- stateful UI
- filters or tabs
- complex client-side logic

When using React, load components with Astro client directives:

- `client:load`
- `client:visible`
- `client:idle`

Avoid unnecessary client-side JavaScript.

---

# Animations

Animations should be **subtle and performant**.

Preferred options:

- CSS transitions
- Motion One for simple animations

Use animations mainly for:

- section entrance
- hover interactions
- small UI feedback

Avoid heavy or distracting animations.

---

# Design Guidelines

Design style:

- Dark theme by default
- Minimal
- Modern
- Clean layout
- Focus on readability and spacing

Colors:

- The design should prioritize a **dark UI**
- Use neutral dark backgrounds
- Ensure strong contrast for readability

Layout:

- Use centered content containers
- Max content width around `1200px`
- Large spacing between sections

Components:

- Rounded corners
- Soft shadows
- Subtle hover effects

Typography:

- Clear hierarchy using larger headings
- Tailwind typography utilities

---

# Branding

The project includes a personal logo.

Logo guidelines:

- The logo file is located at `public/chrod-logo.png`
- It should be referenced using `/chrod-logo.png`
- The overall color palette of the website should be derived from the colors used in the logo
- UI elements such as buttons, links, and accents should reuse the logo's primary colors
- The design should remain consistent with the logo branding

Usage example:

<img src="/chrod-logo.png" alt="Site logo" class="h-8 w-auto" />

---

# Projects

Projects displayed in the portfolio should include:

- Project name
- Short description
- Technologies used
- GitHub repository link
- Live demo link (optional)

Projects should be displayed as **responsive cards in a grid layout**.

---

# Performance Guidelines

- Prefer **static rendering**
- Avoid unnecessary JavaScript
- Use Astro islands only when needed
- Optimize images
- Lazy load interactive components when possible

---

# Accessibility

- Use semantic HTML elements
- Include alt text for images
- Ensure sufficient color contrast
- Interactive elements must be keyboard accessible

---

# Naming Conventions

Files:

- Components → PascalCase (`ProjectCard.astro`)
- Sections → PascalCase (`HeroSection.astro`)
- React components → PascalCase (`ContactForm.tsx`)

Folders:

- `ui`
- `sections`
- `layout`

---

# Conventions

- One `<html>` root per page layout.
- Pages import layouts and pass content via slots.
- Favicon assets live in `public/` (`favicon.svg` + `favicon.ico`).
- Keep frontmatter minimal — derive values instead of over-proping.
- Prefer composition over large components.

---

# Copilot Guidance

When generating code:

- Prefer **Astro components**
- Use **Tailwind utilities**
- Keep markup clean and readable
- Use **mobile-first responsive design**
- Avoid unnecessary wrappers
- Maintain consistent spacing
