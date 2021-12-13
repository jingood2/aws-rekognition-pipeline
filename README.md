# AWS CDK Rekognition Pipeline

## Overview
AWS의 이미지 및 비디오 분석 AI/ML 서비스인 AWS Rekognition 서비스를 이용하여 Face and Text Detect, Labeling, Adult Content 등의 기능을 제공하는 
Serverless 기반 아키텍처를 CDK로 구현합니다
## Architecture
![Rekognition Pipeline](/images/aws-rekognition-pipeline.drawio.png)

## Prerequisites
- Node.js
- AWS CLI

## Setup
- Download this repo on your local machine
- Install AWS Cloud Development Kit (CDK): npm install -g aws-cdk
- Install Projen : npm install -g projen
- Go to folder cdk-s3-batch-perations and run: npx projen build
```
npx projen build
```

## Deployment
- configure AWS Credentials or AWS_PROFILE env
- Run "cdk bootstrap"
- Run "npx projen deploy" to deploy stack
```
cdk bootstrap
npx projen deploy
```

## How to use

### 1. Content Upload

1. Single File
- 스택에서 생성한 Amazon S3 버킷 "CdkRekognition-contentbucketxxxx"로 이동하여에celerrities, faces, labels, moderation, text 등 호출을 원하는 API prefix에 파일을 업로드합니다.


2. Multiple Files Batch Processing
- 스택에서 생성한 Amazon S3 버킷 "CdkRekognition-existingcontentbucketxxxx"로 이동하여 celerrities, faces, labels, moderation, text 등 호출을 원하는 API prefix에 몇 개의 파일을 업로드합니다.
- Amazon S3 버킷 "CdkRekognition-inventoryandlogsxxxxx"로 이동하고 방금 업로드한 항목 이름 목록이 포함된 csv 파일을 버킷 "CdkRekognition-existingcontentbucketxxxx"에 업로드합니다. CSV 파일에는 두 개의 열 bucketName, objectName이 있어야 합니다.
- AWS 콘솔에서 S3로 이동하여 배치 작업을 클릭합니다.
- 작업 생성을 클릭하고 CSV 또는 S3 인벤토리 보고서를 선택한 후 다음을 클릭합니다.
- 작업 선택에서 AWS Lambda 함수 호출을 선택합니다.
- AWS Lambda 함수 호출: "CdkRekognition-S3BatchProcessorxxxx"를 선택하고 다음을 클릭합니다.
- 완료 보고서 대상 경로에서 Amazon S3 버킷 "CdkRekognition-inventoryandlogsxxxxx"를 찾아 선택합니다.
- 권한: IAM 역할에서 "CdkRekognition-S3BatchOperationRolexxxx"를 선택하고 다음을 클릭합니다.
- 검토하고 작업 만들기를 클릭합니다.
- Amazon S3 배치 작업 페이지에서 방금 생성한 작업에 대한 작업 ID 링크를 클릭합니다.
- "확인 및 실행"을 클릭한 다음 "작업 실행"을 클릭합니다.
- S3 일괄 작업 페이지에서 새로 고침을 클릭하여 작업 상태를 확인합니다.
- S3 버킷 "CdkRekognition-inventoryandlogsxxxxx"로 이동하면 목록의 항목에 대해 생성된 출력이 표시되어야 합니다.


### 2. Output
- CloudWatch Logs Group에서 Rekognition 서비스에 API 호출 결과를 확인합니다. 
- jpg, png 등의 이미지는 /aws/lambda/CdkRekognition-SyncProcessorXXXXX 에, mp4, mov 등의 동영상은 /aws/lambda/CdkRekognition-JobResultProcessorXXXXX 에 API 호출 성공 여부를 확인 할 수 있습니다. 
![JobResultProcessor](/images/jobresultprocessor.png)

- cdkrekognition-outputxxxx 버킷으로 이동하여 json 포맷으로 저장된 결과를 확인합니다. 해당 결과는 아래와 같습니다. 
```
[{"JobStatus": "SUCCEEDED", "VideoMetadata": {"Codec": "h264", "DurationMillis": 21680, "Format": "QuickTime / MOV", "FrameRate": 25.0, "FrameHeight": 540, "FrameWidth": 960, "ColorRange": "LIMITED"}, "ModerationLabels": [{"Timestamp": 0, "ModerationLabel": {"Confidence": 92.465576171875, "Name": "Female Swimwear Or Underwear", "ParentName": "Suggestive"}}, {"Timestamp": 0, "ModerationLabel": {"Confidence": 92.465576171875, "Name": "Suggestive", "ParentName": ""}}, {"Timestamp": 480, "ModerationLabel": {"Confidence": 93.77776336669922, "Name": "Female Swimwear Or Underwear", "ParentName": "Suggestive"}}, {"Timestamp": 480, "ModerationLabel": {"Confidence": 93.77776336669922, "Name": "Suggestive", "ParentName": ""}}, {"Timestamp": 1000, "ModerationLabel": {"Confidence": 93.06536865234375, "Name": "Female Swimwear Or Underwear", "ParentName": "Suggestive"}}, 
...
...
}}]
```

## Clean Up
Run "npx projen destroy" to destroy stack

```
npx projen destroy
```

## Cost
이 솔루션은 SQS, Lambda, SNS, DynamoDB, Rekognition 등의 다양한 AWS 서비스를 사용합니다. 
하지만 AI/ML 서비스인 Rekognition이 비용의 가장 큰 부분을 차지합니다. 
![imagecost](/images/imagecost.png)
![videocost](/images/videocost.png)
