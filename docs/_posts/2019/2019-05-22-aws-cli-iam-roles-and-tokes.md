---
date: 2019-05-22
categories:
    - AWS 
    - Security
    - Linux
tags:
    - aws
    - security
    - authentication
    - linux
description: "AWS STS assume-role command example that converts temporary credentials into exportable environment variables for CLI sessions and automation use."
---

# aws-cli-iam-roles-and-tokes

AWS cli IAM roles and tokens

```bash

aws sts assume-role --role-arn arn:aws:iam::ACCOUNT-NUMBER:role/ROLE-NAME --role-session-name "RoleSession1" | \
sed 's/[," :]//g;s/AccessKeyId/export AWS_ACCESS_KEY_ID=/;s/SessionToken/export AWS_SECURITY_TOKEN=/;s/SecretAccessKey/export AWS_SECRET_ACCESS_KEY=/' | \
grep 'export' | \
tee credentials.properties

export AWS_ACCESS_KEY_ID=xxxxxxxxxxx
export AWS_SECURITY_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

```

