---
title: AWS Security Hub work in Python 3 and Boto3
categories: ["AWS", "Security-Hub", "Python3", "Boto3"]
tags:       ["python", "python3", "aws", "security hub", "boto3"]
---

Just testing some commands with python3 and boto3...

## List of AWS Services from Boto3 clients

The below error message, shows very usefull information. I can see all the boto3.client's name that I can use.

Does anyone knows how to get the list without using the error?

Input

```python
import boto3

boto3.client(dir)
```

output (tweaked to show the services names in a multi line list)

```python
UnknownServiceError: Unknown service: '<built-in function dir>'.

Valid service names are:

accessanalyzer,
account,
acm,
acm-pca,
alexaforbusiness,
amp,
amplify,
amplifybackend,
amplifyuibuilder,
apigateway,
apigatewaymanagementapi,
apigatewayv2,
appconfig,
appconfigdata,
appflow,
appintegrations,
application-autoscaling,
application-insights,
applicationcostprofiler,
appmesh,
apprunner,
appstream,
appsync,
athena,
auditmanager,
autoscaling,
autoscaling-plans,
backup,
backup-gateway,
batch,
braket,
budgets,
ce,
chime,
chime-sdk-identity,
chime-sdk-meetings,
chime-sdk-messaging,
cloud9,
cloudcontrol,
clouddirectory,
cloudformation,
cloudfront,
cloudhsm,
cloudhsmv2,
cloudsearch,
cloudsearchdomain,
cloudtrail,
cloudwatch,
codeartifact,
codebuild,
codecommit,
codedeploy,
codeguru-reviewer,
codeguruprofiler,
codepipeline,
codestar,
codestar-connections,
codestar-notifications,
cognito-identity,
cognito-idp,
cognito-sync,
comprehend,
comprehendmedical,
compute-optimizer,
config,
connect,
connect-contact-lens,
connectparticipant,
cur,
customer-profiles,
databrew,
dataexchange,
datapipeline,
datasync,
dax,
detective,
devicefarm,
devops-guru,
directconnect,
discovery,
dlm,
dms,
docdb,
drs,
ds,
dynamodb,
dynamodbstreams,
ebs,
ec2,
ec2-instance-connect,
ecr,
ecr-public,
ecs,
efs,
eks,
elastic-inference,
elasticache,
elasticbeanstalk,
elastictranscoder,
elb,
elbv2,
emr,
emr-containers,
es,
events,
evidently,
finspace,
finspace-data,
firehose,
fis,
fms,
forecast,
forecastquery,
frauddetector,
fsx,
gamelift,
glacier,
globalaccelerator,
glue,
grafana,
greengrass,
greengrassv2,
groundstation,
guardduty,
health,
healthlake,
honeycode,
iam,
identitystore,
imagebuilder,
importexport,
inspector,
inspector2,
iot,
iot-data,
iot-jobs-data,
iot1click-devices,
iot1click-projects,
iotanalytics,
iotdeviceadvisor,
iotevents,
iotevents-data,
iotfleethub,
iotsecuretunneling,
iotsitewise,
iotthingsgraph,
iottwinmaker,
iotwireless,
ivs,
kafka,
kafkaconnect,
kendra,
kinesis,
kinesis-video-archived-media,
kinesis-video-media,
kinesis-video-signaling,
kinesisanalytics,
kinesisanalyticsv2,
kinesisvideo,
kms,
lakeformation,
lambda,
lex-models,
lex-runtime,
lexv2-models,
lexv2-runtime,
license-manager,
lightsail,
location,
logs,
lookoutequipment,
lookoutmetrics,
lookoutvision,
machinelearning,
macie,
macie2,
managedblockchain,
marketplace-catalog,
marketplace-entitlement,
marketplacecommerceanalytics,
mediaconnect,
mediaconvert,
medialive,
mediapackage,
mediapackage-vod,
mediastore,
mediastore-data,
mediatailor,
memorydb,
meteringmarketplace,
mgh,
mgn,
migration-hub-refactor-spaces,
migrationhub-config,
migrationhubstrategy,
mobile,
mq,
mturk,
mwaa,
neptune,
network-firewall,
networkmanager,
nimble,
opensearch,
opsworks,
opsworkscm,
organizations,
outposts,
panorama,
personalize,
personalize-events,
personalize-runtime,
pi,
pinpoint,
pinpoint-email,
pinpoint-sms-voice,
polly,
pricing,
proton,
qldb,
qldb-session,
quicksight,
ram,
rbin,
rds,
rds-data,
redshift,
redshift-data,
rekognition,
resiliencehub,
resource-groups,
resourcegroupstaggingapi,
robomaker,
route53,
route53-recovery-cluster,
route53-recovery-control-config,
route53-recovery-readiness,
route53domains,
route53resolver,
rum,
s3,
s3control,
s3outposts,
sagemaker,
sagemaker-a2i-runtime,
sagemaker-edge,
sagemaker-featurestore-runtime,
sagemaker-runtime,
savingsplans,
schemas,
sdb,
secretsmanager,
securityhub,
serverlessrepo,
service-quotas,
servicecatalog,
servicecatalog-appregistry,
servicediscovery,
ses,
sesv2,
shield,
signer,
sms,
sms-voice,
snow-device-management,
snowball,
sns,
sqs,
ssm,
ssm-contacts,
ssm-incidents,
sso,
sso-admin,
sso-oidc,
stepfunctions,
storagegateway,
sts,
support,
swf,
synthetics,
textract,
timestream-query,
timestream-write,
transcribe,
transfer,
translate,
voice-id,
waf,
waf-regional,
wafv2,
wellarchitected,
wisdom,
workdocs,
worklink,
workmail,
workmailmessageflow,
workspaces,
workspaces-web,
xray
```

