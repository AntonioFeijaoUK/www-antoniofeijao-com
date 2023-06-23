---
title: "Using a Raspberry Pi 4 as a router with iptables"
layout: splash
#excerpt_separator: <!--more-->
#permalink: /plugins/
categories: ["RaspberryPi", "networking", "linux"]
tags:       ["ufw", "routing", "linux", "raspberrypi", "security"]
---

Using a Raspberry Pi 4 as a router with `iptables`. With iptables we need to know more about what we are doing.  `ufw` is great, it works as a leayer on top of `iptables` for with easy management, however you will not learn the real "thing", the network flow details, the beauty of "source" and "destination", and more...

So, I want to learn more, therefore I went on to learn the details of `iptables` and source destination IPs, NAT (MASQUERADE), source and destination ports, states...

## the raspberry pi 4 basics

### raspberry pi 4 updates

```bash
apt update && apt upgrade -y

apt autoremove -y

## useful

apt install dnsutils
```

### raspberry pi 4 disable `ipv6` at boot

`vim /boot/cmdline.txt` and add `ipv6.disable=1` to the end of the line

example

```bash
console=tty1 root=PARTUUID=xxxxXXxx-xx rootfstype=ext4 fsck.repair=yes rootwait ipv6.disable=1
```


### raspberry pi 4 enable `IPv4` forward and disable `IPv6`

* cat `/etc/sysctl.d/local.conf`

```bash
net.ipv4.ip_forward=1

net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1
```

---

## raspberry pi 4 nat with `iptables`

* cat `reset-iptables.sh`

```bash
#!/bin/bash -x
##
## source - https://www.linode.com/docs/guides/linux-router-and-ip-forwarding/
##
## 2023-06 - adapted and tweaked by AntonioFeijaoUK
##

## reset iptables
iptables -F
iptables -X
iptables -t nat -F
iptables -t nat -X
iptables -t mangle -F
iptables -t mangle -X
iptables -P INPUT ACCEPT
iptables -P OUTPUT ACCEPT
iptables -P FORWARD ACCEPT

## enable forwarding packets
iptables -A FORWARD -j ACCEPT

## detecting the default route interface
GATEWAY_INTERFACE=$(route -n | grep ^'0.0.0.0' | rev | cut -f 1 -d ' ' | rev | head -n1)
echo "your gateway interface is : ${GATEWAY_INTERFACE}"

## enable NAT on the outside interface for the internal subnet SOURCE_SUBNET
SOURCE_SUBNET="192.168.0.0/24"
iptables -t nat -s ${SOURCE_SUBNET} -I POSTROUTING -o ${GATEWAY_INTERFACE} -j MASQUERADE

## source - enabled established connections - this is not needed as the FORWARD is set to default ACCEPT
#iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
#iptables -A FORWARD -i eth0 -d ${SOURCE_SUBNET} -m state --state RELATED,ESTABLISHED -j ACCEPT
#iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT

## save IPv4 iptables
iptables-save | sudo tee /etc/iptables/rules.v4


##################################################################
### similar but for IPv6 and to block by default
ip6tables -F
ip6tables -X
ip6tables -t nat -F
ip6tables -t nat -X
#ip6tables -t mangle -F
#ip6tables -t mangle -X
ip6tables -P INPUT DROP
ip6tables -P OUTPUT DROP
ip6tables -P FORWARD DROP

## enable forwarding packets
ip6tables -A FORWARD -j DROP

## enable NAT on the outside interface
#iptables -t nat -s 192.168.0.0/24 -I POSTROUTING -o enp0s3 -j MASQUERADE

## save IPv6 iptables
ip6tables-save | sudo tee /etc/iptables/rules.v6


## USEFUL COMMANDS

echo "

useful command to check your NAT MASQUERADE is working

	\`iptables -t nat -L -nv\`

"

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
metric 300
static domain_name_servers=94.140.14.15 94.140.15.16
interface eth0
domain antoniofeijaouk.local
search antoniofeijaouk.local
metric 200
static ip_address=192.168.0.4/24
static routers=192.168.0.1
static domain_name_servers=94.140.14.15 94.140.15.16
```

## raspberry pi 4 - verify the dns upstream servers

```bash
resolvconf -l

resolvectl status
```

---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com)


2023-06-09-raspberry-pi-4-as-a-router-with-ufw-rules.md
