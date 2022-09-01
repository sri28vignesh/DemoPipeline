import * as cdk from 'aws-cdk-lib';
import { CloudFrontToS3 } from '@aws-solutions-constructs/aws-cloudfront-s3';
import { WafwebaclToCloudFront } from "@aws-solutions-constructs/aws-wafwebacl-cloudfront";
import * as s3 from 'aws-cdk-lib/aws-s3';


export class CdkCdftWafStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      const cdf_bucket = new s3.Bucket(this, 'srivignesh-cft-bucket', {
        versioned: true
      });

      const cloudfrontToS3 = new CloudFrontToS3(this, 'srivignesh-test-cloudfront-s3', {
      logS3AccessLogs: true,
      cloudFrontDistributionProps:{
        minimumProtocolVersion: cdk.aws_cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      },


    },   );

    // This construct can only be attached to a configured CloudFront.
    new WafwebaclToCloudFront(this, 'srivignesh-test-wafwebacl-cloudfront', {
        existingCloudFrontWebDistribution: cloudfrontToS3.cloudFrontWebDistribution
    });

    //console.log("------- Cloudfront Dist Logs: ---------", cloudfrontToS3.cloudFrontWebDistribution);

    }
}