A curiosity...  
I `echo`d all the aww services' names to `wc -l` to get a count of the services.

See for yourself how many `boto3.client` client has,  
which, should give us an idea of how many services AWS has.

```bash
echo "accessanalyzer, account, acm, acm-pca, alexaforbusiness, amp, amplify, amplifybackend, amplifyuibuilder, apigateway, apigatewaymanagementapi, apigatewayv2, appconfig, appconfigdata, appflow, appintegrations, application-autoscaling, application-insights, applicationcostprofiler, appmesh, apprunner, appstream, appsync, athena, auditmanager, autoscaling, autoscaling-plans, backup, backup-gateway, batch, braket, budgets, ce, chime, chime-sdk-identity, chime-sdk-meetings, chime-sdk-messaging, cloud9, cloudcontrol, clouddirectory, cloudformation, cloudfront, cloudhsm, cloudhsmv2, cloudsearch, cloudsearchdomain, cloudtrail, cloudwatch, codeartifact, codebuild, codecommit, codedeploy, codeguru-reviewer, codeguruprofiler, codepipeline, codestar, codestar-connections, codestar-notifications, cognito-identity, cognito-idp, cognito-sync, comprehend, comprehendmedical, compute-optimizer, config, connect, connect-contact-lens, connectparticipant, cur, customer-profiles, databrew, dataexchange, datapipeline, datasync, dax, detective, devicefarm, devops-guru, directconnect, discovery, dlm, dms, docdb, drs, ds, dynamodb, dynamodbstreams, ebs, ec2, ec2-instance-connect, ecr, ecr-public, ecs, efs, eks, elastic-inference, elasticache, elasticbeanstalk, elastictranscoder, elb, elbv2, emr, emr-containers, es, events, evidently, finspace, finspace-data, firehose, fis, fms, forecast, forecastquery, frauddetector, fsx, gamelift, glacier, globalaccelerator, glue, grafana, greengrass, greengrassv2, groundstation, guardduty, health, healthlake, honeycode, iam, identitystore, imagebuilder, importexport, inspector, inspector2, iot, iot-data, iot-jobs-data, iot1click-devices, iot1click-projects, iotanalytics, iotdeviceadvisor, iotevents, iotevents-data, iotfleethub, iotsecuretunneling, iotsitewise, iotthingsgraph, iottwinmaker, iotwireless, ivs, kafka, kafkaconnect, kendra, kinesis, kinesis-video-archived-media, kinesis-video-media, kinesis-video-signaling, kinesisanalytics, kinesisanalyticsv2, kinesisvideo, kms, lakeformation, lambda, lex-models, lex-runtime, lexv2-models, lexv2-runtime, license-manager, lightsail, location, logs, lookoutequipment, lookoutmetrics, lookoutvision, machinelearning, macie, macie2, managedblockchain, marketplace-catalog, marketplace-entitlement, marketplacecommerceanalytics, mediaconnect, mediaconvert, medialive, mediapackage, mediapackage-vod, mediastore, mediastore-data, mediatailor, memorydb, meteringmarketplace, mgh, mgn, migration-hub-refactor-spaces, migrationhub-config, migrationhubstrategy, mobile, mq, mturk, mwaa, neptune, network-firewall, networkmanager, nimble, opensearch, opsworks, opsworkscm, organizations, outposts, panorama, personalize, personalize-events, personalize-runtime, pi, pinpoint, pinpoint-email, pinpoint-sms-voice, polly, pricing, proton, qldb, qldb-session, quicksight, ram, rbin, rds, rds-data, redshift, redshift-data, rekognition, resiliencehub, resource-groups, resourcegroupstaggingapi, robomaker, route53, route53-recovery-cluster, route53-recovery-control-config, route53-recovery-readiness, route53domains, route53resolver, rum, s3, s3control, s3outposts, sagemaker, sagemaker-a2i-runtime, sagemaker-edge, sagemaker-featurestore-runtime, sagemaker-runtime, savingsplans, schemas, sdb, secretsmanager, securityhub, serverlessrepo, service-quotas, servicecatalog, servicecatalog-appregistry, servicediscovery, ses, sesv2, shield, signer, sms, sms-voice, snow-device-management, snowball, sns, sqs, ssm, ssm-contacts, ssm-incidents, sso, sso-admin, sso-oidc, stepfunctions, storagegateway, sts, support, swf, synthetics, textract, timestream-query, timestream-write, transcribe, transfer, translate, voice-id, waf, waf-regional, wafv2, wellarchitected, wisdom, workdocs, worklink, workmail, workmailmessageflow, workspaces, workspaces-web, xray" | tr ' ' '\n' | wc -l
299
```

