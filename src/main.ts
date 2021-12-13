import { App, Construct, Stack, StackProps } from '@aws-cdk/core';
import { CdkRekognitionPipelineStack } from './lib/cdk-rekognition-pipeline';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // define resources here...
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new CdkRekognitionPipelineStack(app, 'CdkRekognition', { env: devEnv });
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();