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

S3 events for:

* `s3:ObjectCreated:Put`

* `s3:ObjectCreated:CompleteMultipartUpload`


3) Target a lambda functions to run below logic


* DISCLAIMER >> `Use at your own responsability.` << 

## Sample Lambda code

```python
import json
import urllib.parse
import boto3

import os
sns_topic_arn = os.environ['sns_topic_arn']

print('Loading function')

s3_client  = boto3.client('s3')
sns_client = boto3.client('sns')

# useful links
# https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/python/example_code/s3/s3_basics/presigned_url.py
# https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.generate_presigned_url
# https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-presigned-urls.html
# https://docs.aws.amazon.com/lambda/latest/dg/with-s3-tutorial.html


def lambda_handler(event, context):
    #print("Received event: " + json.dumps(event, indent=2))
    #print('This is sns_topic_arn: {}.'.format(sns_topic_arn))

    # Get the object from the event and show its content type
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    
    try:
        response = s3_client.get_object(Bucket=bucket, Key=key)
        #print("CONTENT TYPE: " + response['ContentType'])
        #print('Object name `{}` from bucket `{}`.'.format(key, bucket))
        
        url = s3_client.generate_presigned_url(
            ClientMethod='get_object',
            Params={'Bucket': bucket, 'Key': key},
            ExpiresIn='25200' #7 days
        )
        
        #print('This is the result URL - {} '.format(url))
        
        #presigned_url_for_email = '<a href="{}">Your private link for download</a>'.format(url)
        #print(presigned_url_for_email)
        
        response = sns_client.publish(
             TopicArn=sns_topic_arn,
             Message='Notification for bucket {}. \nA new file name {} was added. \n\nHere is the link for download: \n\n {} \n\nPlease let us know if you need a new link as for security they expire after 1 hour. \nThank you. \nThe fantastic staff.'.format(bucket, key, url),
             Subject='Bucket notification - new file {}'.format(key)
        )
        
        return 0
        #response['ContentType']
        
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e
```

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
