---
title: AWS EC2 userdata sample script to build an Webpage
date: 2020-04-21
last_modified_at: 2021-12-16
categories:
    - AWS
    - Linux
    - Bash
tags:
    - shell
    - bash
    - aws
    - ec2
    - script
---

Sample of an AWS EC2 `userdata` script that install `apache` and automatically creates an `index.html` file as a landing webpage with information about the instance - `instanceId`, `availabilityZone`, `instanceType` and `region`. This could also be used with [launch configuration](https://docs.aws.amazon.com/autoscaling/ec2/userguide/LaunchConfiguration.html) on an [Auto Scaling Group](https://docs.aws.amazon.com/autoscaling/ec2/userguide/AutoScalingGroup.html) (`ASG`) to use as multiple instance on [Elastic Load Balancing load balancer](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-register-lbs-with-asg.html) (`ALB`) to easy show the usage of multiple instances behind the load balancer.


At your own risk, always review what you are running.

To run this userdata script, add the below into the EC2 userdata

```bash
#!/bin/bash
curl https://raw.githubusercontent.com/AntonioFeijaoUK/aws-ec2-userdata-samples/master/sample01-hello-world-region-az.sh | bash

```



Repository is here [https://github.com/AntonioFeijaoUK/aws-ec2-userdata-samples](https://github.com/AntonioFeijaoUK/aws-ec2-userdata-samples)

Direct link is here [https://raw.githubusercontent.com/AntonioFeijaoUK/aws-ec2-userdata-samples/master/sample01-hello-world-region-az.sh](https://raw.githubusercontent.com/AntonioFeijaoUK/aws-ec2-userdata-samples/master/sample01-hello-world-region-az.sh)




Other samples on [AWS](https://aws.amazon.com)

- Sample EC2 with webserver - <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html>

- SAmple EC2 metadata - <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-identity-documents.html>




If you tried it and helped you understand better how it works, please leave a comment.



---

Happy learning

[Antonio Feijao UK](https://antonio.cloud)

