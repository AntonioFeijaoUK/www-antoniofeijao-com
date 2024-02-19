---
date: 2024-01-17
last_modified_at: 2024-01-17

title: "aws sts decode-authorization-message"

#layout: splash
#excerpt_separator: <!--more-->
#permalink: /plugins/
categories: ["aws", "sts", "decode-authorization-message"]
tags:       ["aws", "sts", "cli"]
---

Decoding the `aws sts decode-authorization-message`

I included `jq` and `tr` commands to "clean up"  and make the decoded message easier to read.

Note:
- One of the command is `jq`, from `jquery`, which usually doesn't come installed by default in some OS, keep that in mind in case you might need to install it.
- You need to have the sts permission to run the decode message - `sts:DecodeAuthorizationMessage`

* **TIP** - I added the message to a variable, which makes it easier to read the command `aws sts decode-authorization-message`

```bash
enc_message="akjhkajshdkjahsdkjhakjshdais8duas8d7a98sd7a9s87da....example...." #replace with your encoded message

aws sts decode-authorization-message --encoded-message ${enc_message} | jq '.DecodedMessage' | tr -d '\\' | tr ',' '\n'
```

further reading from AWS documentation:

* <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sts/decode-authorization-message.html>
* <https://docs.aws.amazon.com/STS/latest/APIReference/API_DecodeAuthorizationMessage.html>
* <https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/sts/client/decode_authorization_message.html>
* <https://repost.aws/knowledge-center/backup-decode-encoded-error>

---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com/)
