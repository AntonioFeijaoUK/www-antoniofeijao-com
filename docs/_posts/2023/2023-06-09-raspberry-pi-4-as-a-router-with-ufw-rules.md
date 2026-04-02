---
date: 2023-06-09
title: "Raspberry Pi 4 as a router with ufw rules"
#layout: splash
#excerpt_separator: <!--more-->
#permalink: /plugins/
categories: ["RaspberryPi", "networking", "linux"]
tags:       ["ufw", "routing", "linux", "raspberrypi", "security"]
---

Raspberry Pi 4 as a basic "router" with `ufw` rules.

## requirements

* update rpi

```bash
apt update && apt upgrade -y

apt autoremove -y

apt install ufw

## useful

apt install dnsutils

```

* raspberry pi 4 disable `ipv6` at boot

`vim /boot/cmdline.txt` and add `ipv6.disable=1` to the end of the line

example

```bash
console=tty1 root=PARTUUID=xxxxXXxx-xx rootfstype=ext4 fsck.repair=yes rootwait ipv6.disable=1
```


* vim `/etc/default/ufw`

```bash
DEFAULT_FORWARD_POLICY="ACCEPT"
```

* cat /etc/sysctl.d/local.conf

```bash
net.ipv4.ip_forward=1

net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1
```

* 


---

## raspberry pi 4 nat with `ufw`

* vim `/etc/ufw/before.rules`

```bash
(...)
#------------------------------------------------------------------------
## sources
## https://gist.github.com/kimus/9315140
## https://www.server-world.info/en/note?os=Ubuntu_22.04&p=ufw&f=2
#
# add to the end
# NAT
*nat
-F
:POSTROUTING ACCEPT [0:0]

# Forward traffic through wlan0
-A POSTROUTING -s 192.168.0.0/24 -o wlan0 -j MASQUERADE

# don't delete the 'COMMIT' line or these nat table rules won't
# be processed
COMMIT
```

---

## sample of basic `ufw` rules 

* eth0 - "internal" network with static IP
    * metric 300, for lower priority for default gw

* wlan0 - "external" network with DHCP
    * metric 200, for default gw priority

```bash
## in routes - FROM and TO rules

ufw allow from 192.168.0.0/24 to 192.168.0.0/24 port 22 proto tcp



## out rules

ufw allow out on wlan0 from 192.168.0.0/24 to 94.140.14.15 port 53 proto udp
ufw allow out on wlan0 from 192.168.0.0/24 to 94.140.14.15 port 53 proto udp

ufw allow out on eth0 from 192.168.0.0/24 to 94.140.14.15 port 53 proto udp
ufw allow out on eth0 from 192.168.0.0/24 to 94.140.14.15 port 53 proto udp

ufw allow out on wlan0 from 192.168.0.0/24 to any port 443 proto tcp
ufw allow out on eth0 from 192.168.0.0/24 to any port 443 proto tcp

ufw allow out from 192.168.0.0/24 to any port 443 proto tcp
ufw allow out from 192.168.0.0/24 to any port 80 proto tcp


## enable ufw logging

ufw logging on

```


## other usefull ufw commands

```bash

# ufw reset

ufw disable

ufw enable

ufw status numbered

ufw delete RUL_NUM

```

---

## raspberry pi 4 static IP, dhcp and gateway metrics

* cat `/etc/dhcpcd.conf | egrep -v '^#|^$'`

```bash
hostname
clientid
persistent
option rapid_commit
option domain_name_servers, domain_name, domain_search, host_name
option classless_static_routes
option interface_mtu
require dhcp_server_identifier
slaac private
interface wlan0
metric 200
static domain_name_servers=94.140.14.15 94.140.15.16
interface eth0
domain feijaouk.local
search feijaouk.local
metric 300
static ip_address=192.168.0.4/24
static routers=192.168.0.1
static domain_name_servers=94.140.14.15 94.140.15.16
```

## raspberry pi 4 - verify the dns upstream servers

```bash
resolvconf -l
```

---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com)


2023-06-09-raspberry-pi-4-as-a-router-with-ufw-rules.md
