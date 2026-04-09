---
date: 2019-01-30
categories:
    - Linux
    - Webpage
    - Networking
tags:
    - bash
    - linux
    - internet
    - networking
description: "Simple Linux command reference using ipinfo.io and curl to verify public IP details over HTTP and HTTPS for quick connectivity checks."
---

# linux-what-is-my-ip-ipinfo

* <https://ipinfo.io/json>

`curl ipinfo.io/json`

or

`curl http://ipinfo.io/json` <-- force a non-https connection

or

`curl https://ipinfo.io/json` <-- the https route can go through a different proxy or public ip.
