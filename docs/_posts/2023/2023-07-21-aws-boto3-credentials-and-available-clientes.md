---
title: "AWS boto3 credentials, boto session and  boto3 available clients in python for the region the session was created."
layout: splash
#excerpt_separator: <!--more-->
#permalink: /plugins/
categories: ["aws", "boto3", "python"]
tags:       ["aws", "boto3", "boto3session", "boto3client", "cli", "python"]
---

About `AWS credentials`, `boto3.session`, list `boto3` available `clients` in `python3`, load and access `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`.

Documentation here <https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html>.

My notes below.

---

### aws-boto3-session

Example of AWS boto session credentials.

```py
import boto3

help(boto3.session.Session)
```

* output of `help(...)`

```py
Help on class Session in module boto3.session:

class Session(builtins.object)
 |  Session(aws_access_key_id=None, aws_secret_access_key=None, aws_session_token=None, region_name=None, botocore_session=None, profile_name=None)
 |
 |  A session stores configuration state and allows you to create service
 |  clients and resources.
 |
 |  :type aws_access_key_id: string
 |  :param aws_access_key_id: AWS access key ID
 |  :type aws_secret_access_key: string
 |  :param aws_secret_access_key: AWS secret access key
 |  :type aws_session_token: string
 |  :param aws_session_token: AWS temporary session token
 |  :type region_name: string
 |  :param region_name: Default region when creating new connections
 |  :type botocore_session: botocore.session.Session
 |  :param botocore_session: Use this Botocore session instead of creating
 |                           a new default one.
 |  :type profile_name: string
 |  :param profile_name: The name of a profile to use. If not given, then
 |                       the default profile is used.
 |
 |  Methods defined here:
 
 (...)
```

## creating-aws-boto3-session-with-aws-access-keys-secret-access-key-and-token

In this method, you must pass the AWS_ACCESS_KEY, SECRET and TOKEN through environment variables. It is not recommended to hard-code credentials.

```py
session = boto3.session.Session(
    aws_access_key_id     = AWS_ACCESS_KEY_ID,
    aws_secret_access_key = AWS_SECRET_ACCESS_KEY,
    aws_session_token     = AWS_SESSION_TOKEN,
    region_name='eu-west-2',
    botocore_session=None,
    profile_name=None
)
```

In this method, the boto3, session will look for credentials in various locations based on predefined order, as described in the documentation <https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html>.

```py
session = boto3.session.Session(
    region_name='eu-west-2'
)
```

## using-the-session-list-available-clients

