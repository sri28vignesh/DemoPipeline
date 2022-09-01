import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";

export class MyPipelineAppStage extends cdk.Stage {
    
    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);
  
      //const lambdaStack = new MyPipelineStack(this, 'Pipeline');      
    }
}