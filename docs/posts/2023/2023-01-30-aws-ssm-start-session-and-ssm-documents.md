---
date: 2023-01-30
title: "AWS SSM documents and SSM session-start command to ssh directly to an instance without using the ssh keys"
#layout: splash
#excerpt: "Sample of some privacy plugins that can be used in Google Chrome, Mozilla Firefox and others."
#permalink: /plugins/
categories: ["AWS", "SSM", "Session", "SSH"]
tags:       ["aws", "networking", "remote-session", "ssh"]
---

Assuming you have a role with the necessary permissions, you can list the instances `InstanceId` and the tags `Name` if present, within the region you define.

## aws-ec2-list-all-ec2-instance-and-their-tag-name

```bash
for instance in $(aws ec2 describe-instances | jq -r '.Reservations[].Instances[].InstanceId' ); do
    echo "${instance} : $(aws ec2 describe-instances --instance-ids ${instance} | jq '.Reservations[].Instances[].Tags[] | select(.Key == "Name")|.Value') "
done
```

> (*"ping me" if you know how to simplify the above comand with the --query native from aws cli*)

Then you can run various [AWS Systems Manager documents (SSM document)](https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-ssm-docs.html) against a "target" instance(s).

docs here - <https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-ssm-docs.html>

---

## aws-ssm-list-documents-example

If you prefer the `AWS CLI`, you can list available documents.

```bash
aws ssm list-documents
```

docs here - <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ssm/list-documents.html>

---

## example-using-aws-ssm-start-session

docs here - <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ssm/start-session.html>

```bash
aws ssm start-session --target i-123456789012
```

---

## by-antonio-feijao-uk

Thank you for you time and happy learning,

[Antonio Feijao](https://www.antoniofeijao.com)
