---
title: AWS run multiple commands in multiple AWS accounts in the AWS Organizations at the same time
categories: ["AWS", "CLI", "commands", "AWS Organizations"]
tags:       ["aws", "cli", "commands", "linux", "bash", "scripting", "aws organizations", "coding"]
---

AWS run multiple commands in multiple AWS accounts in the AWS Organizations at the same time

** USE AT YOUR OWN RESPONSABILITY **

I needed to run the same [AWS CLI](https://aws.amazon.com/cli/) command in multiple accounts within an [AWS Organization](https://aws.amazon.com/organizations/).

I like code that is easy to read, does what is meant to do, is quick to run, is "safe" and efficient.

Might not be perfect for everyone, but it does well what I need it to do, and might be useful for others or for me again in the feature.

So, I built a script to do what I need in a way that can be re-used for multiple commands in multiple accounts at the same time.

If you have, for example `+100 AWS Accounts`, you might want to "slow down" this script.

for example, I sometimes use the for-loop below to "slow down" my script :)

```bash
for NUMBER in $(seq 0 9); do
    ./99-run-this-command-on-this-account.sh ${NUMBER} ; sleep 20
done
```


## Script to run command multiple AWS account within the organisation

!!! Important - You need to assume a role first that can assume roles in the other accounts


`cat 99-run-this-command-on-this-account.txt`

```bash
#!/bin/bash


run_this_command () {
      account_id=$1
    account_name=$2
       role_name=$3

    echo "--------------------------------------------"
    echo "Going to run a command on ${account_id}, ${account_name}, using the role: ${role_name}"

    # assume a role in the account
    new_role=$(aws sts assume-role --role-arn "arn:aws:iam::${account_id}:role/${role_name}" --role-session-name ${account_id}-${role_name})

    AWS_ACCESS_KEY_ID=$(echo ${new_role} | jq -r '.Credentials.AccessKeyId' )
    AWS_SECRET_ACCESS_KEY=$(echo ${new_role} | jq -r '.Credentials.SecretAccessKey' )
    AWS_SESSION_TOKEN=$(echo ${new_role} | jq -r '.Credentials.SessionToken' )

    ACCOUNT_ID=$(echo ${new_role} | jq -r '.AssumedRoleUser.Arn' | cut -f 5 -d ':')

    export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
    export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
    export AWS_SESSION_TOKEN=${AWS_SESSION_TOKEN}

    export ACCOUNT_ID={ACCOUNT_ID}

    echo "Got key_id >>${AWS_ACCESS_KEY_ID}<< for account_id >>${account_id}, ${account_name}<< "

    #aws s3 ls

    aws securityhub update-standards-control \
        --standards-control-arn "arn:aws:securityhub:eu-west-2:${account_id}:control/cis-aws-foundations-benchmark/v/1.2.0/1.13" \
        --control-status "DISABLED" \
        --disabled-reason "SCP applied at the root level for the organisation will block any root actions."

    aws securityhub update-standards-control \
        --standards-control-arn "arn:aws:securityhub:eu-west-2:${account_id}:control/cis-aws-foundations-benchmark/v/1.2.0/1.14" \
        --control-status "DISABLED" \
        --disabled-reason "SCP applied at the root level for the organisation will block any root actions."

    aws securityhub update-standards-control \
        --standards-control-arn "arn:aws:securityhub:eu-west-2:${account_id}:control/aws-foundational-security-best-practices/v/1.0.0/IAM.6" \
        --control-status "DISABLED" \
        --disabled-reason "SCP applied at the root level for the organisation will block any root actions."

    #for bucket in $(aws s3api list-buckets | jq '.Buckets[].Name' | sed s/'"'//g) ; do
    #    echo "${account_id}, ${account_name}, enabling PublicAccessBlockConfiguration for bucket: ${bucket}" ;
    #    #aws s3api get-public-access-block --bucket ${MYBUCKET} | jq '.PublicAccessBlockConfiguration' ;
    #    aws s3api put-public-access-block \
    #          --bucket ${bucket} \
    #          --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
    #done

}




number=$1
role_name=<ROLE_NAME_IN_HERE>
filter_name="prod"

# DO I NEED to filter by account name?
#
# DO I NEED a specific list of accounts?  >> command to list account - 'aws organizations list-accounts'
#
# Below, sample filter to list account by creation date.
# cat ./results/00-list-of-accounts-in-org.txt
# jq -r '.Accounts[] | "\(.JoinedTimestamp);\(.Id);\(.Name)" ' ./results/00-list-of-accounts-in-org.txt  | sort | grep '2022-03' | awk -F ';' '{print $2 ";" $3}'
# jq -r '.Accounts[] | "\(.JoinedTimestamp);\(.Id);\(.Name)" ' ./results/00-list-of-accounts-in-org.txt  | sort | grep '2022-03' | awk -F ';' '{print $2 ";" $3}' > work-on-this-list-of-accounts.txt
#
# pick your for-loop
#
#for account in $(jq '.Accounts[] | .Id + ";" + .Name' ./results/00-list-of-accounts-in-org.txt | tr -d '"' | sort | grep ^${number} | grep -v ${filter_name} ); do
#for account in $(jq '.Accounts[] | .Id + ";" + .Name' ./results/00-list-of-accounts-in-org.txt | tr -d '"' | sort | grep ^${number} ); do
 for account in $(cat ./work-on-this-list-of-acocunts.txt | tr -d '"' | sort | grep ^${number} ); do

    #sample account result: "000123456789;my-super-aws-account-name"
    account_id=$(  echo ${account} | cut -f1 -d ';' )
    account_name=$(echo ${account} | cut -f2 -d ';' )

    echo "Getting ready to run a command on this account : ${account_id}; ${account_name}
        "
    run_this_command ${account_id} ${account_name} ${role_name} &

done

```
