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
