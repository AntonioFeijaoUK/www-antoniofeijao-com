---
date: 2019-09-15
categories:
    - Linux
    
tags:
    - linux
    - security
    - sudo
    - root
description: "Vim tip for recovering and saving a file when you forgot to open it with sudo, including practical command-line workaround steps."
---

# vim-forgot-sudo-to-save

vim and forgot to sudo and now?

`vim` forgot to `sudo`

Forgot to `sudo vim` before opening the file and now cannot save the file within vim.

Here is the solution:

`:w !sudo tee %`

- source <https://intelligentbee.com/2017/06/08/save-file-vim-forgetting-use-sudo/>
