---
title: "Linux bash script, basic script that records the website availability HTTP code 200s, 300s, 400s, 500s"
#layout: splash
#excerpt: "Sample of some privacy plugins that can be used in Google Chrome, Mozilla Firefox and others."
#permalink: /plugins/
categories: ["Linux", "Bash", "Script", "monitor"]
tags:       ["for-loop", "while-true", "linux", "bash", "script"]
---

Linux bash script, basic script that records the website availability HTTP code 200s, 300s, 400s, 500s 

!["Linux bash script, basic script that records the website availability HTTP code 200s, 300s, 400s, 500s"](/assets/images/linux-bash-script-monitor-website-availability.jpg)

```bash
#!/bin/bash

IFS='
'

LIST_URLs="https://www.antoniofeijao.com/
https://www.antoniofeijao.pt/
https://www.antoniocloud.com/
https://antonio.cloud/
https://www.cyberantonio.com/
https://www.cloudsecurity.cc/
https://www.securitygames.net/
https://www.root.pt/
https://www.ninja.pt/
https://www.ntp.pt/"


for URL in $(echo ${LIST_URLs} | tr '\ ' '\n'); do
    while true; do
        LOGS="${URL:8:-1}-$(date +%F).txt" && \
        DATE=$(date +%F-%H%M-%Ss) && \
        RESULT=$(curl -I ${URL} --silent | head -n 1) && \
        echo -e "${DATE}; \t ${URL}; \t ${RESULT}" >> ${LOGS} && \
        sleep 15
    done &
done

```


Happy learning,
Antonio Feijao


#cyberantonioctf
