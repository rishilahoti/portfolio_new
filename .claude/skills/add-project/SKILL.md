---
name: add-project
description: Add a new project entry to the portfolio's Projects section. Use when the user wants to showcase a new project, repo, or site on the site.
---

# Add Project

Adds one entry to the `projects` array in `src/app/data.js`, which the home page (`src/app/page.js`) renders via the `Projects` component.

## Steps

1. Ask for (or infer from context/repo/README) whatever of these aren't given:
   - `title` — short project name
   - `description` (required to render — `page.js` filters out entries missing `title` or `src`), plus optional `description2`/`description3` for tech stack / feature callouts (see existing entries in `data.js` for tone)
   - `src` — filename of a static asset already in `public/` (image or `.mp4`). If the asset doesn't exist yet, ask the user for the file (or a path to it) and place it in `public/` before wiring the entry — don't invent a filename.
   - `link` — repo or live URL (empty string `''` if none yet)
   - `color` — hex background accent color; pick one that's visually distinct from existing entries' `color` values
2. Append the new object to the end of the `projects` array in `src/app/data.js`, matching existing formatting (tabs, single quotes, trailing comma).
3. Confirm the referenced `src` file exists in `public/` (`ls public/`) — if missing, tell the user rather than guessing.
