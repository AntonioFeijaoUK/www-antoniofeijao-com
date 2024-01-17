---
title: "aws sts decode-authorization-message"
layout: splash
#excerpt_separator: <!--more-->
#permalink: /plugins/
categories: ["aws", "sts", "decode-authorization-message"]
tags:       ["aws", "sts", "cli"]
---

Decoding the `aws sts decode-authorization-message`

I included `jq` and `tr` commands to "clean up"  and make the decoded message easier to read.

Note that one of the command is `jq`, from `jquery`, which usually doesn't come installed by default in some OS, keep that in mind in case you might need to install it.

* **TIP** - I added the message to a variable, which makes it easier to read the command `aws sts decode-authorization-message`

```bash
enc_message="akjhkajshdkjahsdkjhakjshdais8duas8d7a98sd7a9s87da" #replace with your encoded message

aws sts decode-authorization-message --encoded-message ${enc_message} | jq '.DecodedMessage' | tr -d '\\' | tr ',' '\n'
```

further reading from AWS documentation:

* <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sts/decode-authorization-message.html>
* <https://repost.aws/knowledge-center/backup-decode-encoded-error>

---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com/)
