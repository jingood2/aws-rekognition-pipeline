const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '1.134.0',
  defaultReleaseBranch: 'main',
  name: 'aws-rekognition-pipeline',

  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-events',
    '@aws-cdk/aws-cloudformation',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-lambda-event-sources',
    '@aws-cdk/aws-sns',
    '@aws-cdk/aws-sns-subscriptions',
    '@aws-cdk/aws-sqs',
    '@aws-cdk/aws-dynamodb',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-events-targets',
    '@aws-cdk/custom-resources',
  ], /* Which AWS CDK modules (those that start with "@aws-cdk/") this app uses. */
  deps: [
    'fs',
    'path',
  ], /* Runtime dependencies of this module. */
  // description: undefined,      /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                 /* Build dependencies for this module. */
  // packageName: undefined,      /* The "name" in package.json. */
  // release: undefined,          /* Add release management to this project. */
});
project.synth();