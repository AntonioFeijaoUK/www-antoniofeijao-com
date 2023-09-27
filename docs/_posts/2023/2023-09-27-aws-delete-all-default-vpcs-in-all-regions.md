---
title: "AWS CLI command-line script How to automatically delete all Default-Vpcs in all AWS regions"
layout: splash
#excerpt_separator: <!--more-->
#permalink: /plugins/
categories: ["aws", "cli", "delete-default-vpcs-in-all-regions"]
tags:       ["aws", "cli", "linux", "", "script"]
---

AWS CLI command-line script How to automatically delete all Default-Vpcs in all AWS regions.

The script needs to have enough permissions.

The script will fail if there are other dependences than the ones dealt in the script.


## linux-bash-script

>> USE AT YOUR OWN RISK <<

```bash
#!/bin/bash

## uncomment to see the commands as they are executed.
#set -x

## gets a list of all AWS regions

LIST_OF_REGIONS=$(aws ec2 describe-regions --all-regions --query "Regions[].{Name:RegionName}" --output text)


## for-loop to circle through all regions

for REGION in ${LIST_OF_REGIONS}; do
    echo "---------"
    RESULT=$(aws ec2 describe-vpcs --region ${REGION} --query "Vpcs[].[VpcId,IsDefault]" --output text 2>/dev/null)
    echo "${REGION} : ${RESULT}"
    if [ -z "${RESULT}" ];
        then
            echo "NULL";
        else
            echo "Not NULL";
            ## >> AT YOUR OWN RISK <<
            ## Uncomment the `aws ec2 ...` lines below to delete the default VPC in all regions.
            ## The script still needs to have enough permission to run the commands.
            
            VPCID=${RESULT:0:-5}
            echo "Default-VPC ID: ${VPCID}"
            
            ## We need to detach AND delete the correct Internet Gateway (IGW),
            ## before we can delete the Default-VPC.
            
            IGW=$(aws ec2 --region ${REGION} describe-internet-gateways --filters "Name=attachment.vpc-id,Values=${VPCID}" --query 'InternetGateways[].InternetGatewayId' --output text)
            echo "IGW ID in the Default-VPC: ${IGW}"
            
            ## detaches the IGW from the Default-VPC
            #aws ec2 detach-internet-gateway --internet-gateway-id ${IGW} --vpc-id ${VPCID} --region ${REGION}
            
            ## deletes de IGW after being detached from the Default-VPC
            #aws ec2 delete-internet-gateway --internet-gateway-id ${IGW} --region ${REGION}
            
            ## deletes de Default-VPC
            #aws ec2 delete-vpc --vpc-id ${VPCID} --region ${REGION} 
    fi

done
```

---

## aws-documentation

* <https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-regions.html>
* <https://docs.aws.amazon.com/vpc/latest/userguide/delete-vpc.html>


---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com/)
