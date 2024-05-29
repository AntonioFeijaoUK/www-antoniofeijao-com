---
date: 2024-05-29
title: "List all AWS VPCs or subnets with theirs tags and list them using jquery"

categories: ["aws", "ec2", "describe-vpcs", "tags", "jq"]
tags:       ["aws", "ec2", "vpcs", "jq"]
---

Example AWS cli command with listing using [.jq(https://jqlang.github.io/jq/)].

This commands list all AWS VPCs within the account with their `VpcId`, `CidrBlock` and their `Tags`.

```bash

aws ec2 describe-vpcs | jq -r '.Vpcs[] | "\(.VpcId) \t \(.CidrBlock) \t \(.Tags[] | "\(.Key); \(.Value)" )" '

```

It is also possible to "select" a specific Tags.


```bash
aws ec2 describe-vpcs | jq -r '.Vpcs[] | "\(.VpcId) \t \(.CidrBlock) \t \(.Tags[] | select(.Key == "Application") | .Value)" '
```

documentation for <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/describe-vpcs.html>

---

List all Subnets with filter .key, .value data that I picked.

the `sort -nk5` at the end, put on put the subnet with the least number of available IPs, taken from `.AvailableIpAddressCount`.

```bash
aws ec2 describe-subnets | jq -r '.Subnets[] | "\(.AvailabilityZone); \(.AvailabilityZoneId); \(.VpcId); \(.CidrBlock); \t \(.AvailableIpAddressCount); \t \(.Tags[] | select(.Key == "Name")| .Value)  "  ' | sort -nk5
```

documentation for <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/describe-subnets.html>

---

Next, why not rotate through other AWS accounts in the Org if you have them?! and rotate through regions?! :)

I have been there, done that, so leave the challenge for you :)

---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com/)
