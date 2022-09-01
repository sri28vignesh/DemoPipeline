import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codecommit from "aws-cdk-lib/aws-codecommit";
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Stage } from 'aws-cdk-lib';
import {MyPipelineAppStage} from './cdk_pipeline_stage'
import { Repository } from 'aws-cdk-lib/aws-ecr';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repo = codecommit.Repository.fromRepositoryArn(this, "sri-test-repo", "arn:aws:codecommit:us-east-1:123456789012:MyDemoRepo" );


    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('OWNER/REPO', 'main'),
        // input: CodePipelineSource.codeCommit(),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })

    });

    // This is where we add the application stages
    const stage = new MyPipelineAppStage(this, 'PreBuild', {
      env: { account: '853973692277', region: 'us-east-1' }
    });

    pipeline.addStage(stage, 
      {
          post: [
            new ShellStep('install checkov',{
              commands: [
                'echo "Hello world" ',
                'yum install httpd'
            
            ]
            }),
          ],

      });

  }
}