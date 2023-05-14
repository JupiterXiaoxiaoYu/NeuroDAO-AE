const { AeSdk, Node, MemoryAccount, CompilerHttp } = require('@aeternity/aepp-sdk');
const fs = require("fs");

const DAOToken = fs.readFileSync("../contracts/DAOToken.aes", encoding = "utf-8");
const NeuroDAO = fs.readFileSync("../contracts/NeuroDAO.aes", encoding = "utf-8")
const NeuroDAOFactory = fs.readFileSync("../contracts/NeuroDAOFactory.aes", encoding = "utf-8");
const Reputation = fs.readFileSync("../contracts/Reputation.aes", encoding = "utf-8");
const Swap = fs.readFileSync("../contracts/Swap.aes", encoding = "utf-8");

(async () => {
    const node = new Node('https://testnet.aeternity.io') // ideally host your own node

    const aeSdk = new AeSdk({
        nodes: [{ name: 'testnet', instance: node }],
        onCompiler: new CompilerHttp('https://v7.compiler.stg.aepps.com'), // ideally host your own compiler
    })
    console.log("Compiling contracts...");
    const daotoken = await aeSdk.initializeContract({ sourceCode: DAOToken });
    fs.writeFileSync('../acis/DAOToken.json', JSON.stringify(daotoken._aci));
    const neurodao = await aeSdk.initializeContract({ sourceCode: NeuroDAO });
    fs.writeFileSync('../acis/NeuroDAO.json', JSON.stringify(neurodao._aci));
    const neurodaofactory = await aeSdk.initializeContract({ sourceCode: NeuroDAOFactory });
    fs.writeFileSync('../acis/NeuroDAOFactory.json', JSON.stringify(neurodaofactory._aci));
    const reputation = await aeSdk.initializeContract({ sourceCode: Reputation });
    fs.writeFileSync('../acis/Reputation.json', JSON.stringify(reputation._aci));
    const swap = await aeSdk.initializeContract({ sourceCode: Swap });
    fs.writeFileSync('../acis/Swap.json', JSON.stringify(swap._aci));
    console.log("Contracts ACIs saved");
})();
