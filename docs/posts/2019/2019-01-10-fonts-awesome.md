---
categories:
    - Training
    - Websites
tags:
    - fonts
    - fontawesome
    - markdown
    - webpage
---

Fonts Awesome install

- [https://pypi.org/project/fontawesome-markdown/](https://pypi.org/project/fontawesome-markdown/)

`pip install fontawesome`

`pip install fontawesome-markdown`

---


## List Fonts Awesome icons working with mkdocs

??? success "Click to reveal command used to create the list below"
    `cat font-awesome.css | tr '.' '\n' | grep before | awk -F ":" '{ print ":" $1 ": - `" $1 "` \n" }'`
    
    As I am using the mkdocs-material theme, so the css file with the icons is in this folder `(...python version..)/site-packages/material/assets/fonts`

Using python

```python
import fontawesome_markdown

fontawesome_markdown.icon_list.icons

('glass',
 'music',
 'search',
 'envelope-o',
 'heart',
 'star',
 'star-o',
 'user',
 'film',
 'th-large',
 'th',
 'th-list',
 'check',
 (...)
```



!!! help
    The below list took me quite a while to find and then to create. Do you know a better way?


- <https://fontawesome.com/icons?d=gallery&s=fab-,fas-&m=free>

- <https://github.com/bmcorser/fontawesome-markdown/blob/master/fontawesome_markdown/icon_list.py>
- <https://bwmarrin.github.io/MkDocsPlus/fontawesome/>

- <https://pypi.org/project/fontawesome-markdown/>

:fa-glass: - `fa-glass`

:fa-music: - `fa-music`

:fa-search: - `fa-search`

:fa-envelope-o: - `fa-envelope-o`

:fa-heart: - `fa-heart`

:fa-star: - `fa-star`

:fa-star-o: - `fa-star-o`

:fa-user: - `fa-user`

:fa-film: - `fa-film`

:fa-th-large: - `fa-th-large`

:fa-th: - `fa-th`

:fa-th-list: - `fa-th-list`

:fa-check: - `fa-check`

:fa-remove: - `fa-remove`

:fa-close: - `fa-close`

:fa-times: - `fa-times`

:fa-search-plus: - `fa-search-plus`

:fa-search-minus: - `fa-search-minus`

:fa-power-off: - `fa-power-off`

:fa-signal: - `fa-signal`

:fa-gear: - `fa-gear`

:fa-cog: - `fa-cog`

:fa-trash-o: - `fa-trash-o`

:fa-home: - `fa-home`

:fa-file-o: - `fa-file-o`

:fa-clock-o: - `fa-clock-o`

:fa-road: - `fa-road`

:fa-download: - `fa-download`

:fa-arrow-circle-o-down: - `fa-arrow-circle-o-down`

:fa-arrow-circle-o-up: - `fa-arrow-circle-o-up`

:fa-inbox: - `fa-inbox`

:fa-play-circle-o: - `fa-play-circle-o`

:fa-rotate-right: - `fa-rotate-right`

:fa-repeat: - `fa-repeat`

:fa-refresh: - `fa-refresh`

:fa-list-alt: - `fa-list-alt`

:fa-lock: - `fa-lock`

:fa-flag: - `fa-flag`

:fa-headphones: - `fa-headphones`

:fa-volume-off: - `fa-volume-off`

:fa-volume-down: - `fa-volume-down`

:fa-volume-up: - `fa-volume-up`

:fa-qrcode: - `fa-qrcode`

:fa-barcode: - `fa-barcode`

:fa-tag: - `fa-tag`

:fa-tags: - `fa-tags`

:fa-book: - `fa-book`

:fa-bookmark: - `fa-bookmark`

:fa-print: - `fa-print`

:fa-camera: - `fa-camera`

:fa-font: - `fa-font`

:fa-bold: - `fa-bold`

:fa-italic: - `fa-italic`

:fa-text-height: - `fa-text-height`

:fa-text-width: - `fa-text-width`

:fa-align-left: - `fa-align-left`

:fa-align-center: - `fa-align-center`

:fa-align-right: - `fa-align-right`

:fa-align-justify: - `fa-align-justify`

:fa-list: - `fa-list`

:fa-dedent: - `fa-dedent`

:fa-outdent: - `fa-outdent`

:fa-indent: - `fa-indent`

:fa-video-camera: - `fa-video-camera`

:fa-photo: - `fa-photo`

:fa-image: - `fa-image`

:fa-picture-o: - `fa-picture-o`

:fa-pencil: - `fa-pencil`

:fa-map-marker: - `fa-map-marker`

:fa-adjust: - `fa-adjust`

:fa-tint: - `fa-tint`

:fa-edit: - `fa-edit`

:fa-pencil-square-o: - `fa-pencil-square-o`

:fa-share-square-o: - `fa-share-square-o`

:fa-check-square-o: - `fa-check-square-o`

:fa-arrows: - `fa-arrows`

:fa-step-backward: - `fa-step-backward`

:fa-fast-backward: - `fa-fast-backward`

:fa-backward: - `fa-backward`

:fa-play: - `fa-play`

:fa-pause: - `fa-pause`

:fa-stop: - `fa-stop`

:fa-forward: - `fa-forward`

:fa-fast-forward: - `fa-fast-forward`

:fa-step-forward: - `fa-step-forward`

:fa-eject: - `fa-eject`

:fa-chevron-left: - `fa-chevron-left`

:fa-chevron-right: - `fa-chevron-right`

:fa-plus-circle: - `fa-plus-circle`

:fa-minus-circle: - `fa-minus-circle`

:fa-times-circle: - `fa-times-circle`

:fa-check-circle: - `fa-check-circle`

:fa-question-circle: - `fa-question-circle`

:fa-info-circle: - `fa-info-circle`

:fa-crosshairs: - `fa-crosshairs`

:fa-times-circle-o: - `fa-times-circle-o`

:fa-check-circle-o: - `fa-check-circle-o`

:fa-ban: - `fa-ban`

:fa-arrow-left: - `fa-arrow-left`

:fa-arrow-right: - `fa-arrow-right`

:fa-arrow-up: - `fa-arrow-up`

:fa-arrow-down: - `fa-arrow-down`

:fa-mail-forward: - `fa-mail-forward`

:fa-share: - `fa-share`

:fa-expand: - `fa-expand`

:fa-compress: - `fa-compress`

:fa-plus: - `fa-plus`

:fa-minus: - `fa-minus`

:fa-asterisk: - `fa-asterisk`

:fa-exclamation-circle: - `fa-exclamation-circle`

:fa-gift: - `fa-gift`

:fa-leaf: - `fa-leaf`

:fa-fire: - `fa-fire`

:fa-eye: - `fa-eye`

:fa-eye-slash: - `fa-eye-slash`

:fa-warning: - `fa-warning`

:fa-exclamation-triangle: - `fa-exclamation-triangle`

:fa-plane: - `fa-plane`

:fa-calendar: - `fa-calendar`

:fa-random: - `fa-random`

:fa-comment: - `fa-comment`

:fa-magnet: - `fa-magnet`

:fa-chevron-up: - `fa-chevron-up`

:fa-chevron-down: - `fa-chevron-down`

:fa-retweet: - `fa-retweet`

:fa-shopping-cart: - `fa-shopping-cart`

:fa-folder: - `fa-folder`

:fa-folder-open: - `fa-folder-open`

:fa-arrows-v: - `fa-arrows-v`

:fa-arrows-h: - `fa-arrows-h`

:fa-bar-chart-o: - `fa-bar-chart-o`

:fa-bar-chart: - `fa-bar-chart`

:fa-twitter-square: - `fa-twitter-square`

:fa-facebook-square: - `fa-facebook-square`

:fa-camera-retro: - `fa-camera-retro`

:fa-key: - `fa-key`

:fa-gears: - `fa-gears`

:fa-cogs: - `fa-cogs`

:fa-comments: - `fa-comments`

:fa-thumbs-o-up: - `fa-thumbs-o-up`

:fa-thumbs-o-down: - `fa-thumbs-o-down`

:fa-star-half: - `fa-star-half`

:fa-heart-o: - `fa-heart-o`

:fa-sign-out: - `fa-sign-out`

:fa-linkedin-square: - `fa-linkedin-square`

:fa-thumb-tack: - `fa-thumb-tack`

:fa-external-link: - `fa-external-link`

:fa-sign-in: - `fa-sign-in`

:fa-trophy: - `fa-trophy`

:fa-github-square: - `fa-github-square`

:fa-upload: - `fa-upload`

:fa-lemon-o: - `fa-lemon-o`

:fa-phone: - `fa-phone`

:fa-square-o: - `fa-square-o`

:fa-bookmark-o: - `fa-bookmark-o`

:fa-phone-square: - `fa-phone-square`

:fa-twitter: - `fa-twitter`

:fa-facebook-f: - `fa-facebook-f`

:fa-facebook: - `fa-facebook`

:fa-github: - `fa-github`

:fa-unlock: - `fa-unlock`

:fa-credit-card: - `fa-credit-card`

:fa-feed: - `fa-feed`

:fa-rss: - `fa-rss`

:fa-hdd-o: - `fa-hdd-o`

:fa-bullhorn: - `fa-bullhorn`

:fa-bell: - `fa-bell`

:fa-certificate: - `fa-certificate`

:fa-hand-o-right: - `fa-hand-o-right`

:fa-hand-o-left: - `fa-hand-o-left`

:fa-hand-o-up: - `fa-hand-o-up`

:fa-hand-o-down: - `fa-hand-o-down`

:fa-arrow-circle-left: - `fa-arrow-circle-left`

:fa-arrow-circle-right: - `fa-arrow-circle-right`

:fa-arrow-circle-up: - `fa-arrow-circle-up`

:fa-arrow-circle-down: - `fa-arrow-circle-down`

:fa-globe: - `fa-globe`

:fa-wrench: - `fa-wrench`

:fa-tasks: - `fa-tasks`

:fa-filter: - `fa-filter`

:fa-briefcase: - `fa-briefcase`

:fa-arrows-alt: - `fa-arrows-alt`

:fa-group: - `fa-group`

:fa-users: - `fa-users`

:fa-chain: - `fa-chain`

:fa-link: - `fa-link`

:fa-cloud: - `fa-cloud`

:fa-flask: - `fa-flask`

:fa-cut: - `fa-cut`

:fa-scissors: - `fa-scissors`

:fa-copy: - `fa-copy`

:fa-files-o: - `fa-files-o`

:fa-paperclip: - `fa-paperclip`

:fa-save: - `fa-save`

:fa-floppy-o: - `fa-floppy-o`

:fa-square: - `fa-square`

:fa-navicon: - `fa-navicon`

:fa-reorder: - `fa-reorder`

:fa-bars: - `fa-bars`

:fa-list-ul: - `fa-list-ul`

:fa-list-ol: - `fa-list-ol`

:fa-strikethrough: - `fa-strikethrough`

:fa-underline: - `fa-underline`

:fa-table: - `fa-table`

:fa-magic: - `fa-magic`

:fa-truck: - `fa-truck`

:fa-pinterest: - `fa-pinterest`

:fa-pinterest-square: - `fa-pinterest-square`

:fa-google-plus-square: - `fa-google-plus-square`

:fa-google-plus: - `fa-google-plus`

:fa-money: - `fa-money`

:fa-caret-down: - `fa-caret-down`

:fa-caret-up: - `fa-caret-up`

:fa-caret-left: - `fa-caret-left`

:fa-caret-right: - `fa-caret-right`

:fa-columns: - `fa-columns`

:fa-unsorted: - `fa-unsorted`

:fa-sort: - `fa-sort`

:fa-sort-down: - `fa-sort-down`

:fa-sort-desc: - `fa-sort-desc`

:fa-sort-up: - `fa-sort-up`

:fa-sort-asc: - `fa-sort-asc`

:fa-envelope: - `fa-envelope`

:fa-linkedin: - `fa-linkedin`

:fa-rotate-left: - `fa-rotate-left`

:fa-undo: - `fa-undo`

:fa-legal: - `fa-legal`

:fa-gavel: - `fa-gavel`

:fa-dashboard: - `fa-dashboard`

:fa-tachometer: - `fa-tachometer`

:fa-comment-o: - `fa-comment-o`

:fa-comments-o: - `fa-comments-o`

:fa-flash: - `fa-flash`

:fa-bolt: - `fa-bolt`

:fa-sitemap: - `fa-sitemap`

:fa-umbrella: - `fa-umbrella`

:fa-paste: - `fa-paste`

:fa-clipboard: - `fa-clipboard`

:fa-lightbulb-o: - `fa-lightbulb-o`

:fa-exchange: - `fa-exchange`

:fa-cloud-download: - `fa-cloud-download`

:fa-cloud-upload: - `fa-cloud-upload`

:fa-user-md: - `fa-user-md`

:fa-stethoscope: - `fa-stethoscope`

:fa-suitcase: - `fa-suitcase`

:fa-bell-o: - `fa-bell-o`

:fa-coffee: - `fa-coffee`

:fa-cutlery: - `fa-cutlery`

:fa-file-text-o: - `fa-file-text-o`

:fa-building-o: - `fa-building-o`

:fa-hospital-o: - `fa-hospital-o`

:fa-ambulance: - `fa-ambulance`

:fa-medkit: - `fa-medkit`

:fa-fighter-jet: - `fa-fighter-jet`

:fa-beer: - `fa-beer`

:fa-h-square: - `fa-h-square`

:fa-plus-square: - `fa-plus-square`

:fa-angle-double-left: - `fa-angle-double-left`

:fa-angle-double-right: - `fa-angle-double-right`

:fa-angle-double-up: - `fa-angle-double-up`

:fa-angle-double-down: - `fa-angle-double-down`

:fa-angle-left: - `fa-angle-left`

:fa-angle-right: - `fa-angle-right`

:fa-angle-up: - `fa-angle-up`

:fa-angle-down: - `fa-angle-down`

:fa-desktop: - `fa-desktop`

:fa-laptop: - `fa-laptop`

:fa-tablet: - `fa-tablet`

:fa-mobile-phone: - `fa-mobile-phone`

:fa-mobile: - `fa-mobile`

:fa-circle-o: - `fa-circle-o`

:fa-quote-left: - `fa-quote-left`

:fa-quote-right: - `fa-quote-right`

:fa-spinner: - `fa-spinner`

:fa-circle: - `fa-circle`

:fa-mail-reply: - `fa-mail-reply`

:fa-reply: - `fa-reply`

:fa-github-alt: - `fa-github-alt`

:fa-folder-o: - `fa-folder-o`

:fa-folder-open-o: - `fa-folder-open-o`

:fa-smile-o: - `fa-smile-o`

:fa-frown-o: - `fa-frown-o`

:fa-meh-o: - `fa-meh-o`

:fa-gamepad: - `fa-gamepad`

:fa-keyboard-o: - `fa-keyboard-o`

:fa-flag-o: - `fa-flag-o`

:fa-flag-checkered: - `fa-flag-checkered`

:fa-terminal: - `fa-terminal`

:fa-code: - `fa-code`

:fa-mail-reply-all: - `fa-mail-reply-all`

:fa-reply-all: - `fa-reply-all`

:fa-star-half-empty: - `fa-star-half-empty`

:fa-star-half-full: - `fa-star-half-full`

:fa-star-half-o: - `fa-star-half-o`

:fa-location-arrow: - `fa-location-arrow`

:fa-crop: - `fa-crop`

:fa-code-fork: - `fa-code-fork`

:fa-unlink: - `fa-unlink`

:fa-chain-broken: - `fa-chain-broken`

:fa-question: - `fa-question`

:fa-info: - `fa-info`

:fa-exclamation: - `fa-exclamation`

:fa-superscript: - `fa-superscript`

:fa-subscript: - `fa-subscript`

:fa-eraser: - `fa-eraser`

:fa-puzzle-piece: - `fa-puzzle-piece`

:fa-microphone: - `fa-microphone`

:fa-microphone-slash: - `fa-microphone-slash`

:fa-shield: - `fa-shield`

:fa-calendar-o: - `fa-calendar-o`

:fa-fire-extinguisher: - `fa-fire-extinguisher`

:fa-rocket: - `fa-rocket`

:fa-maxcdn: - `fa-maxcdn`

:fa-chevron-circle-left: - `fa-chevron-circle-left`

:fa-chevron-circle-right: - `fa-chevron-circle-right`

:fa-chevron-circle-up: - `fa-chevron-circle-up`

:fa-chevron-circle-down: - `fa-chevron-circle-down`

:fa-html5: - `fa-html5`

:fa-css3: - `fa-css3`

:fa-anchor: - `fa-anchor`

:fa-unlock-alt: - `fa-unlock-alt`

:fa-bullseye: - `fa-bullseye`

:fa-ellipsis-h: - `fa-ellipsis-h`

:fa-ellipsis-v: - `fa-ellipsis-v`

:fa-rss-square: - `fa-rss-square`

:fa-play-circle: - `fa-play-circle`

:fa-ticket: - `fa-ticket`

:fa-minus-square: - `fa-minus-square`

:fa-minus-square-o: - `fa-minus-square-o`

:fa-level-up: - `fa-level-up`

:fa-level-down: - `fa-level-down`

:fa-check-square: - `fa-check-square`

:fa-pencil-square: - `fa-pencil-square`

:fa-external-link-square: - `fa-external-link-square`

:fa-share-square: - `fa-share-square`

:fa-compass: - `fa-compass`

:fa-toggle-down: - `fa-toggle-down`

:fa-caret-square-o-down: - `fa-caret-square-o-down`

:fa-toggle-up: - `fa-toggle-up`

:fa-caret-square-o-up: - `fa-caret-square-o-up`

:fa-toggle-right: - `fa-toggle-right`

:fa-caret-square-o-right: - `fa-caret-square-o-right`

:fa-euro: - `fa-euro`

:fa-eur: - `fa-eur`

:fa-gbp: - `fa-gbp`

:fa-dollar: - `fa-dollar`

:fa-usd: - `fa-usd`

:fa-rupee: - `fa-rupee`

:fa-inr: - `fa-inr`

:fa-cny: - `fa-cny`

:fa-rmb: - `fa-rmb`

:fa-yen: - `fa-yen`

:fa-jpy: - `fa-jpy`

:fa-ruble: - `fa-ruble`

:fa-rouble: - `fa-rouble`

:fa-rub: - `fa-rub`

:fa-won: - `fa-won`

:fa-krw: - `fa-krw`

:fa-bitcoin: - `fa-bitcoin`

:fa-btc: - `fa-btc`

:fa-file: - `fa-file`

:fa-file-text: - `fa-file-text`

:fa-sort-alpha-asc: - `fa-sort-alpha-asc`

:fa-sort-alpha-desc: - `fa-sort-alpha-desc`

:fa-sort-amount-asc: - `fa-sort-amount-asc`

:fa-sort-amount-desc: - `fa-sort-amount-desc`

:fa-sort-numeric-asc: - `fa-sort-numeric-asc`

:fa-sort-numeric-desc: - `fa-sort-numeric-desc`

:fa-thumbs-up: - `fa-thumbs-up`

:fa-thumbs-down: - `fa-thumbs-down`

:fa-youtube-square: - `fa-youtube-square`

:fa-youtube: - `fa-youtube`

:fa-xing: - `fa-xing`

:fa-xing-square: - `fa-xing-square`

:fa-youtube-play: - `fa-youtube-play`

:fa-dropbox: - `fa-dropbox`

:fa-stack-overflow: - `fa-stack-overflow`

:fa-instagram: - `fa-instagram`

:fa-flickr: - `fa-flickr`

:fa-adn: - `fa-adn`

:fa-bitbucket: - `fa-bitbucket`

:fa-bitbucket-square: - `fa-bitbucket-square`

:fa-tumblr: - `fa-tumblr`

:fa-tumblr-square: - `fa-tumblr-square`

:fa-long-arrow-down: - `fa-long-arrow-down`

:fa-long-arrow-up: - `fa-long-arrow-up`

:fa-long-arrow-left: - `fa-long-arrow-left`

:fa-long-arrow-right: - `fa-long-arrow-right`

:fa-apple: - `fa-apple`

:fa-windows: - `fa-windows`

:fa-android: - `fa-android`

:fa-linux: - `fa-linux`

:fa-dribbble: - `fa-dribbble`

:fa-skype: - `fa-skype`

:fa-foursquare: - `fa-foursquare`

:fa-trello: - `fa-trello`

:fa-female: - `fa-female`

:fa-male: - `fa-male`

:fa-gittip: - `fa-gittip`

:fa-gratipay: - `fa-gratipay`

:fa-sun-o: - `fa-sun-o`

:fa-moon-o: - `fa-moon-o`

:fa-archive: - `fa-archive`

:fa-bug: - `fa-bug`

:fa-vk: - `fa-vk`

:fa-weibo: - `fa-weibo`

:fa-renren: - `fa-renren`

:fa-pagelines: - `fa-pagelines`

:fa-stack-exchange: - `fa-stack-exchange`

:fa-arrow-circle-o-right: - `fa-arrow-circle-o-right`

:fa-arrow-circle-o-left: - `fa-arrow-circle-o-left`

:fa-toggle-left: - `fa-toggle-left`

:fa-caret-square-o-left: - `fa-caret-square-o-left`

:fa-dot-circle-o: - `fa-dot-circle-o`

:fa-wheelchair: - `fa-wheelchair`

:fa-vimeo-square: - `fa-vimeo-square`

:fa-turkish-lira: - `fa-turkish-lira`

:fa-try: - `fa-try`

:fa-plus-square-o: - `fa-plus-square-o`

:fa-space-shuttle: - `fa-space-shuttle`

:fa-slack: - `fa-slack`

:fa-envelope-square: - `fa-envelope-square`

:fa-wordpress: - `fa-wordpress`

:fa-openid: - `fa-openid`

:fa-institution: - `fa-institution`

:fa-bank: - `fa-bank`

:fa-university: - `fa-university`

:fa-mortar-board: - `fa-mortar-board`

:fa-graduation-cap: - `fa-graduation-cap`

:fa-yahoo: - `fa-yahoo`

:fa-google: - `fa-google`

:fa-reddit: - `fa-reddit`

:fa-reddit-square: - `fa-reddit-square`

:fa-stumbleupon-circle: - `fa-stumbleupon-circle`

:fa-stumbleupon: - `fa-stumbleupon`

:fa-delicious: - `fa-delicious`

:fa-digg: - `fa-digg`

:fa-pied-piper-pp: - `fa-pied-piper-pp`

:fa-pied-piper-alt: - `fa-pied-piper-alt`

:fa-drupal: - `fa-drupal`

:fa-joomla: - `fa-joomla`

:fa-language: - `fa-language`

:fa-fax: - `fa-fax`

:fa-building: - `fa-building`

:fa-child: - `fa-child`

:fa-paw: - `fa-paw`

:fa-spoon: - `fa-spoon`

:fa-cube: - `fa-cube`

:fa-cubes: - `fa-cubes`

:fa-behance: - `fa-behance`

:fa-behance-square: - `fa-behance-square`

:fa-steam: - `fa-steam`

:fa-steam-square: - `fa-steam-square`

:fa-recycle: - `fa-recycle`

:fa-automobile: - `fa-automobile`

:fa-car: - `fa-car`

:fa-cab: - `fa-cab`

:fa-taxi: - `fa-taxi`

:fa-tree: - `fa-tree`

:fa-spotify: - `fa-spotify`

:fa-deviantart: - `fa-deviantart`

:fa-soundcloud: - `fa-soundcloud`

:fa-database: - `fa-database`

:fa-file-pdf-o: - `fa-file-pdf-o`

:fa-file-word-o: - `fa-file-word-o`

:fa-file-excel-o: - `fa-file-excel-o`

:fa-file-powerpoint-o: - `fa-file-powerpoint-o`

:fa-file-photo-o: - `fa-file-photo-o`

:fa-file-picture-o: - `fa-file-picture-o`

:fa-file-image-o: - `fa-file-image-o`

:fa-file-zip-o: - `fa-file-zip-o`

:fa-file-archive-o: - `fa-file-archive-o`

:fa-file-sound-o: - `fa-file-sound-o`

:fa-file-audio-o: - `fa-file-audio-o`

:fa-file-movie-o: - `fa-file-movie-o`

:fa-file-video-o: - `fa-file-video-o`

:fa-file-code-o: - `fa-file-code-o`

:fa-vine: - `fa-vine`

:fa-codepen: - `fa-codepen`

:fa-jsfiddle: - `fa-jsfiddle`

:fa-life-bouy: - `fa-life-bouy`

:fa-life-buoy: - `fa-life-buoy`

:fa-life-saver: - `fa-life-saver`

:fa-support: - `fa-support`

:fa-life-ring: - `fa-life-ring`

:fa-circle-o-notch: - `fa-circle-o-notch`

:fa-ra: - `fa-ra`

:fa-resistance: - `fa-resistance`

:fa-rebel: - `fa-rebel`

:fa-ge: - `fa-ge`

:fa-empire: - `fa-empire`

:fa-git-square: - `fa-git-square`

:fa-git: - `fa-git`

:fa-y-combinator-square: - `fa-y-combinator-square`

:fa-yc-square: - `fa-yc-square`

:fa-hacker-news: - `fa-hacker-news`

:fa-tencent-weibo: - `fa-tencent-weibo`

:fa-qq: - `fa-qq`

:fa-wechat: - `fa-wechat`

:fa-weixin: - `fa-weixin`

:fa-send: - `fa-send`

:fa-paper-plane: - `fa-paper-plane`

:fa-send-o: - `fa-send-o`

:fa-paper-plane-o: - `fa-paper-plane-o`

:fa-history: - `fa-history`

:fa-circle-thin: - `fa-circle-thin`

:fa-header: - `fa-header`

:fa-paragraph: - `fa-paragraph`

:fa-sliders: - `fa-sliders`

:fa-share-alt: - `fa-share-alt`

:fa-share-alt-square: - `fa-share-alt-square`

:fa-bomb: - `fa-bomb`

:fa-soccer-ball-o: - `fa-soccer-ball-o`

:fa-futbol-o: - `fa-futbol-o`

:fa-tty: - `fa-tty`

:fa-binoculars: - `fa-binoculars`

:fa-plug: - `fa-plug`

:fa-slideshare: - `fa-slideshare`

:fa-twitch: - `fa-twitch`

:fa-yelp: - `fa-yelp`

:fa-newspaper-o: - `fa-newspaper-o`

:fa-wifi: - `fa-wifi`

:fa-calculator: - `fa-calculator`

:fa-paypal: - `fa-paypal`

:fa-google-wallet: - `fa-google-wallet`

:fa-cc-visa: - `fa-cc-visa`

:fa-cc-mastercard: - `fa-cc-mastercard`

:fa-cc-discover: - `fa-cc-discover`

:fa-cc-amex: - `fa-cc-amex`

:fa-cc-paypal: - `fa-cc-paypal`

:fa-cc-stripe: - `fa-cc-stripe`

:fa-bell-slash: - `fa-bell-slash`

:fa-bell-slash-o: - `fa-bell-slash-o`

:fa-trash: - `fa-trash`

:fa-copyright: - `fa-copyright`

:fa-at: - `fa-at`

:fa-eyedropper: - `fa-eyedropper`

:fa-paint-brush: - `fa-paint-brush`

:fa-birthday-cake: - `fa-birthday-cake`

:fa-area-chart: - `fa-area-chart`

:fa-pie-chart: - `fa-pie-chart`

:fa-line-chart: - `fa-line-chart`

:fa-lastfm: - `fa-lastfm`

:fa-lastfm-square: - `fa-lastfm-square`

:fa-toggle-off: - `fa-toggle-off`

:fa-toggle-on: - `fa-toggle-on`

:fa-bicycle: - `fa-bicycle`

:fa-bus: - `fa-bus`

:fa-ioxhost: - `fa-ioxhost`

:fa-angellist: - `fa-angellist`

:fa-cc: - `fa-cc`

:fa-shekel: - `fa-shekel`

:fa-sheqel: - `fa-sheqel`

:fa-ils: - `fa-ils`

:fa-meanpath: - `fa-meanpath`

:fa-buysellads: - `fa-buysellads`

:fa-connectdevelop: - `fa-connectdevelop`

:fa-dashcube: - `fa-dashcube`

:fa-forumbee: - `fa-forumbee`

:fa-leanpub: - `fa-leanpub`

:fa-sellsy: - `fa-sellsy`

:fa-shirtsinbulk: - `fa-shirtsinbulk`

:fa-simplybuilt: - `fa-simplybuilt`

:fa-skyatlas: - `fa-skyatlas`

:fa-cart-plus: - `fa-cart-plus`

:fa-cart-arrow-down: - `fa-cart-arrow-down`

:fa-diamond: - `fa-diamond`

:fa-ship: - `fa-ship`

:fa-user-secret: - `fa-user-secret`

:fa-motorcycle: - `fa-motorcycle`

:fa-street-view: - `fa-street-view`

:fa-heartbeat: - `fa-heartbeat`

:fa-venus: - `fa-venus`

:fa-mars: - `fa-mars`

:fa-mercury: - `fa-mercury`

:fa-intersex: - `fa-intersex`

:fa-transgender: - `fa-transgender`

:fa-transgender-alt: - `fa-transgender-alt`

:fa-venus-double: - `fa-venus-double`

:fa-mars-double: - `fa-mars-double`

:fa-venus-mars: - `fa-venus-mars`

:fa-mars-stroke: - `fa-mars-stroke`

:fa-mars-stroke-v: - `fa-mars-stroke-v`

:fa-mars-stroke-h: - `fa-mars-stroke-h`

:fa-neuter: - `fa-neuter`

:fa-genderless: - `fa-genderless`

:fa-facebook-official: - `fa-facebook-official`

:fa-pinterest-p: - `fa-pinterest-p`

:fa-whatsapp: - `fa-whatsapp`

:fa-server: - `fa-server`

:fa-user-plus: - `fa-user-plus`

:fa-user-times: - `fa-user-times`

:fa-hotel: - `fa-hotel`

:fa-bed: - `fa-bed`

:fa-viacoin: - `fa-viacoin`

:fa-train: - `fa-train`

:fa-subway: - `fa-subway`

:fa-medium: - `fa-medium`

:fa-yc: - `fa-yc`

:fa-y-combinator: - `fa-y-combinator`

:fa-optin-monster: - `fa-optin-monster`

:fa-opencart: - `fa-opencart`

:fa-expeditedssl: - `fa-expeditedssl`

:fa-battery-4: - `fa-battery-4`

`:fa-battery: - `fa-battery``

:fa-battery-full: - `fa-battery-full`

:fa-battery-3: - `fa-battery-3`

:fa-battery-three-quarters: - `fa-battery-three-quarters`

:fa-battery-2: - `fa-battery-2`

:fa-battery-half: - `fa-battery-half`

:fa-battery-1: - `fa-battery-1`

:fa-battery-quarter: - `fa-battery-quarter`

:fa-battery-0: - `fa-battery-0`

:fa-battery-empty: - `fa-battery-empty`

:fa-mouse-pointer: - `fa-mouse-pointer`

:fa-i-cursor: - `fa-i-cursor`

:fa-object-group: - `fa-object-group`

:fa-object-ungroup: - `fa-object-ungroup`

:fa-sticky-note: - `fa-sticky-note`

:fa-sticky-note-o: - `fa-sticky-note-o`

:fa-cc-jcb: - `fa-cc-jcb`

:fa-cc-diners-club: - `fa-cc-diners-club`

:fa-clone: - `fa-clone`

:fa-balance-scale: - `fa-balance-scale`

:fa-hourglass-o: - `fa-hourglass-o`

:fa-hourglass-1: - `fa-hourglass-1`

:fa-hourglass-start: - `fa-hourglass-start`

:fa-hourglass-2: - `fa-hourglass-2`

:fa-hourglass-half: - `fa-hourglass-half`

:fa-hourglass-3: - `fa-hourglass-3`

:fa-hourglass-end: - `fa-hourglass-end`

:fa-hourglass: - `fa-hourglass`

:fa-hand-grab-o: - `fa-hand-grab-o`

:fa-hand-rock-o: - `fa-hand-rock-o`

:fa-hand-stop-o: - `fa-hand-stop-o`

:fa-hand-paper-o: - `fa-hand-paper-o`

:fa-hand-scissors-o: - `fa-hand-scissors-o`

:fa-hand-lizard-o: - `fa-hand-lizard-o`

:fa-hand-spock-o: - `fa-hand-spock-o`

:fa-hand-pointer-o: - `fa-hand-pointer-o`

:fa-hand-peace-o: - `fa-hand-peace-o`

:fa-trademark: - `fa-trademark`

:fa-registered: - `fa-registered`

:fa-creative-commons: - `fa-creative-commons`

:fa-gg: - `fa-gg`

:fa-gg-circle: - `fa-gg-circle`

:fa-tripadvisor: - `fa-tripadvisor`

:fa-odnoklassniki: - `fa-odnoklassniki`

:fa-odnoklassniki-square: - `fa-odnoklassniki-square`

:fa-get-pocket: - `fa-get-pocket`

:fa-wikipedia-w: - `fa-wikipedia-w`

:fa-safari: - `fa-safari`

:fa-chrome: - `fa-chrome`

:fa-firefox: - `fa-firefox`

:fa-opera: - `fa-opera`

:fa-internet-explorer: - `fa-internet-explorer`

:fa-tv: - `fa-tv`

:fa-television: - `fa-television`

:fa-contao: - `fa-contao`

:fa-500px: - `fa-500px`

:fa-amazon: - `fa-amazon`

:fa-calendar-plus-o: - `fa-calendar-plus-o`

:fa-calendar-minus-o: - `fa-calendar-minus-o`

:fa-calendar-times-o: - `fa-calendar-times-o`

:fa-calendar-check-o: - `fa-calendar-check-o`

:fa-industry: - `fa-industry`

:fa-map-pin: - `fa-map-pin`

:fa-map-signs: - `fa-map-signs`

:fa-map-o: - `fa-map-o`

:fa-map: - `fa-map`

:fa-commenting: - `fa-commenting`

:fa-commenting-o: - `fa-commenting-o`

:fa-houzz: - `fa-houzz`

:fa-vimeo: - `fa-vimeo`

:fa-black-tie: - `fa-black-tie`

:fa-fonticons: - `fa-fonticons`

:fa-reddit-alien: - `fa-reddit-alien`

:fa-edge: - `fa-edge`

:fa-credit-card-alt: - `fa-credit-card-alt`

:fa-codiepie: - `fa-codiepie`

:fa-modx: - `fa-modx`

:fa-fort-awesome: - `fa-fort-awesome`

:fa-usb: - `fa-usb`

:fa-product-hunt: - `fa-product-hunt`

:fa-mixcloud: - `fa-mixcloud`

:fa-scribd: - `fa-scribd`

:fa-pause-circle: - `fa-pause-circle`

:fa-pause-circle-o: - `fa-pause-circle-o`

:fa-stop-circle: - `fa-stop-circle`

:fa-stop-circle-o: - `fa-stop-circle-o`

:fa-shopping-bag: - `fa-shopping-bag`

:fa-shopping-basket: - `fa-shopping-basket`

:fa-hashtag: - `fa-hashtag`

:fa-bluetooth: - `fa-bluetooth`

:fa-bluetooth-b: - `fa-bluetooth-b`

:fa-percent: - `fa-percent`

:fa-gitlab: - `fa-gitlab`

:fa-wpbeginner: - `fa-wpbeginner`

:fa-wpforms: - `fa-wpforms`

:fa-envira: - `fa-envira`

:fa-universal-access: - `fa-universal-access`

:fa-wheelchair-alt: - `fa-wheelchair-alt`

:fa-question-circle-o: - `fa-question-circle-o`

:fa-blind: - `fa-blind`

:fa-audio-description: - `fa-audio-description`

:fa-volume-control-phone: - `fa-volume-control-phone`

:fa-braille: - `fa-braille`

:fa-assistive-listening-systems: - `fa-assistive-listening-systems`

:fa-asl-interpreting: - `fa-asl-interpreting`

:fa-american-sign-language-interpreting: - `fa-american-sign-language-interpreting`

:fa-deafness: - `fa-deafness`

:fa-hard-of-hearing: - `fa-hard-of-hearing`

:fa-deaf: - `fa-deaf`

:fa-glide: - `fa-glide`

:fa-glide-g: - `fa-glide-g`

:fa-signing: - `fa-signing`

:fa-sign-language: - `fa-sign-language`

:fa-low-vision: - `fa-low-vision`

:fa-viadeo: - `fa-viadeo`

:fa-viadeo-square: - `fa-viadeo-square`

:fa-snapchat: - `fa-snapchat`

:fa-snapchat-ghost: - `fa-snapchat-ghost`

:fa-snapchat-square: - `fa-snapchat-square`

:fa-pied-piper: - `fa-pied-piper`

:fa-first-order: - `fa-first-order`

:fa-yoast: - `fa-yoast`

:fa-themeisle: - `fa-themeisle`

:fa-google-plus-circle: - `fa-google-plus-circle`

:fa-google-plus-official: - `fa-google-plus-official`

:fa-fa: - `fa-fa`

:fa-font-awesome: - `fa-font-awesome`

`:fa-handshake-o: - `fa-handshake-o``

`:fa-envelope-open: - `fa-envelope-open``

`:fa-envelope-open-o: - `fa-envelope-open-o``

`:fa-linode: - `fa-linode``

`:fa-address-book: - `fa-address-book``

`:fa-address-book-o: - `fa-address-book-o``

`:fa-vcard: - `fa-vcard``

`:fa-address-card: - `fa-address-card``

`:fa-vcard-o: - `fa-vcard-o``

`:fa-address-card-o: - `fa-address-card-o``

`:fa-user-circle: - `fa-user-circle``

`:fa-user-circle-o: - `fa-user-circle-o``

`:fa-user-o: - `fa-user-o``

`:fa-id-badge: - `fa-id-badge``

`:fa-drivers-license: - `fa-drivers-license``

`:fa-id-card: - `fa-id-card``

`:fa-drivers-license-o: - `fa-drivers-license-o``

`:fa-id-card-o: - `fa-id-card-o``

`:fa-quora: - `fa-quora``

`:fa-free-code-camp: - `fa-free-code-camp``

`:fa-telegram: - `fa-telegram``

`:fa-thermometer-4: - `fa-thermometer-4``

`:fa-thermometer: - `fa-thermometer``

`:fa-thermometer-full: - `fa-thermometer-full``

`:fa-thermometer-3: - `fa-thermometer-3``

`:fa-thermometer-three-quarters: - `fa-thermometer-three-quarters``

`:fa-thermometer-2: - `fa-thermometer-2``

`:fa-thermometer-half: - `fa-thermometer-half``

`:fa-thermometer-1: - `fa-thermometer-1``

`:fa-thermometer-quarter: - `fa-thermometer-quarter``

`:fa-thermometer-0: - `fa-thermometer-0``

`:fa-thermometer-empty: - `fa-thermometer-empty``

`:fa-shower: - `fa-shower``

`:fa-bathtub: - `fa-bathtub``

`:fa-s15: - `fa-s15``

`:fa-bath: - `fa-bath``

`:fa-podcast: - `fa-podcast``

`:fa-window-maximize: - `fa-window-maximize``

`:fa-window-minimize: - `fa-window-minimize``

`:fa-window-restore: - `fa-window-restore``

`:fa-times-rectangle: - `fa-times-rectangle``

`:fa-window-close: - `fa-window-close``

`:fa-times-rectangle-o: - `fa-times-rectangle-o``

`:fa-window-close-o: - `fa-window-close-o``

`:fa-bandcamp: - `fa-bandcamp``

`:fa-grav: - `fa-grav``

`:fa-etsy: - `fa-etsy``

`:fa-imdb: - `fa-imdb``

`:fa-ravelry: - `fa-ravelry``

`:fa-eercast: - `fa-eercast``

`:fa-microchip: - `fa-microchip``

`:fa-snowflake-o: - `fa-snowflake-o``

`:fa-superpowers: - `fa-superpowers``

`:fa-wpexplorer: - `fa-wpexplorer``

`:fa-meetup: - `fa-meetup``
