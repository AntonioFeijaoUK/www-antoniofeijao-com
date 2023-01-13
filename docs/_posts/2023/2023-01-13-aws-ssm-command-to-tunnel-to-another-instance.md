---
title: "AWS SSM command to tunnel network traffic to another instance"
#layout: splash
#excerpt: "Sample of some privacy plugins that can be used in Google Chrome, Mozilla Firefox and others."
#permalink: /plugins/
categories: ["AWS", "SSM", "Tunnel"]
tags:       ["aws", "networking", "tunnel", "ssm"]
---

If you have access to an instance (server, virtual machine) in `AWS`, and this instance can access to other applications,  
you then can use this machine to `proxy` traffic from your local laptop (desktop or server) to the specified host.

- You local laptop needs to have enough permission to use the AWS SSM agent.

- Your local laptop connecto to the instance in AWS and them forward the traffic to the `host` specified in the command.

- If you don't specify the host, you will be connected to localt port on your AWS instance.

Sample command, adjust and adapt as needed.

```bash
aws ssm start-session \
    --target ${INSTANCE_ID} \
    --document-name AWS-StartPortForwardingSessionToRemoteHost \
    --parameters '{ "host":["${OTHER_REMOTE_HOST}"], "portNumber":["443"], "localPortNumber:["8443"] }' 
```

---

- documentation at <https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-sessions-start.html>

---

Happy learning,

[Antonio Feijao](https://www.antoniofeijao.com)
