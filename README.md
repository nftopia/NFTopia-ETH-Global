## Naming convention

- Branch: kebab-case (e.g. my-branch)
- folder: kebab-case (e.g. how-it-works)
- components and views file naming: Pascal-case (e.g. Features(single word) HowItWorks(multiple words))
- general file naming: camel-case (e.g.logo.png, setupWorks.ts)
- inside of the class, variables naming should follow camel-case. (e.g myMethod)

## Coding style

- Run npm run lint before submitting your CR and use autofix(e.g. VS shift+command+p) to auto formatting your code
- For JavaScript using ES6 and don't include external libraries unless necessary
- For React please referring https://reactjs.org/docs/optimizing-performance.html#examples for performance optimization
- Comments are required for new class and important method. The example could be

1. Inline Commenting: // begin variable listing
2. Descriptive Blocks:
   /\*\*

- @desc opens a modal window to display a message
- @param string $msg - the message to be displayed
- @return bool - success or failure
  \*/

3. Class Comments:
   /\*\*

- @desc this class will hold functions for user interaction
- examples include user_pass(), user_username(), user_age(), user_regdate()
- @author Jake Rocheleau jakerocheleau@gmail.com
- @required settings.php
  \*/

## Css Style

- We are using sass our our css lib
- variables.scss : $primaryColor: #BADA55;
- @import "./variables.scss";
- h1, h2 {
  color: $primaryColor;
  }

# Steps to run

Step 1: deploy contract in local network

```shell
npx hardhat run scripts/deploy.js --network localhost
```

Step 2: In a terminal, start hardhat node

```shell
npx hardhat node
```

Step 3: Run localhost

```shell
npm run dev
```

# Figma Link

https://www.figma.com/file/JMxBzjZnU8sCLkCCZ6Nyim/NFTopia?node-id=0%3A1

# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat run scripts/deploy.js --network localhost
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
# AI Model

* AWS SageMaker Endpoint arn

  ```commandline
  arn:aws:sagemaker:us-east-1:312056483702:endpoint/pricer-img-tagger-nfthack-2022-ep
  ```
  The AI model is hosted on this endpoint from which you can make requests.

* AWS Lambda
  
  * Lambda arn  
    ```commandline
    arn:aws:lambda:us-east-1:312056483702:function:PricerModelPiFunction
    ```

  * REST API Link

    https://8ullfm1gc8.execute-api.us-east-1.amazonaws.com/default
  
    We use AWS Lambda to call the SageMaker endpoint for inference requests. 
    This is triggered with a REST API in the AWS API Gateway.
