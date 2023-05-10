---
title: "AWS advanced networking playing with AWS Gateway Load balancer"
#layout: splash
excerpt_separator: <!--more-->
#permalink: /plugins/
categories: ["AWS", "Networking", "GatewayLoadBalancer"]
tags:       ["aws-cli", "gwlb", "gateway", "bash", "script", "loadbalancer"]
---

AWS advanced networking, playing with AWS Gateway Load balancer (GWLB).

tag: `workshop-gwlb`

## possible-source

* https://catalog.workshops.aws/networking/en-US/gwlb

## documents-info-blog-posts

<https://aws.amazon.com/blogs/networking-and-content-delivery/introducing-aws-gateway-load-balancer-supported-architecture-patterns/>

<https://aws.amazon.com/elasticloadbalancing/gateway-load-balancer/>

## poc-with-aws-gateway-load-balancer-gwlb

proof of concept with AWS Gateway Load Balancer GWLB

```bash
cd /tmp

curl --silent http://169.254.169.254/latest/dynamic/instance-identity/document > /home/ec2-user/iid;

export instance_interface=$(curl --silent http://169.254.169.254/latest/meta-data/network/interfaces/macs/);

export instance_vpcid=$(curl --silent http://169.254.169.254/latest/meta-data/network/interfaces/macs/$instance_interface/vpc-id);

export instance_az=$(cat /home/ec2-user/iid |grep 'availability' | awk -F': ' '{print $2}' | awk -F',' '{print $1}');

export instance_ip=$(cat /home/ec2-user/iid |grep 'privateIp' | awk -F': ' '{print $2}' | awk -F',' '{print $1}' | awk -F'"' '{print$2}');

export instance_region=$(cat /home/ec2-user/iid |grep 'region' | awk -F': ' '{print $2}' | awk -F',' '{print $1}' | awk -F'"' '{print$2}');

export gwlb_ip=$(aws --region $instance_region ec2 describe-network-interfaces --filters Name=vpc-id,Values=$instance_vpcid | jq ' .NetworkInterfaces[] | select(.AvailabilityZone=='$instance_az') | select(.InterfaceType=="gateway_load_balancer") |.PrivateIpAddress' -r);
```

* Start httpd and configure `index.html`

```bash
systemctl start httpd;
touch /var/www/html/index.html;
echo > /var/www/html/index.html;
echo "<html>" >> /var/www/html/index.html
echo "  <head>" >> /var/www/html/index.html
echo "    <title>Gateway Load Balancer POC</title>" >> /var/www/html/index.html
echo "    <meta http-equiv='Content-Type' content='text/html; charset=ISO-8859-1'>" >> /var/www/html/index.html
echo "  </head>" >> /var/www/html/index.html
echo "  <body>" >> /var/www/html/index.html
echo "    <h1>Welcome to Gateway Load Balancer POC:</h1>" >> /var/www/html/index.html
echo "  </body>" >> /var/www/html/index.html
echo "</html>" >> /var/www/html/index.html
```

* Start and configure `iptables`

```bash
systemctl enable iptables;
systemctl start iptables;
```

* Configuration below `allows all traffic`

```bash 
# Set the default policies for each of the built-in chains to ACCEPT:
iptables -P INPUT ACCEPT;
iptables -P FORWARD ACCEPT;
iptables -P OUTPUT ACCEPT;
```

* Flush the nat and mangle tables, flush all chains (-F), and delete all non-default chains (-X):

```bash
iptables -t nat -F;
iptables -t mangle -F;
iptables -F;
iptables -X;
```

* Configure nat table to hairpin traffic back to GWLB

```bash
iptables -t nat -A PREROUTING -p udp -s $gwlb_ip -d $instance_ip -i eth0 -j DNAT --to-destination $gwlb_ip:6081;
iptables -t nat -A POSTROUTING -p udp --dport 6081 -s $gwlb_ip -d $gwlb_ip -o eth0 -j MASQUERADE;
```

* Save iptables
```bash
service iptables save;
   
iptables -L -n
```
---

## antonio-feijao-uk

Thank you, and happy learning.

[Antonio Feijao UK](https://www.antoniofeijao.com)
