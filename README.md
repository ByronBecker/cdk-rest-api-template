# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Getting Set up and deploying your first app 

1. Set up your AWS account CLI credentials
2. Install dependencies and build your handlers & stack `npm run setup`
3. If you haven't bootstrapped your AWS environment for the AWS CDK, run `npx cdk bootstrap`
4. Deploy the stack `npm run deploy`

## Useful commands

* `npm run setup`   installs and builds your app locally
* `npm run build`   builds your lambda handlers and stacks
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npm run ci:test` runs ci (installing, building, and testing)
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
