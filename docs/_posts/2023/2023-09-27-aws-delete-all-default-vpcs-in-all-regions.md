---
title: "AWS CLI command-line script How to automatically delete all Default-Vpcs in all AWS regions"
layout: splash
#excerpt_separator: <!--more-->
#permalink: /plugins/
categories: ["aws", "cli", "delete-default-vpcs-in-all-regions"]
tags:       ["aws", "cli", "linux", "", "script"]
---

AWS CLI command-line script How to automatically delete all Default-Vpcs in all AWS regions.


## linux-bash-script

>> USE AT YOUR OWN RISK <<

```bash

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
                ## Uncomment the lines below to delete the default VPC in all regions.
                ## The script still needs to have enough permission to delete the default VPC.
                #VPCID=${RESULT:0:-5}
                #aws ec2 delete-vpc --vpc-id ${VPCID} - ${REGION}
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