```bash
(...)  | tr ' ' '\n' | wc -l
299
```

299 AWS boto3 client or 299 AWS Services? (checked on 2022-03-24)

----

## Working with aws boto3 client securityhub

Here is an example of the second service name. The number `[1]` shows a second position in the array. `[0]` if the first position, first value.

input

```python
import boto3

securityhub = boto3.client('securityhub')

securityhub.describe_products()['Products'][1]
```

output 

```yaml
{'ProductArn': 'arn:aws:securityhub:xxxxxx:xxxxxx:product/armordefense/armoranywhere',
 'ProductName': 'Armor Anywhere',
 'CompanyName': 'ARMOR',
 'Description': 'Armor Anywhere delivers managed security and compliance for AWS.',
 'Categories': ['Managed Security Service Provider (MSSP)'],
 'IntegrationTypes': ['SEND_FINDINGS_TO_SECURITY_HUB'],
 'MarketplaceUrl': 'https://aws.amazon.com/marketplace/seller-profile?id=797425f4-6823-xxxxxx',
 'ActivationUrl': 'https://amp.armor.com/account/cloud-connections',
 'ProductSubscriptionResourcePolicy': '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":"xxxxxx"},"Action":["securityhub:BatchImportFindings"],"Resource":"arn:aws:securityhub:xxxxxx:xxxxxx:product-subscription/armordefense/armoranywhere","Condition":{"StringEquals":{"securityhub:TargetAccount":"xxxxxx"}}},{"Effect":"Allow","Principal":{"AWS":"xxxxxx"},"Action":["securityhub:BatchImportFindings"],"Resource":"arn:aws:securityhub:xxxxxx:xxxxxx:product/armordefense/armoranywhere","Condition":{"StringEquals":{"securityhub:TargetAccount":"xxxxxx"}}}]}'}
```

Now, let's use a `for loop` to list through all services names.

initialising the variable `companies`

and running a for loop to add all companies into the variable `companies`

```python
companies = []

for CompanyName in securityhub.describe_products()['Products']:
    print(CompanyName['CompanyName'])
    companies.append(CompanyName['CompanyName'])

(...)
```

Then, to remove duplicate services names in the variable `companies`, we can use `dict.fromkeys` to remove duplicates.

```python
list(dict.fromkeys(companies))

['3CORESec',
 'ARMOR',
 'AWS',
 'Alert Logic',
 'Amazon',
 'Aqua Security',
 'Atlassian',
 'AttackIQ',
 'Barracuda Networks',
 'BigID',
 'Blue Hexagon',
 'Capitis',
 'Caveonix',
 'Check Point',
 'Cloud Custodian',
 'Cloud Storage Security',
 'CrowdStrike',
 'CyberArk',
 'DisruptOps, Inc.',
 'FireEye',
 'Forcepoint',
 'Fugue',
 'Guardicore',
 'HackerOne',
 'IBM']
 ```


