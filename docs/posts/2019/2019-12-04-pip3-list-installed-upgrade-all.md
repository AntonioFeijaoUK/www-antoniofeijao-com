---
date: 2019-12-04
categories:
    - Python-3
    - Linux
tags:
    - python-3
    - linux
    - pip3
    - shell-scripting
---

# pip3-list-installed-upgrade-all

So, I want to list the packages installed with `pip3` and now that I can see them, I want to update them all.

## List `pip3` installed packages

```shell
pip3 list
```
---

## Update all my pip3 packages

with a `for loop` you can loop through all your packages, exclude what is not a package and run the command `pip3 {package} --upgrade` on the installed packages.

```bash
for n in $(pip3 list | awk '{print $1}' | egrep -v 'Package|^-'); do
    pip3 install --upgrade ${n} ;
done
```

---

## pip update outdates packages

> Just another way of doing it.

```bash
for package in $(pip list -o | cut -f 1 -d ' ' | tail -n +3); do pip install --upgrade ${package}; done
```

---

If you know a better way, do let me know! :)

Beware of dependencies packages or minimum and max versions.

Use at your own responsibility. 


Happy learning,

Antonio Feijao
