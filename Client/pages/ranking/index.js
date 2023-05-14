import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex } from '@chakra-ui/react';
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

const rankings = [
    { member: 'John Doe', reputation: 100, earn:124 },
    { member: 'Jane Smith', reputation: 90, earn: 123 },
    { member: 'Alice Johnson', reputation: 80, earn: 100 },
    // Add more rankings...
];

// Inside your main component or page


const RankingBoard = ({ rankings }) => {

    return (
        <Box p={8}>
        <Heading as="h2" mb={4}>Reputation Rankings</Heading>
        <Table variant="simple">
          <Thead>
            <Tr >
              <Th>Rank</Th>
              <Th>Member</Th>
              <Th>Reputation Score</Th>
              <Th>Earned AE</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rankings.map((ranking, index) => (
              <Tr key={ranking.member}>
                <Td textAlign="center">{index + 1}</Td>
                <Td >{ranking.member}</Td>
                <Td textAlign="center">{ranking.reputation}</Td>
                <Td textAlign="center">{ranking.earn}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
};

const Ranking = () => {
    return (
        <Box alignItems={'center'}>
            <Header balance={0} address={'a'} />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Flex w="100%" my="6" mx="auto" px="6">
                    <Box mx="auto" p={6}>
                        <RankingBoard rankings={rankings} />
                    </Box>
                </Flex>
            </Flex>
        </Box>

    );
}

export default Ranking;
