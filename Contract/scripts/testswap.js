const {
    AeSdk,
    MemoryAccount,
    Node,
    CompilerHttp,
    AE_AMOUNT_FORMATS,
    generateKeyPair
  } = require('@aeternity/aepp-sdk')
const { utils } = require('@aeternity/aeproject');
const EXAMPLE_CONTRACT_SOURCE = '../contracts/NeuroDAO.aes';
const TOKEN_CONTRACT_SOURCE = '../contracts/DAOToken.aes';
const fileSystem = utils.getFilesystem(TOKEN_CONTRACT_SOURCE);
const sourceCode = utils.getContractContent(TOKEN_CONTRACT_SOURCE);
const NeuroDAOACI = require('../acis/NeuroDAO.json') 
// const fileSystemC = utils.getFilesystem(EXAMPLE_CONTRACT_SOURCE);
// const sourceCodeC = utils.getContractContent(EXAMPLE_CONTRACT_SOURCE);

//const keypair = generateKeyPair()
//console.log(`Secret key: ${keypair.secretKey}`)
//console.log(`Public key: ${keypair.publicKey}`)

// console.log(NeuroDAOACI)

const node = new Node('https://testnet.aeternity.io') // ideally host your own node
const account = new MemoryAccount('9d8a5e6046d668ba51da667f11cc391f4ced1b04b0a49ce67f23373d927242806271deff7330e7e2551ab1b82cc94b3e035641904a3e23c537bf6ed25179cd85') 
//ak_kMe9hacnc42SoHzpg5iY4YPajZ2xoJY3kfiUZr11rsqPAyKLZ

const aeSdk = new AeSdk({
  nodes: [{ name: 'testnet', instance: node }],
  accounts: [account],
  onCompiler: new CompilerHttp('https://v7.compiler.stg.aepps.com'), // ideally host your own compiler
})

const initialization = async () =>{
  try{
  contract = await aeSdk.initializeContract({ aci: NeuroDAOACI, address: 'ct_wUWT7mPnGstfrzBsAMZxUSJGtdeSFRGKKYZ1WkgwLKBjXmPZq' });
  // const a  = await contract.joinAsInputNode('ak_kMe9hacnc42SoHzpg5iY4YPajZ2xoJY3kfiUZr11rsqPAyKLZ')
  // await contract.stakeToGetDAOToken({ amount: 10**18  })
  await contract.executeProposalBuy(0)
  console.log(a)
  }catch(e){
    console.log(e)
  }

}

initialization()


