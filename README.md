# NeuroDAOs

<div style={{ textAlign: 'center' }}>
<img width="50%" alt="neuro" src="https://user-images.githubusercontent.com/71649294/236729742-c2ed6e08-94c9-4d60-957c-6306f207db00.png">
</div>

**NeuroDAOs** is a Defi and DAO protocol that mimics the decision-making process of neural networks, utilizing the composability of Defi to facilitate collective decision-making and management for on-chain investments.

[Simple Deck](https://gamma.app/public/NeuroDAOs-vbe3n7su7x2nwdm?mode=doc)
-----------

## Introduction

On NeuroDAOs Users can create DAOs and DAO tokens, and join or manage the DAO in various roles such as Input Nodes (providing investment information), Hidden Nodes (analyzing investment information), Output Nodes (adjusting and making final decisions), LP Nodes (providing investment funds).

![DAO drawio (1)](https://github.com/JupiterXiaoxiaoYu/NeuroDAO-AE/assets/71649294/68db2d30-45a8-4349-9061-bcb733e8892c)

- As Input Nodes, users can create investment proposals, provide or supplement investment information, and pledge DAO tokens as confidence.
- As Hidden Nodes, users can verify and analyze investment information, provide support or dissenting opinions, and pledge DAO tokens as confidence.
- As Output Nodes, users can collectively adjust the overall investment amount and time, provide support or dissenting opinions, and pledge DAO tokens as confidence in the final decision-making phase.
- As LP Nodes, users can pledge $AE to the proposal as investment funds before execution.

To obtain DAO tokens, users must $AE at a fixed exchange rate (currently 1:100) to the DAO treasury. Pledged DAO tokens in the proposal can be used to increase the individual's earnings after the execution of that proposal.

After proposals are approved and reach the executable stage of investment or exit, any DAO member can execute the action of investment or exit, and the final profit and loss will be allocated to the various Nodes according to the algorithm. For example, Input Nodes, Hidden Nodes, and Output Nodes will lose a certain amount of DAO tokens due to their opposite investment attitudes toward profit and loss.

Nodes(members)' decision-making weight and overall reputation in the DAO will be adjusted based on their opinions and token pledges in the proposal. Once the overall reputation reaches a certain level, DAO tokens (Tokens of any DAO from the ones you have participated in) can be borrowed from the NeuroDAOs Lending Service. Those DAO tokens can be used to increase the Nodes' return on investment in DAO investment decisions or sold to node members who are unable to withdraw their pledged $AE due to a lack of DAO tokens (they may have made the wrong choice in investment).

## The Rationale and Focus

### Rationale

There is currently a lack of interoperability and composability features in many DAOs and DAO tools within the Blockchain/Web3 ecosystem. Additionally, the decision-making process within DAOs is often tedious and inefficient. Drawing inspiration from the mechanisms of Neural Networks and the structure of modern corporate organizations (with shareholders and employees), I have developed a foundational structure for NeuroDAOs. This innovative approach combines the best features of both Neural Networks and traditional corporate structures to create a DAO framework with clear role assignments, effective division of responsibilities, and a streamlined decision-making process. By incorporating these elements, NeuroDAOs can seamlessly interact with other protocols and applications on the blockchain, enabling efficient collaboration and integration within the ecosystem.

### Focus

For this hackathon, my main focus is on enhancing the Defi aspects of interoperability and composability within the DAO. I aim to leverage the capabilities of the existing Superhero DEX to enable collective investments on the Aeternity blockchain. By integrating with Superhero DEX, NeuroDAOs will provide users with the opportunity to participate in collective investment activities, benefiting from the features and liquidity of the DEX. This integration will enhance the overall functionality and potential of NeuroDAOs as a robust DAO & Defi protocol.

## The Design

![arch drawio (3)](https://github.com/JupiterXiaoxiaoYu/NeuroDAO-AE/assets/71649294/8b9850c9-f236-4f4a-8977-b83f55851e14)

In NeuroDAOs, a DAO could be visualized as a neural network and each member could become a node in that specific neural network. In order to make the investment decision more decentralized and more profit-oriented, each node has its own weights which decide how much it would affect the decision-making of the whole neural network. And, to increase the weight, each node has to make the personal decision as "right" as possible. After an epoch of investment (meaning buy in and sell the targeted token/ or perform a full loop of Defi interaction), the weights of each node will be automatically adjusted to fits the investment result, this process is called optimizing neural network node weights, also, in NeuroDAOs' context, is called **optimizing DAO**.

The entire process of optimizing neural network node weights can be divided into several steps, as well as optimizing DAO:

1. **Forward propagation**: The neural network starts from the input layer and passes the input signal through a series of linear and nonlinear transformations, propagating it to the output layer to obtain the network's prediction.
   
   - In NeuroDAOs' design, there will be 3-5 layers of nodes (Currently for the Demo purpose only 3 layers are allowed), including input, hidden, and output layers.
   - Here's the decision process:
   - First, the input layer collects and verifies information related to an investment. Nodes in the input layer must stake some DAO/network tokens to prevent malicious behaviors and contribute to the final investment returns and weight adjustment.
   - The hidden layers analyze the information collected by the input layer and provide feedback. If the information is enough to make an investment proposal, the hidden layer analyzes the feasibility of the investment and passes the analysis result to the output layer. The hidden layer must also stake tokens to prevent malicious behavior and gain revenue.
   - The output layer made the final decision by staking tokens.
   - And for the LP nodes, they can invest in the proposal anytime before the execution of that proposal.
   - Once the decision process is finished, and the investment time reaches the deadline, the money from LP nodes is used to invest.
2. **Compute error && Backpropagation**: The prediction of the neural network is compared with the actual labels/numbers to calculate the error, which is propagated backward from the output layer to the input layer. This step aims to calculate each node's contribution to the error, so adjustments can be made in subsequent optimization.
   
   - Once an investment exit for a proposal is confirmed, the investment result is confirmed and if there are any benefits, it would give to all people who stake tokens to invest accroding to their weights and decisions in the DAO.
   - There will be a simple calculation for the score of each member according to the comparison between the benefit or loss of the investment and their investment advice/decision (composed of investment information and deposit, as well as the weight in the DAO).
3. **Update weights**: The weights of each node are updated based on the calculated gradients and optimization algorithm), gradually reducing the error / optimizing the model.
   
   - For NeuroDAO, The weights and overall reputation of node members will be adjusted based on the calculated scores/contributions/responsibility towards the benefits/loss of the investment proposal.

## A Defi-enabled DAO Protocol

![Copy of arch drawio (1)](https://github.com/JupiterXiaoxiaoYu/NeuroDAO-AE/assets/71649294/fb81eb23-c61f-44cd-8756-59d0fe15d537)


### Integrations with Defi Protocols / Token Standard on Aeternity

- [x] ✨ Support for Swap interface of Superhero decentralized exchange (DEX), People could invest in or trade a token as a DAO on Aeternity.
- [x] ✨ Integration of AEX-9 token standard as a corresponding DAO-managed governance Token generated with DAO, which has many use cases (such as borrowing, staking and so on)
- [ ] 🛠 Decentralized yield aggregator interface - Plan
- [ ] 🛠 Decentralized derivatives interface - Plan
- [ ] 🛠 Decentralized prediction market interface - Plan
- [ ] 🛠 Decentralized fixed rate protocol interface - Plan
- [ ] 🛠 Decentralized insurance interface - Plan

### A Reputation-based Defi Architecture

- In NeuroDAOs, members have the opportunity to stake their ```$AE``` in exchange for DAO tokens. By staking ```$AE```, members contribute to the Total Value Locked (TVL) of the DAO, which can be utilized to invest in fixed-income protocols, generating profits for the members.
- The DAO tokens obtained through staking play a crucial role in increasing the decision-making power of the nodes within the DAO. These tokens not only enhance their influence in proposing and voting on DAO initiatives but also serve as a means to earn reputation and interest rewards following the decision-making process. However, it is important to note that this utilization of DAO tokens also introduces certain risks, as they act as leverage in the decision-making process.
- As the reputation of a member within the DAO reaches a certain threshold, they gain the ability to borrow additional DAO tokens through reputation lending. These borrowed DAO tokens can further boost the member's income or be sold to other DAO members who are unable to redeem their pledged $AE due to losses incurred in decision-making. This mechanism incentivizes DAO members to strive for sound decision-making, fostering a dynamic and engaging Defi environment within NeuroDAOs.

### Potential

Potential benefits of NeuroDAOs include:

- Launchpad for Projects on Aeternity: NeuroDAOs can serve as a novel platform for trading and investing in projects built on the Aeternity blockchain. By utilizing the collective resources and decision-making capabilities of the DAO, it can act as a launchpad for promising projects, providing them with the necessary funding and support.
- SocialFi Interaction: NeuroDAOs introduce a new paradigm in social finance (SocialFi). They offer services such as reputation systems, lending, and borrowing within the DAO ecosystem. These features enable members to leverage their reputation and participate in lending/borrowing activities, creating a vibrant and interconnected network of financial interactions.
- Efficient Decision-Making: NeuroDAOs provide an innovative approach to decision-making processes. By combining the strengths of neural networks and the structure of modern corporate structures, the DAO can streamline and optimize decision-making, making it more efficient and effective. This can be particularly valuable for managing funds and organizing events within the NeuroDAO ecosystem.
- Overall, NeuroDAOs have the potential to revolutionize trading, investing, social finance, and decision-making processes on the Aeternity blockchain. By leveraging the power of collective intelligence and incorporating advanced features, they can unlock new opportunities and enhance the overall ecosystem.

## Built With/On

- React.js/Next.js/Chakra UI/Javascript/Typescript
- Sophia/AEStudio/Aepp.js/AEproject/...

### Contract Architecture

- NeuroDAOFactory.aes (serves as an index for all DAOs) -> Deploy:
  - Reputation.aes (serves as a overall reputation storage service)
  - Swap.aes (serves as a Agent to interact with DEX) -> Interact with:
    - DEXInterface.aes (SuperheroDEX)
  - NeuroDAO.aes (serves as a basic model for a DAO)

### Deployed Contracts

```
NeuroDAOFactory (Testnet): `ct_2CDnNaKBMX2t3PtSmvjBXE95sPRNvsCi1xwZaASH7WYdeBkXrC`
```

NeuroDAO (Testnet): there are several contract addresses asscociated with the NeuroDAOFactory, you can call entrypoint ```getAlldaoData``` to get all of them.

## Instructions about Running the Project

- Clone the repo

### Client

- Go into the CRA-Client Folder, run ```npm i``` in your console
- Test/Build as the Instructions in the Readme file
- If you want to deploy a factory contract and use it yourself, replace the Contract Address Specified in the Client Files, It is easy to find them, you can search for keywords such as "contract" , "ct_"

### Contract

- Go into the Contract Folder, run ```npm i``` in your console, and make sure you have the AE project installed. For Windows users, you have to do this in WSL
- Test the contracts with ```npm run test``` or ```aeproject test```
- Compile the contracts with ```npm run compile```
- Deploy: go into the scripts folder in Contract Folder, change the network/wallet parameter (note: the private key exposed there is just for the test purpose, don't publicly share this file if you have changed the account)  and run ```npm run deploy```

### Tests coverage

#### NeuroDAOFactory.aes - FactoryTest.js

3 tests Including Create NeuroDAO instance (which creates an AEX-9 instance) and getting some crucial data

#### NeuroDAO.aes - userFlowTest.js

22 fulfilled tests including joining DAO as different roles, staking ```$AE``` and getting DAO token, burning DAO Token and redeeming ```$AE```, Creating different proposals, voting on different proposals as different roles on different stages of the proposals, fund proposals, reject the proposal and refund the voters and LPs.

Note:

- Other Contracts are included in those two main contracts
- Because I don't have a copy of testnet/mainnet locally or remotely it is hard to test the function of executing investment in existing protocols / Dapps such as Superhero DEX.

## Thanks

* Hello, I'm Jupiter from the University of Edinburgh, and I'm deeply passionate about the Blockchain/Web3 world. You can reach me at [jupiterxiaoxiaoyu@gmail.com](mailto:jupiterxiaoxiaoyu@gmail.com).
* I have dedicated considerable time and effort to developing smart contracts, and I am proud to say that they are nearly complete, with just a few minor details remaining. Although building the Client and Web components has been challenging, I have given it my best shot. Regardless of whether I win a prize, I am grateful to myself for the dedication and hard work I have put into this project.
* I would also like to express my gratitude to the organizers and supporters of the hackathon. It is thanks to their efforts and the opportunities they have provided that I am able to participate in this event.

## License

```
ISC License

Copyright (c) 2023, Jupiter Yu

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
/PERFORMANCE OF THIS SOFTWARE.
```
