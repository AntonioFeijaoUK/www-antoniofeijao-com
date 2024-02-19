---
date: 2022-02-24
title: AWS Systems Manager or AWS SSM to create a private Networking tunnel to resources in the private subnet
categories: ["AWS", "SSM", "Networking", "Tunnel", "Security"]
tags:       ["aws", "security", "ssm", "networking", "linux"]
---

AWS Systems Manager or AWS SSM to create a private Networking tunnel to resources in the private subnet

**Pre-requisit**

you need the AWS SSM agent installed on your laptop/desktop - documentation here <https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html>


## AWS SSM create a tunnel to Linux instance in an AWS private subnet

1) Assume a role in the account

2) Get the instance ID you want to tunnel to

3) Start a session with AWS SSM agent

Sample commands for creating a tunnel to the instance on port 3389 and my PC/laptop localhost on port 5222

```bash
# Using a variable, so easier to reuse the command

instance_id="i-Xxxxxx"


# Sample command for creating a tunnel to the instance on port 22 and my PC/laptop localhost on port 5222

aws ssm start-session --target ${instance_id} \
    --document-name AWS-StartPortForwardingSession \
    --parameters portNumber="22",localPortNumber="5222" \
    --region eu-west-2
```

After creating the tunnel to the instance, you still need a valid ssh key to `ssh` into the ec2 instance.

Via the SSM in the console, you could add your public key to the `authorized-keys` - where is another website explaning that <https://www.ssh.com/academy/ssh/authorized-keys-file>

----


## Example using AWS SSM to create a private networking tunnel to use as remote desktop into a Windows instance in a private subnet

Sample command for creating a tunnel to the instance on port 3389 and my PC/laptop localhost on port 5222

Same step above 1) and 2)

3) Create the tunnel with the RDP port as a destination portNumber

```bash
# Using a variable, so easier to reuse the command

instance_id="i-Xxxxxx"


# Sample command for creating a tunnel to the instance on port 22 and my PC/laptop localhost on port 5222

aws ssm start-session --target ${instance_id} \
    --document-name AWS-StartPortForwardingSession \
    --parameters portNumber="3389",localPortNumber="5222" \
    --region eu-west-2
```

Now, using your favourity remote destop application, you can RDP to `localhost:5222` which will be tunneled into the Windows instance in the private subnet on port 3389.

----

## Additional documentation

* "Port Forwarding Using AWS System Manager Session Manager"

<https://aws.amazon.com/blogs/aws/new-port-forwarding-using-aws-system-manager-sessions-manager/>


* "... Tunnel through AWS Systems Manager to access my private VPC resources"

<https://aws.amazon.com/premiumsupport/knowledge-center/systems-manager-ssh-vpc-resources/>

