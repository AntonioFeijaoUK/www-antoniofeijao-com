---
date: 2024-04-29
title: "List all AWS VPCs with theirs tags using jquery"

categories: ["aws", "ec2", "describe-vpcs", "tags", "jq"]
tags:       ["aws", "ec2", "vpcs", "jq"]
---

Example command in JQ that was useful for me.

This commands list all AWS VPCs within the account with their `VpcId`, `CidrBlock` and their `Tags`.

```bash

aws ec2 describe-vpcs | jq -r '.Vpcs[] | "\(.VpcId) \t \(.CidrBlock) \t \(.Tags[] | "\(.Key); \(.Value)" )" '

```

It is also possible to "select" a specific Tags.


```bash
aws ec2 describe-vpcs | jq -r '.Vpcs[] | "\(.VpcId) \t \(.CidrBlock) \t \(.Tags[] | select(.Key == "Application") | .Value)" '
```

---

Next, why not rotate through other AWS accounts in the Org if you have them?! and rotate through regions?! :)

I have done that before, so leave the challenge with you.


---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com/)
