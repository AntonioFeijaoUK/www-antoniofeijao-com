---
date: 2019-11-20
last_modified_at: 2020-11-20

categories:
    - Linux
    - Python-3
    
tags:
    - aws
    - linux
    - dns
description: "Quick Python 3 tip for starting a simple local HTTP server from the current directory using the built-in http.server module."
---

# python-3-http-server

A quick and simple way to start a webserver on the current directory with `Python 3` using module `http.server`


---

{% highlight bash linenos %}

python3 -m http.server 8000 --directory .`


{% endhighlight %}

---


Happy learning and keep practising!

[Antonio Feijao UK](https://antoniofeijao.com)
