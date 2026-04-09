---
date: 2019-05-22
categories:
    - AWS
    - Linux
tags:
    - aws
    - ec2
    - command-line
description: "AWS CLI loop script to enumerate EC2 instances across all regions with account owner, availability zone, VPC, instance type, and state."
---

# aws-cli-find-all-instances-in-all-regions

Lists all ec2 instances in all regions including account owner, instance id, instance type, statues and region.

```bash

for region in `aws ec2 describe-regions --output text | cut -f4`; do
    echo -e "\nInstances in: '$region':";
    aws ec2 describe-instances --query 'Reservations[*].Instances[*].[NetworkInterfaces[0].OwnerId, Placement.AvailabilityZone, VpcId, InstanceId, InstanceType, State.Name]' --output text --region ${region};
done;

```
