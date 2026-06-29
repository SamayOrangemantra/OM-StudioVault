# UI Backup — pre-Mastercard-inspired migration

Snapshot of the full UI implementation taken **before** the design-system
migration. This is the champagne-gold-on-charcoal "editorial luxury" system
(Inter + Cormorant Garamond).

## What's here
- `src/` — complete source tree at backup time
- `tailwind.config.js`, `postcss.config.js`, `index.html`, `jsconfig.json`, `vite.config.js`

## How to restore (instant revert)

From the project root (`/home/orange/Desktop/aura`):

```bash
# Restore source + configs from the backup
rm -rf src
cp -r backup/current-ui/src src
cp backup/current-ui/tailwind.config.js \
   backup/current-ui/postcss.config.js \
   backup/current-ui/index.html \
   backup/current-ui/jsconfig.json \
   backup/current-ui/vite.config.js .

# Reinstall not required (no dependency changes). Just rebuild:
npm run build
```

To restore a single file instead, copy just that path, e.g.:

```bash
cp backup/current-ui/src/components/ui/Button.jsx src/components/ui/Button.jsx
```
