---
date: 2022-07-25
---

# aws-lambda-function-to-email-notification-for-new-file-uploaded

```py
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
