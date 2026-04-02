---
date: 2022-10-26
title: "AWS Organisation get only the account name from the account id"
#layout: splash
#excerpt: "Sample of some privacy plugins that can be used in Google Chrome, Mozilla Firefox and others."
#permalink: /plugins/
categories: ["AWS", "boto3", "Organizations"]
tags:       ["script", "python", "organizations", "aws"]
---

AWS Organisation get only the account name from the account id

```python
import boto3

organizations = boto3.client('organizations')

organizations.describe_account(AccountId='123456789012')

account_name = organizations.describe_account(AccountId='123456789012')['Account']['Name']

print(account_name)
```
source: <https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/organizations.html#Organizations.Client.describe_account>
