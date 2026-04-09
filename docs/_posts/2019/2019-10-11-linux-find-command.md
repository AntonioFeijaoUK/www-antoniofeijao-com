---
date: 2019-10-11
categories:
    - Linux
tags:
    - linux
    - security
    - bash
description: "Linux find command notes with practical examples and warnings, including safer usage patterns for powerful options like -exec."
---

# linux-find-command

Linux find command

!!! warning
    Use the flag `-exec` with care.
    Try the command find without the `-exec rm {} \;` to see which files are found,

```bash

find . -type f -name 'desktop.ini' -exec rm {} \;

find . -type f -name '.DS_Store' -exec rm {} \;

```
