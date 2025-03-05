---
title: news
---

A daily script that summarises the top cyber news across various sources.

Below, sources that the script uses.

* <https://0dayfans.com/>
* <https://blog.netizen.watch/>
* <https://blogs.juniper.net/threat-research/>
* <https://feeds.arstechnica.com/arstechnica/>
* <https://feeds.feedburner.com/TheHackersNews>
* <https://isc.sans.edu/>
* <https://krebsonsecurity.com/>
* <https://lwn.net/headlines/>
* <https://news.sophos.com/en-us/category/security-operations/>
* <https://securelist.com/>
* <https://techcrunch.com/>
* <https://threatpost.com/>
* <https://unit42.paloaltonetworks.com/>
* <https://www.bleepingcomputer.com/>
* <https://www.cyberscoop.com/>
* <https://www.darkreading.com/>
* <https://www.reddit.com/r/cybersecurity/>
* <https://www.schneier.com/>
* <https://www.securitymagazine.com/>
* <https://www.theguardian.com/uk/technology/>
* <https://www.troyhunt.com/>
* <https://www.welivesecurity.com/>
* <https://www.wired.com/feed/category/security/latest/>

---

Let me know if you know how to display the news here in reverse order (newest to oldest) :)

```js
{% for page in pages %}
  - {{ page.title }}: {{ page.meta }}
{% endfor %}
```
