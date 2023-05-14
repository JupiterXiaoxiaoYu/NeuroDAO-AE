const { assert, expect } = require('chai');
const { utils } = require('@aeternity/aeproject');

const EXAMPLE_CONTRACT_SOURCE = './contracts/NeuroDAOFactory.aes';

describe('ExampleContract', () => {
  let aeSdk;
  let contract;

  before(async () => {
    aeSdk = await utils.getSdk();

    // a filesystem object must be passed to the compiler if the contract uses custom includes
    const fileSystem = utils.getFilesystem(EXAMPLE_CONTRACT_SOURCE);

    // get content of contract
    const sourceCode = utils.getContractContent(EXAMPLE_CONTRACT_SOURCE);

    // initialize the contract instance
    contract = await aeSdk.initializeContract({ sourceCode, fileSystem });
    const ct = await contract.init();
    contractAddress = ct.address.replace('ct_', 'ak_')
    

    // create a snapshot of the blockchain state
    await utils.createSnapshot(aeSdk);
  });

  // after each test roll back to initial state
  afterEach(async () => {
    // await utils.rollbackSnapshot(aeSdk);
  });

  it('Create DAO Contract and view it', async () => {
    const set = await contract.getAlldaoData({ onAccount: utils.getDefaultAccounts()[0] });
    console.log(set.decodedResult)
    // const addr = await contract.getTemplateDAOTokenAddress({ onAccount: utils.getDefaultAccounts()[0] });
    daoAddressResult = await contract.createDAOContract('name', 'des', 'tok', 'tok', contractAddress, 3, 3, 3, 3, true, { onAccount: utils.getDefaultAccounts()[0]});
    console.log(daoAddressResult.decodedResult)
    daoInfo = await contract.getdaoData(daoAddressResult.decodedResult, { onAccount: utils.getDefaultAccounts()[0] });
    console.log(daoInfo.decodedResult)
  });

  it('Get DAOFactory Data', async () => {
    const repu = await contract.getReputationContractAddress({ onAccount: utils.getDefaultAccounts()[0] });
    console.log(repu.decodedResult)
    const swap = await contract.getInvestmentSwapServiceAddress({ onAccount: utils.getDefaultAccounts()[0] });
    console.log(swap.decodedResult)
    const num = await contract.getNumberOfDAOs({ onAccount: utils.getDefaultAccounts()[0] });
    console.log(num.decodedResult)
    // const addr = await contract.getTemplateDAOTokenAddress({ onAccount: utils.getDefaultAccounts()[0] });
    // const daoAddressResult = await contract.createDAOContract('name', 'des', 'tok', 'tok', contractAddress, 3, 3, 3, 3, true, { onAccount: utils.getDefaultAccounts()[0]});
    // console.log(daoAddressResult.decodedResult)
  });

  it('Create another contract an lookup all data', async () => {
    const allDAO = await contract.getAlldaoData({ onAccount: utils.getDefaultAccounts()[0] });
    console.log(allDAO.decodedResult.length)
    expect(allDAO.decodedResult.length).to.equal(1)
    // const addr = await contract.getTemplateDAOTokenAddress({ onAccount: utils.getDefaultAccounts()[0] });
    daoAddressResult = await contract.createDAOContract('name1', 'des1', 'tok1', 'tok1', contractAddress, 3, 3, 3, 3, true, { onAccount: utils.getDefaultAccounts()[0]});

    daoInfo = await contract.getAlldaoData({ onAccount: utils.getDefaultAccounts()[0] });
    console.log(daoInfo.decodedResult)
    expect(daoInfo.decodedResult.length).to.equal(2)
  });

});
