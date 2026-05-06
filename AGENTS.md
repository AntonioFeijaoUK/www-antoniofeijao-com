# AGENTS.md

## Working style

- Use British English.
- Be concise, precise, and technical.
- Prefer minimal, high-confidence changes over broad refactors.
- Work one file at a time where practical; when a small coherent change requires multiple files, keep the edit set minimal and explain why.
- Before editing, inspect the current file and preserve existing working behaviour.
- Do not rename, move, or delete files unless explicitly instructed.
- Do not introduce new dependencies unless explicitly justified and approved.
- Prefer maintainability, readability, and low operational risk.

## Safety and change control

- Treat this repository as a production-style static website codebase.
- Make narrowly scoped edits.
- Show or describe the intended change before making large edits.
- Preserve existing URLs, permalinks, and working navigation unless explicitly asked to change them.
- Do not overwrite working layouts, includes, or content structures with speculative alternatives.
- Do not remove front matter fields unless they are clearly obsolete for Jekyll and the change is intentional.
- Preserve `layout`, `permalink`, `redirect_from`, and collection-specific front matter unless intentionally changing page behaviour.
- Do not make hidden assumptions; state them clearly.

## Architecture expectations

- This is a Jekyll site with source root in `docs/`.
- Use GitHub Pages-compatible patterns only.
- Prefer built-in Jekyll capabilities over plugins.
- Keep the current architecture:
  - `_posts/` = blog posts
  - `_cyber/` = cyber collection
  - `_crypto/` = crypto collection
  - `_pages/` = pages collection
  - `timeline/` = static section for now
- Landing pages live in normal folders, for example:
  - `docs/blog/index.md`
  - `docs/cyber/index.md`
  - `docs/crypto/index.md`
  - `docs/pages/index.md`
- Shared layout:
  - `docs/_layouts/default.html`
- Shared card include:
  - `docs/_includes/content-card.html`
- Navigation is data-driven:
  - `docs/_data/navigation.yml`

## Coding and markup preferences

- Keep code simple and explicit.
- Prefer clear comments when writing scripts or non-obvious logic.
- Preserve existing formatting unless there is a reason to normalise it.
- For Markdown front matter, prefer stable and explicit keys such as:
  - `title`
  - `date`
  - `description`
  - `cover`
  - `tags`
- Do not use reserved Jekyll keys incorrectly.
- Do not convert collection source folders into normal folders.
- Keep collection source in underscore-prefixed folders and landing pages in normal folders.

## CSS and UI preferences

- Keep the site lightweight and dependency-free.
- Prefer local CSS over external frameworks.
- Avoid flashy UI changes.
- Keep typography readable but not oversized.
- Preserve the current visual direction unless explicitly asked to redesign.
- For listing pages, prefer compact, professional card layouts.
- For article pages, prefer moderate reading width and readable spacing.

## Validation expectations

- After changes, validate that the site still builds with Jekyll.
- Prefer checking the smallest relevant surface first.
- For build-only validation, prefer:

  `bundle exec jekyll build --source docs --destination docs/_site`

- Do not claim something works unless it has been verified from the available evidence.
- If something cannot be verified, say so explicitly.

## Local build context

- Local testing is done with Docker.
- The Jekyll command used in-container is:

  `bundle exec jekyll serve --source docs --destination docs/_site --host 0.0.0.0 --livereload`

- Treat `docs/_site/` as build output, not source.
- Never edit `docs/_site/`; regenerate it via Jekyll when needed.

## Preferred workflow for complex tasks

When a task is non-trivial:

1. Summarise the current state briefly.
2. Identify the smallest safe change.
3. Apply the change.
4. Explain what changed and what still needs verification.

## Done when

A change is done when:

- it respects the existing architecture
- it keeps URLs and working behaviour stable
- it avoids unnecessary dependency or structure changes
- it is easy to review
- it is technically correct and appropriately cautious
- the relevant `git diff` has been inspected before finalising and only intentional changes are summarised

## Assets

- Optimise new images before adding them.
- Prefer existing assets where suitable.
- Avoid large media files unless explicitly approved.
- For article images, prefer a modern cinematic 3D enterprise infographic style: strong depth, polished glass-like interface panels, subtle cyan/blue/teal lighting, realistic professional workspace or security context, clean icon-led workflow, minimal readable text, and a calm trustworthy AI/security aesthetic.
- Use visual storytelling rather than dense labels. Avoid clutter, brand logos, cartoon style, stock-photo feel, tiny unreadable text, fear imagery, and humanoid robot cliches unless explicitly requested.

## Task prompt pattern

For non-trivial tasks, prefer this structure:

- Goal: what should change
- Context: which files, folders, examples, or errors matter
- Constraints: architecture, safety, style, and dependency rules to follow
- Done when: what must be true before the task is complete

For larger or riskier changes:

- inspect first
- summarise the current state briefly
- identify the smallest safe change
- then implement
