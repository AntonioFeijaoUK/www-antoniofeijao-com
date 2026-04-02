---
date: 2023-01-13
title: "AWS SSM command to tunnel proxy network traffic to another remote instance"
#excerpt: "Sample of some privacy plugins that can be used in Google Chrome, Mozilla Firefox and others."
#permalink: /plugins/
categories: ["AWS", "SSM", "Tunnel", "Proxy"]
tags:       ["aws", "networking", "tunnel", "ssm", "proxy"]
---

If you have access to an instance (server, virtual machine) in `AWS`,  

and this instance can access to other applications,  

this means you can use this machine to `proxy` traffic from your local laptop (desktop or server) to the specified host.

## requirements

Your local laptop needs permission to use the AWS SSM agent - `AWS STS` role or temporary token.

Your local laptop connects to the instance in AWS and then forward the traffic to the `host` specified in the command.

If you do not specify the remote `host`, you will be connected to a local port on your AWS instance.


## example

For example, adjust as needed.

Connect to ${INSTANCE_ID} and tunnel (forward, proxy) traffic to the remote IP `192.168.0.10`.

```bash

INSTANCE_ID="i-123456789012345"

aws ssm start-session \
    --target ${INSTANCE_ID} \
    --document-name AWS-StartPortForwardingSessionToRemoteHost \
    --parameters '{ "host":["192.168.0.10"], "portNumber":["443"], "localPortNumber":["8443"] }'

```

---

## documentation

- documentation at <https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-sessions-start.html>

---

## antonio feijao uk

Happy learning,

[Antonio Feijao](https://www.antoniofeijao.com)
