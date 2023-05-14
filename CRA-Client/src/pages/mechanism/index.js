import { Box, Flex, Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";


const FAQPage = () => {
    const faqData = [
        {
          "question": "What is NeuroDAO?",
          "answer": "NeuroDAO is a decentralized finance (DeFi) and decentralized autonomous organization (DAO) protocol that mimics the decision-making process of neural networks. It allows users to create DAOs, participate in various roles, and make collective investment decisions."
        },
        {
          "question": "What are the roles in NeuroDAO?",
          "answer": "NeuroDAO includes roles such as Input Nodes, Hidden Nodes, Output Nodes, and LP Nodes. Input Nodes provide investment proposals and information, Hidden Nodes analyze and verify information, Output Nodes make final decisions, and LP Nodes provide investment funds."
        },
        {
          "question": "How can I obtain DAO tokens in NeuroDAO?",
          "answer": "To obtain DAO tokens, you need to pledge AE at a fixed exchange rate to the DAO treasury. The pledged DAO tokens can increase your earnings in DAO decision-making."
        },
        {
          "question": "What happens after a proposal is approved in NeuroDAO?",
          "answer": "Once a proposal is approved, any DAO member can execute the investment or exit. The final profit and loss are allocated to the different Nodes based on an algorithm. Nodes may lose DAO tokens due to opposing investment attitudes towards the profit and loss."
        },
        {
          "question": "How are the decision-making weight and reputation of Nodes adjusted in NeuroDAO?",
          "answer": "The decision-making weight and overall reputation of Nodes are adjusted based on their opinions and token pledges in proposals. Once the reputation reaches a certain level, DAO tokens can be lent on the NeuroDAOs credit market or sold to other node members."
        },
        {
          "question": "Can you explain the neural network analogy in NeuroDAO?",
          "answer": "In NeuroDAO, the DAO is visualized as a neural network, and each user becomes a node within that network. The weights assigned to each node determine their influence on the decision-making process. Nodes aim to optimize their personal decisions to increase their weights."
        },
        {
          "question": "Which DeFi protocols does NeuroDAO integrate with?",
          "answer": "NeuroDAO integrates with SuperSwap for token swapping. It plans to develop interfaces for decentralized yield aggregation, decentralized derivatives, decentralized prediction markets, decentralized fixed-rate protocols, and decentralized insurance."
        },
        {
          "question": "How does reputation lending work in NeuroDAO?",
          "answer": "When the reputation of a Node reaches a certain value, it can be used to borrow DAO tokens through reputation lending. These borrowed DAO tokens can increase the node's income or be sold to DAO members who cannot redeem their pledged tokens due to decision-making losses."
        }
      ]
      

    return (

        <Box alignItems={'center'}>
            <Header balance={0} address={'a'} />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Flex w="100%" my="6" mx="auto" px="6">
                    <Box w="800px" mx="auto" py={8} px={4}>
                        <Heading as="h1" size="xl" mb={8} textAlign="center">
                            FAQ - NeuroDAO
                        </Heading>
                        <Accordion allowMultiple w={'100%'}>
                            {faqData.map((item, index) => (
                                <AccordionItem key={index}>
                                    <AccordionButton py={4}>
                                        <Box flex="1" textAlign="left">
                                            {item["question"]}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                        {item["answer"]}
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Box>
                </Flex>
            </Flex>
        </Box>


    );
};

export default FAQPage;
