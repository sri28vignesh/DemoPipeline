import * as cdk from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from "aws-cdk-lib/aws-lambda";
import { ApiGatewayToLambda } from '@aws-solutions-constructs/aws-apigateway-lambda';
import { WafwebaclToApiGatewayProps, WafwebaclToApiGateway } from "@aws-solutions-constructs/aws-wafwebacl-apigateway";

export class CdkApigwWafStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
    
    // Construct a Lambda fn and API Gateway
    const apiGatewayToLambda = new ApiGatewayToLambda(this, 'Sri-ApiGatewayToLambdaPattern', {
    lambdaFunctionProps: {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'index.handler',
        functionName: 'sri_lambda_test_cdk',
        code: lambda.Code.fromAsset(`lambda`)
    }
    });

    // This construct can only be attached to a configured API Gateway.
    // Deploy a WAF web ACL with 7 AWS managed rule groups.
    new WafwebaclToApiGateway(this, 'sri-test-wafwebacl-apigateway', {
        existingApiGatewayInterface: apiGatewayToLambda.apiGateway,
        // webaclProps: 'Optional user-provided props to override the default props for the AWS WAF web ACL'
    });

    

    }
}
