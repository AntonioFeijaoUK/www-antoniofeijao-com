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

## for-loop to cycle through all regions

for REGION in ${LIST_OF_REGIONS}; do
    echo "---------"
    echo "Region: ${REGION}"

    RESULT=$(aws ec2 describe-vpcs --region ${REGION} --query "Vpcs[].[VpcId,IsDefault]" --output text 2>/dev/null)
    if [ -z "${RESULT}" ];
        then
            echo "NULL - No Default-VPC in the region: ${REGION}"
        else
            echo "Not NULL - There is a Default-VPC in the region: ${REGION}"
            ##
            ## --- use AT YOUR OWN RISK ---
            ##
            ## Uncomment the `aws ec2 ...` lines below to delete the default VPC in all regions.
            ## The script still needs to have enough permission to run the commands.
            ##
            
            VPCID=${RESULT:0:-5}
            echo "${REGION} : ${VPCID}"
            
            ## We need to detach AND delete the correct Internet Gateway (IGW), before we can delete the Default-VPC.
            
            IGW=$(aws ec2 describe-internet-gateways --region ${REGION} --filters "Name=attachment.vpc-id,Values=${VPCID}" --query 'InternetGateways[].InternetGatewayId' --output text)
            
            ## IF IGW exists, then detaches and deletes the IGW from the Default-VPC
            if [ -z "${IGW}" ];
                then
                    echo "NULL"
                    echo "IGW already removed"
                else
                    echo "Removing and deleting the IGW: ${IGW}, from the Default-VPC: ${VPCID}."
                    #aws ec2 detach-internet-gateway --region ${REGION} --internet-gateway-id ${IGW} --vpc-id ${VPCID}
                    #aws ec2 delete-internet-gateway --region ${REGION} --internet-gateway-id ${IGW}
            fi
            
            ## From my own experience, also need to delete any subnets associated with the Default-VPC.

            LIST_OF_SUBNETS=$(aws ec2 describe-subnets --region ${REGION} --filters "Name=vpc-id,Values=${VPCID}" --query "Subnets[*].[SubnetId]" --output text)

            echo "List of subnets on the Default-VPC: ${LIST_OF_SUBNETS}"

            ## could add an if loop here too...

            for SUBNET in ${LIST_OF_SUBNETS}; do
                aws ec2 delete-subnet --region ${REGION} --subnet-id ${SUBNET}
            done

            ## Finally, deletes de Default-VPC

            #aws ec2 delete-vpc --vpc-id ${VPCID} --region ${REGION} 
    fi

done
```

---

## aws-documentation

* <https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-regions.html>
* <https://docs.aws.amazon.com/vpc/latest/userguide/delete-vpc.html>
* <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/describe-subnets.html>
* <https://repost.aws/knowledge-center/troubleshoot-dependency-error-delete-vpc>

---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com/)
