---
date: 2020-04-04
last_modified_at: 2024-02-19
categories:
    - Linux
    - Bash
tags:
    - linux
    - bash
    - shell-scripting
    - parallel
---

# linux-command-xargs-for-parallel-execution

`xargs` command can be used to "speed up" Linux commands by running the same command multiple times in parallel.

> WORK IN PROGRESS

`cat FILE_WITH_COMAMND_OR_WHATEVER | xargs -n1 -P10`

`-n1` reads one line at a time

`-P10` runs up to 10 parallel commands


---

Happy learning

[Antonio Feijao UK](https://www.antoniofeijao.com/)
