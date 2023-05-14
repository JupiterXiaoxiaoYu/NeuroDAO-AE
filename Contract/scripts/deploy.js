const { AeSdk, Node, MemoryAccount, CompilerHttp, generateKeyPair } = require('@aeternity/aepp-sdk');
const fs = require("fs");

const DAO_TEMPLATE = fs.readFileSync("../contracts/NeuroDAOFactory.aes", encoding = "utf-8")

// const keypair = generateKeyPair()
// console.log(`Secret key: ${keypair.secretKey}`)
// console.log(`Public key: ${keypair.publicKey}`)
//for test only
const SECRET_KEY = '377c4911de2201ed5101427e8a5415213caa4dc81b5a9ac8ddcf9d17d015880840dc31129f90dcfaa4e7c936ade86cedcfd6c849152a9ebbdf27de9371ee8fef';
//ak_VZmMpkgg8EqRgVqaMtQBZ8vTFzp65QTrwCdKu2zFH3JfyrNt7
(async () => {
    const node = new Node('https://testnet.aeternity.io') // ideally host your own node
    const account = new MemoryAccount(SECRET_KEY)

    const aeSdk = new AeSdk({
        nodes: [{ name: 'testnet', instance: node }],
        accounts: [account],
        onCompiler: new CompilerHttp('https://v7.compiler.stg.aepps.com'), // ideally host your own compiler
    })
    await aeSdk.addAccount(account, { select: true });
    console.log("Compiling NeuroDAOFactory...");
    const contract = await aeSdk.initializeContract({ sourceCode: DAO_TEMPLATE });
    const aci = await contract._aci
    fs.writeFileSync('../acis/NeuroDAOFactory.json', JSON.stringify(aci));
    console.log("NeuroDAOFactory ACI saved")
    console.log("Deploying NeuroDAOFactory...")
    const neurodaofactory = await contract.$deploy([])
    console.log("NeuroDAOFactory deployed to", neurodaofactory.address)
})();
