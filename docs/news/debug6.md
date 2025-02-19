## section 1

{{ list_cybernews(blog.posts) }}

---

## Instead of printing the whole configuration, output only serialisable parts, for example:

Site Name: {{ config.site_name }}
Site URL: {{ config.site_url }}

---

## Iterate over keys (if supported)

{% for key, value in config.items() %}
- **{{ key }}:** {{ value }}
{% endfor %}

---

## This worked

```
Instead of printing the whole configuration, output only serialisable parts, for example:

Site Name: Antonio Feijao UK, Cyber Security Architect, learning by doing. Site URL: https://www.antoniofeijao.com/

Iterate over keys (if supported):

config_file_path: /home/runner/work/www-antoniofeijao-com/www-antoniofeijao-com/mkdocs.yml

site_name: Antonio Feijao UK, Cyber Security Architect, learning by doing.

nav: None

pages: None

exclude_docs: None

draft_docs: None

not_in_nav: None

site_url: https://www.antoniofeijao.com/

site_description: Antonio Feijao UK, Cyber Security Architect @GenomicsEngland. Expertise and skills in AWS, Networking, Security, Infrastructure, CyberSecurity, Linux, MacOS, Python

site_author: Antonio Feijao UK

theme: Theme(name='material', dirs=['/opt/hostedtoolcache/Python/3.13.2/x64/lib/python3.13/site-packages/material/templates', '/opt/hostedtoolcache/Python/3.13.2/x64/lib/python3.13/site-packages/mkdocs/templates'], static_templates={'sitemap.xml', '404.html'}, name='material', locale=Locale('en'), language='en', direction=None, features=['navigation.instant', 'navigation.tracking', 'content.code.annotate', 'navigation.tabs', 'navigation.sections', 'navigation.expand', 'navigation.indexes', 'navigation.top', 'toc.follow', 'toc.integrate'], font=False, icon=None, favicon='/favicon.ico', logo='assets/images/Antonio-Feijao-UK.jpeg', highlightjs=True, hljs_languages=['yaml'], shortcuts={'help': 72, 'next': 78, 'previous': 80, 'search': 83}, navigation_depth=4, palette={'name': 'color-scheme-dark', 'scheme': 'slate', 'primary': 'black', 'accent': 'deep orange', 'toggle': {'icon': 'material/lightbulb-outline', 'name': 'Switch to light mode'}})

docs_dir: /home/runner/work/www-antoniofeijao-com/www-antoniofeijao-com/docs

site_dir: /home/runner/work/www-antoniofeijao-com/www-antoniofeijao-com/site

copyright: Copyright © 2025, Antonio Feijao UK. All rights reserved.

google_analytics: None

dev_addr: 127.0.0.1:8000

use_directory_urls: True

repo_url: None

repo_name: None

edit_uri_template: None

edit_uri: None

extra_css: []

extra_javascript: []

extra_templates: []

markdown_extensions: ['toc', 'tables', 'fenced_code', 'abbr', 'admonition', 'attr_list', 'def_list', 'footnotes', 'md_in_html', 'pymdownx.arithmatex', 'pymdownx.betterem', 'pymdownx.caret', 'pymdownx.details', 'pymdownx.emoji', 'pymdownx.highlight', 'pymdownx.inlinehilite', 'pymdownx.keys', 'pymdownx.mark', 'pymdownx.smartsymbols', 'pymdownx.superfences', 'pymdownx.tabbed', 'pymdownx.tasklist', 'pymdownx.tilde']

mdx_configs: {'toc': {'permalink': True}, 'pymdownx.arithmatex': {'generic': True}, 'pymdownx.betterem': {'smart_enable': 'all'}, 'pymdownx.emoji': {'emoji_index': , 'emoji_generator': }, 'pymdownx.highlight': {'anchor_linenums': True}, 'pymdownx.superfences': {'preserve_tabs': True}, 'pymdownx.tabbed': {'alternate_style': True}, 'pymdownx.tasklist': {'custom_checkbox': True}}

strict: False

remote_branch: gh-pages

remote_name: origin

extra: {'generator': False, 'social': [{'icon': 'fontawesome/solid/house', 'link': 'https://www.antoniofeijao.com/'}, {'icon': 'fontawesome/brands/linkedin', 'link': 'https://www.linkedin.com/in/antoniofeijaouk'}, {'icon': 'fontawesome/brands/github', 'link': 'https://github.com/AntonioFeijaoUK'}]}

plugins: {'material/privacy': , 'material/social': , 'material/blog': , 'material/search': , 'macros': , 'git-revision-date-localized': , 'material/tags': , 'pagetree': }

hooks: {}

watch: []

validation: {'nav': {'omitted_files': 20, 'not_found': 30, 'absolute_links': 20}, 'links': {'not_found': 30, 'absolute_links': 20, 'unrecognized_links': 20, 'anchors': 20}}

```