```py
services = session.get_available_services()

print(services)
['accessanalyzer', 'account', 'acm', 'acm-pca', 'alexaforbusiness', 'amp', 'amplify', 'amplifybackend', 'amplifyuibuilder', 'apigateway', 'apigatewaymanagementapi', 'apigatewayv2', 'appconfig', 'appconfigdata', 'appflow', 'appintegrations', 'application-autoscaling', 'application-insights', 'applicationcostprofiler', 'appmesh', 'apprunner', 'appstream', 'appsync', 'arc-zonal-shift', 'athena', 'auditmanager', 'autoscaling', 'autoscaling-plans', 'backup', 'backup-gateway', 'backupstorage', 'batch', 'billingconductor', 'braket', 'budgets', 'ce', 'chime', 'chime-sdk-identity', 'chime-sdk-media-pipelines', 'chime-sdk-meetings', 'chime-sdk-messaging', 'chime-sdk-voice', 'cleanrooms', 'cloud9', 'cloudcontrol', 'clouddirectory', 'cloudformation', 'cloudfront', 'cloudhsm', 'cloudhsmv2', 'cloudsearch', 'cloudsearchdomain', 'cloudtrail', 'cloudtrail-data', 'cloudwatch', 'codeartifact', 'codebuild', 'codecatalyst', 'codecommit', 'codedeploy', 'codeguru-reviewer', 'codeguru-security', 'codeguruprofiler', 'codepipeline', 'codestar', 'codestar-connections', 'codestar-notifications', 'cognito-identity', 'cognito-idp', 'cognito-sync', 'comprehend', 'comprehendmedical', 'compute-optimizer', 'config', 'connect', 'connect-contact-lens', 'connectcampaigns', 'connectcases', 'connectparticipant', 'controltower', 'cur', 'customer-profiles', 'databrew', 'dataexchange', 'datapipeline', 'datasync', 'dax', 'detective', 'devicefarm', 'devops-guru', 'directconnect', 'discovery', 'dlm', 'dms', 'docdb', 'docdb-elastic', 'drs', 'ds', 'dynamodb', 'dynamodbstreams', 'ebs', 'ec2', 'ec2-instance-connect', 'ecr', 'ecr-public', 'ecs', 'efs', 'eks', 'elastic-inference', 'elasticache', 'elasticbeanstalk', 'elastictranscoder', 'elb', 'elbv2', 'emr', 'emr-containers', 'emr-serverless', 'es', 'events', 'evidently', 'finspace', 'finspace-data', 'firehose', 'fis', 'fms', 'forecast', 'forecastquery', 'frauddetector', 'fsx', 'gamelift', 'gamesparks', 'glacier', 'globalaccelerator', 'glue', 'grafana', 'greengrass', 'greengrassv2', 'groundstation', 'guardduty', 'health', 'healthlake', 'honeycode', 'iam', 'identitystore', 'imagebuilder', 'importexport', 'inspector', 'inspector2', 'internetmonitor', 'iot', 'iot-data', 'iot-jobs-data', 'iot-roborunner', 'iot1click-devices', 'iot1click-projects', 'iotanalytics', 'iotdeviceadvisor', 'iotevents', 'iotevents-data', 'iotfleethub', 'iotfleetwise', 'iotsecuretunneling', 'iotsitewise', 'iotthingsgraph', 'iottwinmaker', 'iotwireless', 'ivs', 'ivs-realtime', 'ivschat', 'kafka', 'kafkaconnect', 'kendra', 'kendra-ranking', 'keyspaces', 'kinesis', 'kinesis-video-archived-media', 'kinesis-video-media', 'kinesis-video-signaling', 'kinesis-video-webrtc-storage', 'kinesisanalytics', 'kinesisanalyticsv2', 'kinesisvideo', 'kms', 'lakeformation', 'lambda', 'lex-models', 'lex-runtime', 'lexv2-models', 'lexv2-runtime', 'license-manager', 'license-manager-linux-subscriptions', 'license-manager-user-subscriptions', 'lightsail', 'location', 'logs', 'lookoutequipment', 'lookoutmetrics', 'lookoutvision', 'm2', 'machinelearning', 'macie', 'macie2', 'managedblockchain', 'marketplace-catalog', 'marketplace-entitlement', 'marketplacecommerceanalytics', 'mediaconnect', 'mediaconvert', 'medialive', 'mediapackage', 'mediapackage-vod', 'mediapackagev2', 'mediastore', 'mediastore-data', 'mediatailor', 'memorydb', 'meteringmarketplace', 'mgh', 'mgn', 'migration-hub-refactor-spaces', 'migrationhub-config', 'migrationhuborchestrator', 'migrationhubstrategy', 'mobile', 'mq', 'mturk', 'mwaa', 'neptune', 'network-firewall', 'networkmanager', 'nimble', 'oam', 'omics', 'opensearch', 'opensearchserverless', 'opsworks', 'opsworkscm', 'organizations', 'osis', 'outposts', 'panorama', 'payment-cryptography', 'payment-cryptography-data', 'personalize', 'personalize-events', 'personalize-runtime', 'pi', 'pinpoint', 'pinpoint-email', 'pinpoint-sms-voice', 'pinpoint-sms-voice-v2', 'pipes', 'polly', 'pricing', 'privatenetworks', 'proton', 'qldb', 'qldb-session', 'quicksight', 'ram', 'rbin', 'rds', 'rds-data', 'redshift', 'redshift-data', 'redshift-serverless', 'rekognition', 'resiliencehub', 'resource-explorer-2', 'resource-groups', 'resourcegroupstaggingapi', 'robomaker', 'rolesanywhere', 'route53', 'route53-recovery-cluster', 'route53-recovery-control-config', 'route53-recovery-readiness', 'route53domains', 'route53resolver', 'rum', 's3', 's3control', 's3outposts', 'sagemaker', 'sagemaker-a2i-runtime', 'sagemaker-edge', 'sagemaker-featurestore-runtime', 'sagemaker-geospatial', 'sagemaker-metrics', 'sagemaker-runtime', 'savingsplans', 'scheduler', 'schemas', 'sdb', 'secretsmanager', 'securityhub', 'securitylake', 'serverlessrepo', 'service-quotas', 'servicecatalog', 'servicecatalog-appregistry', 'servicediscovery', 'ses', 'sesv2', 'shield', 'signer', 'simspaceweaver', 'sms', 'sms-voice', 'snow-device-management', 'snowball', 'sns', 'sqs', 'ssm', 'ssm-contacts', 'ssm-incidents', 'ssm-sap', 'sso', 'sso-admin', 'sso-oidc', 'stepfunctions', 'storagegateway', 'sts', 'support', 'support-app', 'swf', 'synthetics', 'textract', 'timestream-query', 'timestream-write', 'tnb', 'transcribe', 'transfer', 'translate', 'verifiedpermissions', 'voice-id', 'vpc-lattice', 'waf', 'waf-regional', 'wafv2', 'wellarchitected', 'wisdom', 'workdocs', 'worklink', 'workmail', 'workmailmessageflow', 'workspaces', 'workspaces-web', 'xray']
```

