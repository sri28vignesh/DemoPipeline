#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkPracticeStack } from '../lib/aws_cdk_practice-stack';
import { CdkStarterStack } from '../lib/cdk_starter_stack';
import { CdkApigwWafStack } from '../lib/cdk_apigw_waf_stack';
import { CdkCdftWafStack } from "../lib/cdk_cdft_waf_stack";
import { MyPipelineStack } from "../lib/cdk_cicd_stack";

const app = new cdk.App();
// new AwsCdkPracticeStack(app, 'AwsCdkPracticeStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });


new CdkStarterStack(app, 'CdkStarterStack', {
  env: {region: "us-east-1"}, 
});

new CdkApigwWafStack(app, 'CdkApigwWafStack', {
  env: {region: "us-east-1"},
});

new CdkCdftWafStack(app, 'CdkCdftWafStack', {
  env: {account: '853973692277', region: "us-east-1"},
});

new MyPipelineStack(app, 'MyPipelineStack', {
  env: {
    account: '853973692277',
    region: 'eu-west-1',
  }
});