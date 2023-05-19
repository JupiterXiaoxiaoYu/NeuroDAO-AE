const { assert, expect } = require('chai');
const { utils } = require('@aeternity/aeproject');

const EXAMPLE_CONTRACT_SOURCE = './contracts/NeuroDAO.aes';
const TOKEN_CONTRACT_SOURCE = './contracts/DAOToken.aes';
const fileSystem = utils.getFilesystem(TOKEN_CONTRACT_SOURCE);
const sourceCode = utils.getContractContent(TOKEN_CONTRACT_SOURCE);
const fileSystemC = utils.getFilesystem(EXAMPLE_CONTRACT_SOURCE);
const sourceCodeC = utils.getContractContent(EXAMPLE_CONTRACT_SOURCE);
// const httpCompiler = new CompilerHttp('https://v7.compiler.stg.aepps.com')

describe('userFlowTest', () => {
  let aeSdk;
  let contract;

  before(async () => {
    aeSdk = await utils.getSdk();

    // a filesystem object must be passed to the compiler if the contract uses custom includes
    // initialize the contract instance ct_22TA8GeeC7oe3CkPsaGkEMwpFgMXLzGX8rT6wQkbtGCXTTkJu2
    const template_token_contract = await aeSdk.initializeContract({ sourceCode: sourceCode, fileSystem: fileSystem });

    const token = await template_token_contract.init('name', 0, 'description', 0)

    const tokenAddress = token.address.replace('ct_', 'ak_')
    console.log('-====', tokenAddress)


    contract = await aeSdk.initializeContract({ sourceCode: sourceCodeC, fileSystem: fileSystemC });
    // get content of contract

    const tx = await contract.$deploy(["aeDAO", "aeDAO", "aeD", "aeD", 0, tokenAddress, 3, 2, 3, 3, false, tokenAddress, tokenAddress])

    // console.log('DAO Token Address here',address)

    // const aci = await AESDK.compilerApi.generateACI({code: TOKEN_CONTRACT_SOURCE });


    // await contract.init();
    console.log * ('====', tx)
    // create a snapshot of the blockchain state
    await utils.createSnapshot(aeSdk);

  });
  // console.log(utils.getDefaultAccounts()[0])
  // after each test roll back to initial state
  afterEach(async () => {
    // await utils.rollbackSnapshot(aeSdk);
  });

  it('Join DAO as Input Nodes', async () => {
    const result = await contract.isMember(utils.getDefaultAccounts()[0].address);
    expect(result.decodedResult).to.equal(false);
    await contract.joinAsInputNode(utils.getDefaultAccounts()[0].address, { onAccount: utils.getDefaultAccounts()[0] });
    const result1 = await contract.isMember(utils.getDefaultAccounts()[0].address);
    expect(result1.decodedResult).to.equal(true);
  });

  it('Join DAO as Input Again - Same person', async () => {
    try {
      const result = await contract.joinAsInputNode(utils.getDefaultAccounts()[0].address, { onAccount: utils.getDefaultAccounts()[0] });
    } catch (e) {
      expect(e.toString()).to.equal('NodeInvocationError: Invocation failed: "AlreadyInputNode"')
    }
  });

  it('Join DAO as Input Again - Another person', async () => {

    const result = await contract.joinAsInputNode(utils.getDefaultAccounts()[4].address, { onAccount: utils.getDefaultAccounts()[4] });
    expect(result.decodedResult).to.equal(true)
  });

  it('Join DAO as Input Again - No spare positions', async () => {
    try {
      const result = await contract.joinAsInputNode(utils.getDefaultAccounts()[1].address, { onAccount: utils.getDefaultAccounts()[1] });
    } catch (e) {
      expect(e.toString()).to.equal('NodeInvocationError: Invocation failed: "NoSpareInputNode"')
    }
  });

  it('Join DAO as Hidden Nodes when already became a input node - Multiply Roles set to false', async () => {
    try {
      const result = await contract.joinAsHiddenNode(utils.getDefaultAccounts()[0].address, { onAccount: utils.getDefaultAccounts()[0] });
    } catch (e) {
      expect(e.toString()).to.equal('NodeInvocationError: Invocation failed: "NoResponsibilityOverlap"')
    }
  });


  it('Join DAO as Hidden Nodes', async () => {
    const result = await contract.isMember(utils.getDefaultAccounts()[1].address);
    expect(result.decodedResult).to.equal(false);
    await contract.joinAsHiddenNode(utils.getDefaultAccounts()[1].address, { onAccount: utils.getDefaultAccounts()[1] });
    const result1 = await contract.isMember(utils.getDefaultAccounts()[1].address);
    expect(result1.decodedResult).to.equal(true);
  });

  it('Join DAO as Output Nodes', async () => {
    const result = await contract.isMember(utils.getDefaultAccounts()[2].address);
    expect(result.decodedResult).to.equal(false);
    await contract.joinAsOutputNode(utils.getDefaultAccounts()[2].address, { onAccount: utils.getDefaultAccounts()[2] });
    const result1 = await contract.isMember(utils.getDefaultAccounts()[2].address);
    expect(result1.decodedResult).to.equal(true);
  });

  it('Join DAO as LP Nodes', async () => {
    const result = await contract.isMember(utils.getDefaultAccounts()[3].address);
    expect(result.decodedResult).to.equal(false);
    await contract.joinAsLpNode(utils.getDefaultAccounts()[3].address, { onAccount: utils.getDefaultAccounts()[3] });
    const result1 = await contract.isMember(utils.getDefaultAccounts()[3].address);
    expect(result1.decodedResult).to.equal(true);
  });


  it('Stake AE to get DAO token', async () => {

    const result1 = await contract.isMember(utils.getDefaultAccounts()[0].address);
    expect(result1.decodedResult).to.equal(true);

    const balanceBefore = await aeSdk.getBalance(utils.getDefaultAccounts()[0].address)
    const tokenBalanceBefore = await contract.getDAOTokenBalance(utils.getDefaultAccounts()[0].address)

    await contract.stakeToGetDAOToken({ onAccount: utils.getDefaultAccounts()[0], amount: 100 })

    const balanceAfter = await aeSdk.getBalance(utils.getDefaultAccounts()[0].address)
    assert(balanceBefore > balanceAfter + 100)

    // console.log(token_contract)

    const tokenBalanceAfter = await contract.getDAOTokenBalance(utils.getDefaultAccounts()[0].address)
    // console.log("balance Here",tokenBalanceBefore, tokenBalanceAfter)
    expect(tokenBalanceAfter.decodedResult).to.equal(tokenBalanceBefore.decodedResult + 10000n)

  });

  it('Burn Token to get AE back', async () => {
    const tokenBalanceBefore = await contract.getDAOTokenBalance(utils.getDefaultAccounts()[0].address)
    await contract.burnToGetBackFund(10)
    // console.log(token_contract)
    const tokenBalanceAfter = await contract.getDAOTokenBalance(utils.getDefaultAccounts()[0].address)
    expect(tokenBalanceAfter.decodedResult).to.equal(tokenBalanceBefore.decodedResult - 1000n)
  });

  it('Create Proposal 0 1 2', async () => {
    const balanceOfDAOTokenBefore = await contract.getDAOTokenBalance(utils.getDefaultAccounts()[0].address)
    const proposal0 = await contract.createProposal("Proposal 0", "Proposal 0", "ak_JDp175ruWd7mQggeHewSLS1PFXt9AzThCDaFedxon8mF8xTRF", 100, 100, 3, 10, { onAccount: utils.getDefaultAccounts()[0] })
    expect(proposal0.decodedResult).to.equal(0n);
    const proposal1 = await contract.createProposal("Proposal 1", "Proposal 1", "ak_JDp175ruWd7mQggeHewSLS1PFXt9AzThCDaFedxon8mF8xTRF", 100, 100, 2, 10, { onAccount: utils.getDefaultAccounts()[0] })
    expect(proposal1.decodedResult).to.equal(1n);
    const proposal2 = await contract.createProposal("Proposal 2", "Proposal 2", "ak_JDp175ruWd7mQggeHewSLS1PFXt9AzThCDaFedxon8mF8xTRF", 100, 100, 1, 10, { onAccount: utils.getDefaultAccounts()[0] })
    expect(proposal2.decodedResult).to.equal(2n);
    const balanceOfDAOTokenAfter = await contract.getDAOTokenBalance(utils.getDefaultAccounts()[0].address)
    expect(balanceOfDAOTokenAfter.decodedResult).to.equal(balanceOfDAOTokenBefore.decodedResult - 30n)
  });

  it('Vote on Creating Proposal 0', async () => {
    // const voteOptionType = {
    //   Agree: {}
    // };
    const balanceBefore = await aeSdk.getBalance(utils.getDefaultAccounts()[4].address)
    const tokenBalanceBefore = await contract.getDAOTokenBalance(utils.getDefaultAccounts()[4].address)

    await contract.stakeToGetDAOToken({ onAccount: utils.getDefaultAccounts()[4], amount: 100 })

    const balanceAfter = await aeSdk.getBalance(utils.getDefaultAccounts()[4].address)
    assert(balanceBefore > balanceAfter + 100)
    // const calldata = await httpCompiler.api.encodeCalldata({arguments:["0", "Agree", "10", "\"I Agree with this and the info provided is correct\""], source:sourceCodeC, function:"voteOnCreatingProposal"})
    // const encodedParameter = aeSdk.encode(voteOptionType, "voteOption")
    // time = await contract.getTimeStamp()
    // console.log(time.encodedResult)
    // const contract = await aeSdk.initializeContract({ sourceCode: sourceCodeC,fileSystem:fileSystemC });
    const voteOption = { Agree: [] };
    // const calldata = contract._calldata.encode(voteOption)
    const balanceOfDAOTokenBefore = await contract.getDAOTokenBalance(utils.getDefaultAccounts()[4].address)
    await contract.voteOnCreatingProposal(0, voteOption, 10, "I Agree with this and the info provided is correct", { onAccount: utils.getDefaultAccounts()[4] })
    const balanceOfDAOTokenAfter = await contract.getDAOTokenBalance(utils.getDefaultAccounts()[4].address)
    expect(balanceOfDAOTokenBefore.decodedResult).to.equal(balanceOfDAOTokenAfter.decodedResult + 10n)
    // expect(vote.decodedResult).to.equal(1n);
    // stage = await contract.getCurrentStage(0)
    // console.log(stage.decodedResult)
    // time = await contract.getTimeStamp()
    // console.log(time.encodedResult)
  })


  it('Vote with Analyzing Proposal 2', async () => {
    await contract.stakeToGetDAOToken({ onAccount: utils.getDefaultAccounts()[1], amount: 100 })
    const voteOption = { Agree: [] };
    // stage = await contract.getCurrentStage(0)
    // console.log(stage.decodedResult)
    // await utils.awaitKeyBlocks(aeSdk, 10)
    await contract.voteOnAnalyzeProposal(2n, voteOption, 10, "I Agree with this and the info provided is correct", { onAccount: utils.getDefaultAccounts()[1] })
    // stage = await contract.getCurrentStage(0)
    // console.log(stage.decodedResult)
  })

  it('Fund Proposal to Propsoal 1', async () => {
    const success = await contract.addFundsToProposal(1n, { onAccount: utils.getDefaultAccounts()[3], amount: 100 })
    // console.log(success.decodedResult)
    const propsoal = await contract.getProposalByIndex(1n)
    // console.log(propsoal.decodedResult.lpFunds)
    expect(propsoal.decodedResult.lpFunds.get(utils.getDefaultAccounts()[3].address)).to.equal(100n)
    expect(propsoal.decodedResult.totalFunds).to.equal(100n)
    // stage = await contract.getCurrentStage(0)
    // console.log(stage.decodedResult)
  })

  it('Vote with Deciding Proposal 2', async () => {
    const voteOption = { Agree: [] };
    await contract.stakeToGetDAOToken({ onAccount: utils.getDefaultAccounts()[2], amount: 100 })
    await contract.voteOnDecideProposal(2n, voteOption, 10, { onAccount: utils.getDefaultAccounts()[2] })
    // stage = await contract.getCurrentStage(0)
    // console.log(stage.decodedResult)
  })

  it('Fund Proposal to Propsoal 1', async () => {
    const success = await contract.addFundsToProposal(1n, { onAccount: utils.getDefaultAccounts()[3], amount: 100 })
    // console.log(success.decodedResult)
    const propsoal = await contract.getProposalByIndex(1n)
    // console.log(propsoal.decodedResult.lpFunds)
    expect(propsoal.decodedResult.lpFunds.get(utils.getDefaultAccounts()[3].address)).to.equal(200n)
    expect(propsoal.decodedResult.totalFunds).to.equal(200n)
    stage = await contract.getCurrentStage(0)
    console.log(stage.decodedResult)
  })

  it('Execute Buy proposal 2', async () => {
    const propsoal = await contract.getProposalByIndex(2n)
    console.log(propsoal.decodedResult.stage)
    // Cannot testing due to call of Superswap cannot be performed in local
    // await contract.excuteProposalBuy(1, { onAccount: utils.getDefaultAccounts()[0] })
  })

  it('Execute Sell proposal 2', async () => {
    // stage = await contract.getCurrentStage(0)
    // console.log(stage.decodedResult)
    // Cannot testing due to call of Superswap cannot be performed in local
    // await contract.excuteProposalSell(1, { onAccount: utils.getDefaultAccounts()[0] })
  })

  it('Vote Aginst proposal 1', async () => {
    const voteOption = { Against: [] };
    await contract.stakeToGetDAOToken({ onAccount: utils.getDefaultAccounts()[2], amount: 100 })
    await contract.voteOnDecideProposal(1n, voteOption, 30, { onAccount: utils.getDefaultAccounts()[2] })
    // Cannot testing due to call of Superswap cannot be performed in local
    // await contract.excuteProposalWithdraw(1, { onAccount: utils.getDefaultAccounts()[0] })
  })

  it('Another person join DAO and Fund Propsoal 1', async () => {
    await contract.joinAsLpNode(utils.getDefaultAccounts()[4].address, { onAccount: utils.getDefaultAccounts()[4] });
    await contract.stakeToGetDAOToken({ onAccount: utils.getDefaultAccounts()[4], amount: 100 })
    await contract.addFundsToProposal(1n, { onAccount: utils.getDefaultAccounts()[4], amount: 100 })
    // console.log(success.decodedResult)
    const propsoal = await contract.getProposalByIndex(1n)
    // console.log(propsoal.decodedResult.lpFunds)
    expect(propsoal.decodedResult.lpFunds.get(utils.getDefaultAccounts()[4].address)).to.equal(100n)
    expect(propsoal.decodedResult.totalFunds).to.equal(300n)
    stage = await contract.getCurrentStage(1n)
  })

  it('Reject proposal 1', async () => {
    const vote = await contract.checkBeforeExecuteBuy(1n)
    expect(vote.decodedResult).to.equal(false)
    const propsoal = await contract.getCurrentStage(1n)
    console.log(propsoal.decodedResult)
  })

  it('Refund input voters of proposal 1', async () => {
    const proposal = await contract.getProposalByIndex(1n)
    const totalDeposit = proposal.decodedResult.totalDeposit
    const RemainingDeposit = await contract.refundInputVoters(1n, { onAccount: utils.getDefaultAccounts()[0] })
    console.log(totalDeposit)
    console.log(RemainingDeposit.decodedResult)
    // assert(totalFunds.decodedResult > RemainingFunds.decodedResult)
  })

  it('Refund hidden voters of proposal 1', async () => {
    // const proposal = await contract.getProposalByIndex(1n)
    // totalDeposit1 = proposal.decodedResult.totalDeposit
    const res = await contract.refundHiddenVoters(1n, { onAccount: utils.getDefaultAccounts()[0] })
    // console.log(res.decodedResult, totalDeposit)
    // expect(res.decodedResult).to.equal(totalDeposit1)
    // assert(totalFunds.decodedResult > RemainingFunds.decodedResult)
  })

  it('Refund output voters of proposal 1', async () => {
    // const proposal = await contract.getProposalByIndex(1n)
    // totalDeposit2 = proposal.decodedResult.totalDeposit
    // console.log(totalDeposit2,totalDeposit1)
    await contract.refundOutputVoters(1n, { onAccount: utils.getDefaultAccounts()[0] })
    // console.log(totalDeposit)
    // console.log(RemainingDeposit.decodedResult)
    // assert(totalFunds.decodedResult > RemainingFunds.decodedResult)
  })

  it('Refund lp voters of proposal 1', async () => {
    // const proposal = await contract.getProposalByIndex(1n)
    // proposal.decodedResult.totalFunds
    await contract.refundLpNodes(1n, { onAccount: utils.getDefaultAccounts()[0] })
    // console.log(totalFunds)
    // console.log(RemainingFunds.decodedResult)
    // assert(totalFunds.decodedResult > RemainingFunds.decodedResult)
  })

  it('Look up proposal 1 Balance: if it is clear', async () => {
    const proposalInfo = await contract.getProposalByIndex(1n)
    const proposal = proposalInfo.decodedResult
    const totalDeposit = proposal.totalDeposit
    const totalFunds = proposal.totalFunds
    expect(totalDeposit).to.equal(0n)
    expect(totalFunds).to.equal(0n)
  })

  it('Leave DAO', async () => {
    const beforeLeave = await contract.isMember(utils.getDefaultAccounts()[4].address)
    expect(beforeLeave.decodedResult).to.equal(true)
    const proposalInfo = await contract.leaveDAO({ onAccount: utils.getDefaultAccounts()[4] })
    expect(proposalInfo.decodedResult).to.equal(true)
    const afterLeave = await contract.isMember(utils.getDefaultAccounts()[4].address)
    expect(afterLeave.decodedResult).to.equal(false)
  })
});
