import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as path from 'path';

export class HelloWorldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The path to the lambda asset
    // TODO: add build parameters w/esbuild for the lambda
    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_nodejs-readme.html#configuring-esbuild
    const lambdaFilePath = path.join(__dirname, '../../dist/hello-world/src');

    // Defines an AWS Lambda Function resource
    const helloWorld = new Function(this, "helloWorldLambda", {
      functionName: "HelloWorld",
      description: "Hello World Lambda",
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(lambdaFilePath),
      // The lambda handler
      // This sits at <filename>.<functionName> at the provided <filePath> that was provided to the "code" property
      handler: "index.handler",
      timeout: cdk.Duration.seconds(20),
      memorySize: 256,
      // Send uncaught exceptions (500s) to the dead letter queue
      deadLetterQueueEnabled: true,
    });

    const restApi = new RestApi(this, 'hello-world-api');
    restApi.root.addMethod('GET', new LambdaIntegration(helloWorld));
  }
}
