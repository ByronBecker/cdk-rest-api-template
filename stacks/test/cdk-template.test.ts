// import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as CdkTemplate from '../src/cdk-template-stack';
import { Capture, Match, Template } from 'aws-cdk-lib/assertions';
import { readFileSync } from 'fs';
import { resolve } from "path";

// example test. To run these tests, uncomment this file along with the
// example resource in lib/cdk-template-stack.ts

describe("HellWorldStack", () => {
  const templateFilePath = resolve(__dirname, "../../", "cdk.out/HelloWorldStack.template.json");
  const templateFile = readFileSync(templateFilePath, "utf-8");
  const template = Template.fromString(templateFile);

  describe("the HelloWorld Lambda Function", () => {
    test("has the appropriate function properties", () => {
      template.hasResourceProperties("AWS::Lambda::Function", {
        FunctionName: "HelloWorld",
        Description: "Hello World Lambda",
        Runtime: "nodejs18.x",
        MemorySize: 256,
        timeout: 20,
      });
    });
    test("has a dead letter queue", () => {
      template.hasResourceProperties("AWS::Lambda::Function", {
        DeadLetterConfig: {
          TargetArn: {
            "Fn::GetAtt": [
              Match.stringLikeRegexp("DeadLetterQueue*"),
              "Arn",
            ],
          },
        },
      });
    });
  });

  describe("the HelloWorld API", () => {
    test("has the expected name", () => {
      template.hasResourceProperties("AWS::ApiGateway::RestApi", {
        Name: "hello-world-api",
      });
    });
    test("has a GET method integrated with the HelloWorld Lambda Function via Lambda proxy", () => {
      template.hasResourceProperties("AWS::ApiGateway::Method", {
        HttpMethod: "GET",
        ResourceId: {
          "Fn::GetAtt": [
            Match.stringLikeRegexp("hello-world-api*"),
            "RootResourceId"
          ]
        },
        RestApiId: {
          Ref: Match.stringLikeRegexp("hello-world-api*"),
        },
        Integration: {
          IntegrationHttpMethod: "POST",
          Type: "AWS_PROXY",
          Uri: {
            "Fn::Join": [
              "",
              Match.arrayWith([
                {
                  "Fn::GetAtt": [
                    Match.stringLikeRegexp("helloWorldLambda*"),
                    "Arn"
                  ]
                },
              ])
            ]
          },
        },
      });
    })
  });
})
