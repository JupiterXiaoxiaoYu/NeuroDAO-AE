const { AeSdk, Node, MemoryAccount, CompilerHttp } = require('@aeternity/aepp-sdk');
const fs = require("fs");

const { utils } = require('@aeternity/aeproject');




    // const DAOToken = fs.readFileSync("../contracts/DAOToken.aes", encoding = "utf-8");
    // const NeuroDAO = fs.readFileSync("../contracts/NeuroDAO.aes", encoding = "utf-8")
    // const NeuroDAOFactory = fs.readFileSync("../contracts/NeuroDAOFactory.aes", encoding = "utf-8");
    // const Reputation = fs.readFileSync("../contracts/Reputation.aes", encoding = "utf-8");
    // const Swap = fs.readFileSync("../contracts/Swap.aes", encoding = "utf-8");

    (async () => {
        const file_name = ["DAOToken", "NeuroDAO", "NeuroDAOFactory", "Reputation", "Swap"]
        const node = new Node('https://testnet.aeternity.io') // ideally host your own node

        const aeSdk = new AeSdk({
            nodes: [{ name: 'testnet', instance: node }],
            onCompiler: new CompilerHttp('https://v7.compiler.stg.aepps.com'), // ideally host your own compiler
        })
        console.log("Compiling contracts...");
        for (let i = 0; i < file_name.length; i++) {
            let file = file_name[i]
            fileSystem = utils.getFilesystem(`../contracts/${file}.aes`)
            sourceCode = utils.getContractContent(`../contracts/${file}.aes`)
            const contract = await aeSdk.initializeContract({ sourceCode, fileSystem });
            fs.writeFileSync(`../acis/${file}.json`, JSON.stringify(contract._aci));
        }
    })();
