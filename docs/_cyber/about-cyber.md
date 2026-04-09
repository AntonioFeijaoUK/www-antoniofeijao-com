---
title: "cyber news sourced websites"
description: "Overview of the cyber news aggregation workflow and source list used to generate daily cybersecurity summaries from major industry feeds and research outlets."

date: 2025-02-26
last_modified_at: 2026-04-06

categories:
  - ai-generated
  - cybernews
tags:
  - cybernewssummary2025
  - cybernewssummary2025-02-26
  - summary
---

A daily script that summarises the top cyber news across sources below:

* <https://0dayfans.com/>
* <https://blog.netizen.watch/>
* <https://blogs.juniper.net/threat-research/>
* <https://arstechnica.com/security/>
* <https://thehackernews.com/>
* <https://isc.sans.edu/>
* <https://krebsonsecurity.com/>
* <https://lwn.net/Security/>
* <https://news.sophos.com/en-us/category/security-operations/>
* <https://techcrunch.com/category/security/>
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
* <https://www.wired.com/category/security/>

---

Let me know if you know how to display the news here in reverse order (newest to oldest) :)

```js
{% for page in pages %}
  - {{ page.title }}: {{ page.meta }}
{% endfor %}
```
