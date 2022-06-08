// lib/pipeline.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';

export default class PipelineConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps){
    super(scope,id)

    const account = props?.env?.account!;
    const region = props?.env?.region!;

    const blueprint = blueprints.EksBlueprint.builder()
    .account(account)
    .region(region)
    .addOns()
    .teams();
  
    blueprints.CodePipelineStack.builder()
      .name("eks-blueprints-workshop-pipeline")
      .owner("doanthanhphong")
      .repository({
          repoUrl: 'my-eks-blueprints',
          credentialsSecretName: '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',
          targetRevision: 'main'
      })

      .build(scope, id+'-stack');
  }
}
