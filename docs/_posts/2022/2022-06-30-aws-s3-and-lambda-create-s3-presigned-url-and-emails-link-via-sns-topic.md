---
title: AWS S3 PutObject automatically creates a S3 Presigned URl and emails the link via SNS topic
categories: ["AWS", "S3", "Lambda", "SNS"]
tags:       ["automation", "security", "file-sharing", ""]
---

Sample lambda functions that run based on `S3 event trigger` on `s3:ObjectCreated`.

**UPDATE**

Upload objects greater than 16MB+ requires the additional event trigger of `s3:ObjectCreated:CompleteMultipartUpload`.

> Kudus for AWS Support for helping me with the troubleshoot.


1) SNS topic with email, txt, ... subscribers.

2) Create S3 event trigger with the lambda funtion as a target

![s3-object-created-trigger-lambda-and-sns-notification](/assets/images/s3-object-created-trigger-lambda-and-sns-notification.jpg "s3-object-created-trigger-lambda-and-sns-notification")

S3 events for:

* `s3:ObjectCreated:Put`

* `s3:ObjectCreated:CompleteMultipartUpload`


3) Target a lambda functions to run below logic

![lambda sample code for s3 presign url](/assets/images/lambda-sample-code-s3presign-url-and-sns.jpg)

* DISCLAIMER >> `Use at your own responsability.` << 

## Sample Lambda code

<script src="https://gist.github.com/AntonioFeijaoUK/c1c9649d8ce49927aa0a4454262a607f.js"></script>


---

## UPDATE and other details

Upload objects greater than 16MB+ requires the additional event trigger of `s3:ObjectCreated:CompleteMultipartUpload`.

> Kudus for AWS Support for helping me with the troubleshoot.

S3 events trigger for:

* `s3:ObjectCreated:Put`

* `s3:ObjectCreated:CompleteMultipartUpload`

Objects greater than `16MB` are getting uploaded as a `Multipart` uploads. 

> Multipart upload allows us to upload a single object as a set of parts.
> Each part is a contiguous portion of the object's data.



S3 bucket event `s3:ObjectCreated:Put` provides notification when an object is created by an HTTP PUT operation.

S3 bucket event `s3:ObjectCreated:CompleteMultipartUpload` provides notification for an object which was created by the completion of a `S3 multi-part upload`.


Documentation

* `Multipart` upload - <https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html>

* <https://aws.amazon.com/blogs/aws/s3-event-notification/>

* <https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-event-notifications.html>



Happy learning

Antonio Feijao
