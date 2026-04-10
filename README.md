# antoniofeijao-com

Source repository for [AntonioFeijao.com](https://www.AntonioFeijao.com).

This is a GitHub Pages-compatible Jekyll site with its source rooted in `docs/`.

## Structure

- `docs/_posts/` contains blog posts.
- `docs/_cyber/` contains the cyber collection.
- `docs/_crypto/` contains the crypto collection.
- `docs/_pages/` contains standalone pages.
- `docs/blog/`, `docs/cyber/`, `docs/crypto/`, and `docs/pages/` contain the collection landing pages.
- `docs/_layouts/default.html` is the shared layout.
- `docs/_includes/content-card.html` is the shared content card include.

## Local development

Local development is Docker-based:

```bash
./serve-jekyll.sh
```

The site is served from `docs/` and writes generated output to `docs/_site/`.

## Notes

- Treat `docs/_site/` as generated output, not source.
- Prefer GitHub Pages-compatible Jekyll patterns.
