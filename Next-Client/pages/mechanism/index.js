import { Box, Flex, Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";


const FAQPage = () => {
    const faqData = [
        {
            question: "What is NeuroDAO?",
            answer: "NeuroDAO is a decentralized autonomous organization (DAO) that aims to revolutionize the field of neuroscience research and funding by leveraging blockchain technology.",
        },
        {
            question: "How can I participate in NeuroDAO?",
            answer: "To participate in NeuroDAO, you can visit our website and follow the instructions on how to become a member. Once you become a member, you can contribute to funding research projects and participate in decision-making processes within the DAO.",
        },
        {
            question: "What are the benefits of joining NeuroDAO?",
            answer: "By joining NeuroDAO, you gain the opportunity to be part of a community-driven initiative that is shaping the future of neuroscience research. You can collaborate with experts in the field, access cutting-edge research projects, and have a say in the allocation of funding resources.",
        },
        {
            question: "How are funding decisions made in NeuroDAO?",
            answer: "Funding decisions in NeuroDAO are made through a decentralized governance process. Members can submit proposals for research projects, and the community votes to determine which projects receive funding. This democratic approach ensures transparency and inclusivity in the decision-making process.",
        },
        {
            question: "Is NeuroDAO open to international members?",
            answer: "Yes, NeuroDAO welcomes members from all around the world. We believe in the power of global collaboration and diversity of perspectives in advancing neuroscience research.",
        },
    ];

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
                                            {item.question}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                        {item.answer}
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
