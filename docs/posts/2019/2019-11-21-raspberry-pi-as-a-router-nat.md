---
categories:
    - Linux
    - Raspberry-Pi
    - Networking
tags:
    - linux
    - raspberry-pi
    - networking
---

Transform to run as a router and NAT device


Finally! This project is now documented here - <https://antonio.cloud/projects/linux/raspberry-pi/raspberry-pi-router-access-point-dns-block-ads-vpn/>


!!!important
    Below are notes from my old post

```bash
## the command below required sudo

echo "-----------------------"
echo "Shows the configs before changes..."

sysctl net.ipv4.ip_forward net.ipv4.conf.eth0.send_redirects

iptables -n -t nat -L POSTROUTING 


echo "-----------------------"
echo "Enabling IPv4 routing packets forward..."

sysctl -q -w net.ipv4.ip_forward=1 net.ipv4.conf.eth0.send_redirects=0


echo "-----------------------"
echo "Enabling routing/PAT with ip tables..."

iptables -t nat -C POSTROUTING -o eth0 -j MASQUERADE 2> /dev/null || iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE


echo "-----------------------" 
echo "Show configs after changes..."
sysctl net.ipv4.ip_forward net.ipv4.conf.eth0.send_redirects
iptables -n -t nat -L POSTROUTING 


echo "-----------------------"
echo "Routing/NAT configuration completed "
```

- inspiration and part of source code from <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html>