## import-pretty-print-pprint-as-pp-for-list-ouput

```py
from pprint import pprint as pp

pp(session.get_available_services())
['accessanalyzer',
 'account',
 'acm',
 'acm-pca',
 'alexaforbusiness',
 'amp',
 'amplify',
 'amplifybackend',
 'amplifyuibuilder',
 'apigateway',
 'apigatewaymanagementapi',
 'apigatewayv2',
 'appconfig',
 'appconfigdata',
 'appflow',
 'appintegrations',
 'application-autoscaling',
 'application-insights',
 'applicationcostprofiler',
 'appmesh',
 'apprunner',
 'appstream',
 'appsync',
 'arc-zonal-shift',
 'athena',
 'auditmanager',
 'autoscaling',
 'autoscaling-plans',
 'backup',
 'backup-gateway',
 'backupstorage',
 'batch',
 'billingconductor',
 'braket',
 'budgets',
 'ce',
 'chime',
 'chime-sdk-identity',
 'chime-sdk-media-pipelines',
 'chime-sdk-meetings',
 'chime-sdk-messaging',
 'chime-sdk-voice',
 'cleanrooms',
 'cloud9',
 'cloudcontrol',
 'clouddirectory',
 'cloudformation',
 'cloudfront',
 'cloudhsm',
 'cloudhsmv2',
 'cloudsearch',
 'cloudsearchdomain',
 'cloudtrail',
 'cloudtrail-data',
 'cloudwatch',
 'codeartifact',
 'codebuild',
 'codecatalyst',
 'codecommit',
 'codedeploy',
 'codeguru-reviewer',
 'codeguru-security',
 'codeguruprofiler',
 'codepipeline',
 'codestar',
 'codestar-connections',
 'codestar-notifications',
 'cognito-identity',
 'cognito-idp',
 'cognito-sync',
 'comprehend',
 'comprehendmedical',
 'compute-optimizer',
 'config',
 'connect',
 'connect-contact-lens',
 'connectcampaigns',
 'connectcases',
 'connectparticipant',
 'controltower',
 'cur',
 'customer-profiles',
 'databrew',
 'dataexchange',
 'datapipeline',
 'datasync',
 'dax',
 'detective',
 'devicefarm',
 'devops-guru',
 'directconnect',
 'discovery',
 'dlm',
 'dms',
 'docdb',
 'docdb-elastic',
 'drs',
 'ds',
 'dynamodb',
 'dynamodbstreams',
 'ebs',
 'ec2',
 'ec2-instance-connect',
 'ecr',
 'ecr-public',
 'ecs',
 'efs',
 'eks',
 'elastic-inference',
 'elasticache',
 'elasticbeanstalk',
 'elastictranscoder',
 'elb',
 'elbv2',
 'emr',
 'emr-containers',
 'emr-serverless',
 'es',
 'events',
 'evidently',
 'finspace',
 'finspace-data',
 'firehose',
 'fis',
 'fms',
 'forecast',
 'forecastquery',
 'frauddetector',
 'fsx',
 'gamelift',
 'gamesparks',
 'glacier',
 'globalaccelerator',
 'glue',
 'grafana',
 'greengrass',
 'greengrassv2',
 'groundstation',
 'guardduty',
 'health',
 'healthlake',
 'honeycode',
 'iam',
 'identitystore',
 'imagebuilder',
 'importexport',
 'inspector',
 'inspector2',
 'internetmonitor',
 'iot',
 'iot-data',
 'iot-jobs-data',
 'iot-roborunner',
 'iot1click-devices',
 'iot1click-projects',
 'iotanalytics',
 'iotdeviceadvisor',
 'iotevents',
 'iotevents-data',
 'iotfleethub',
 'iotfleetwise',
 'iotsecuretunneling',
 'iotsitewise',
 'iotthingsgraph',
 'iottwinmaker',
 'iotwireless',
 'ivs',
 'ivs-realtime',
 'ivschat',
 'kafka',
 'kafkaconnect',
 'kendra',
 'kendra-ranking',
 'keyspaces',
 'kinesis',
 'kinesis-video-archived-media',
 'kinesis-video-media',
 'kinesis-video-signaling',
 'kinesis-video-webrtc-storage',
 'kinesisanalytics',
 'kinesisanalyticsv2',
 'kinesisvideo',
 'kms',
 'lakeformation',
 'lambda',
 'lex-models',
 'lex-runtime',
 'lexv2-models',
 'lexv2-runtime',
 'license-manager',
 'license-manager-linux-subscriptions',
 'license-manager-user-subscriptions',
 'lightsail',
 'location',
 'logs',
 'lookoutequipment',
 'lookoutmetrics',
 'lookoutvision',
 'm2',
 'machinelearning',
 'macie',
 'macie2',
 'managedblockchain',
 'marketplace-catalog',
 'marketplace-entitlement',
 'marketplacecommerceanalytics',
 'mediaconnect',
 'mediaconvert',
 'medialive',
 'mediapackage',
 'mediapackage-vod',
 'mediapackagev2',
 'mediastore',
 'mediastore-data',
 'mediatailor',
 'memorydb',
 'meteringmarketplace',
 'mgh',
 'mgn',
 'migration-hub-refactor-spaces',
 'migrationhub-config',
 'migrationhuborchestrator',
 'migrationhubstrategy',
 'mobile',
 'mq',
 'mturk',
 'mwaa',
 'neptune',
 'network-firewall',
 'networkmanager',
 'nimble',
 'oam',
 'omics',
 'opensearch',
 'opensearchserverless',
 'opsworks',
 'opsworkscm',
 'organizations',
 'osis',
 'outposts',
 'panorama',
 'payment-cryptography',
 'payment-cryptography-data',
 'personalize',
 'personalize-events',
 'personalize-runtime',
 'pi',
 'pinpoint',
 'pinpoint-email',
 'pinpoint-sms-voice',
 'pinpoint-sms-voice-v2',
 'pipes',
 'polly',
 'pricing',
 'privatenetworks',
 'proton',
 'qldb',
 'qldb-session',
 'quicksight',
 'ram',
 'rbin',
 'rds',
 'rds-data',
 'redshift',
 'redshift-data',
 'redshift-serverless',
 'rekognition',
 'resiliencehub',
 'resource-explorer-2',
 'resource-groups',
 'resourcegroupstaggingapi',
 'robomaker',
 'rolesanywhere',
 'route53',
 'route53-recovery-cluster',
 'route53-recovery-control-config',
 'route53-recovery-readiness',
 'route53domains',
 'route53resolver',
 'rum',
 's3',
 's3control',
 's3outposts',
 'sagemaker',
 'sagemaker-a2i-runtime',
 'sagemaker-edge',
 'sagemaker-featurestore-runtime',
 'sagemaker-geospatial',
 'sagemaker-metrics',
 'sagemaker-runtime',
 'savingsplans',
 'scheduler',
 'schemas',
 'sdb',
 'secretsmanager',
 'securityhub',
 'securitylake',
 'serverlessrepo',
 'service-quotas',
 'servicecatalog',
 'servicecatalog-appregistry',
 'servicediscovery',
 'ses',
 'sesv2',
 'shield',
 'signer',
 'simspaceweaver',
 'sms',
 'sms-voice',
 'snow-device-management',
 'snowball',
 'sns',
 'sqs',
 'ssm',
 'ssm-contacts',
 'ssm-incidents',
 'ssm-sap',
 'sso',
 'sso-admin',
 'sso-oidc',
 'stepfunctions',
 'storagegateway',
 'sts',
 'support',
 'support-app',
 'swf',
 'synthetics',
 'textract',
 'timestream-query',
 'timestream-write',
 'tnb',
 'transcribe',
 'transfer',
 'translate',
 'verifiedpermissions',
 'voice-id',
 'vpc-lattice',
 'waf',
 'waf-regional',
 'wafv2',
 'wellarchitected',
 'wisdom',
 'workdocs',
 'worklink',
 'workmail',
 'workmailmessageflow',
 'workspaces',
 'workspaces-web',
 'xray']
 ```

---

Happy learning,

[Antonio Feijao UK](https://www.antoniofeijao.com)
