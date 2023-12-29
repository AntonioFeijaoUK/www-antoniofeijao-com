---
title: "Linux dnsmasq options, dns-server and more"
layout: splash
#excerpt_separator: <!--more-->
#permalink: /plugins/
categories: ["linux", "dns", "dnsmasq"]
tags:       ["linux", "dns", "dnsmasq"]
---

Linux dnsmasq options, dns-server and more.

More about dnsmasq in here - <https://en.wikipedia.org/wiki/Dnsmasq>

---

Starting with an example of a DHCP pool definition for dnsmasq

```bash
(...)

 dhcp-range=192.168.100.101,192.168.100.199,255.255.255.0,8h   # dhcp range
 dhcp-option=3,192.168.100.20                                  # default-gateway
 dhcp-option=6,1.1.1.3,1.0.0.3                                 # dns
 dhcp-option=15,mylocalnetwork.local                           # local-domain
 dhcp-option=44,0.0.0.0                                        # netbios server. Disabling NetBIOS over TCP/IP can improve security by reducing the attack surface of a system. However, it may also impact the functionality of certain legacy applications and networked devices that rely on NetBIOS

(...)
```

and with the command `dnsmasq --help dhcp` you get the below output, which shows what options are available and what they are.

```bash
Known DHCP options:
  1 netmask
  2 time-offset
  3 router
  6 dns-server
  7 log-server
  9 lpr-server
 13 boot-file-size
 15 domain-name
 16 swap-server
 17 root-path
 18 extension-path
 19 ip-forward-enable
 20 non-local-source-routing
 21 policy-filter
 22 max-datagram-reassembly
 23 default-ttl
 26 mtu
 27 all-subnets-local
 31 router-discovery
 32 router-solicitation
 33 static-route
 34 trailer-encapsulation
 35 arp-timeout
 36 ethernet-encap
 37 tcp-ttl
 38 tcp-keepalive
 40 nis-domain
 41 nis-server
 42 ntp-server
 44 netbios-ns
 45 netbios-dd
 46 netbios-nodetype
 47 netbios-scope
 48 x-windows-fs
 49 x-windows-dm
 58 T1
 59 T2
 60 vendor-class
 64 nis+-domain
 65 nis+-server
 66 tftp-server
 67 bootfile-name
 68 mobile-ip-home
 69 smtp-server
 70 pop3-server
 71 nntp-server
 74 irc-server
 77 user-class
 80 rapid-commit
 93 client-arch
 94 client-interface-id
 97 client-machine-id
119 domain-search
120 sip-server
121 classless-static-route
125 vendor-id-encap
150 tftp-server-address
255 server-ip-address
```

---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com/)

