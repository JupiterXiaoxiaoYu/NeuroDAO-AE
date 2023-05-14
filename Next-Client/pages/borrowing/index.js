import { Flex, Menu, MenuButton, MenuList, MenuItem, Stack, Box, Heading, Text, Button, Input, FormControl, FormLabel, FormHelperText, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import loadCustomRoutes from 'next/dist/lib/load-custom-routes';
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";


const BorrowingTable = ({ loans }) => {
    return (
        <Table variant="simple" ml={8} maxW={'45%'}>
            <Thead>
                <Tr>
                    <Th>Loan ID</Th>
                    <Th>Loan Amount</Th>
                    <Th>Interest Rate</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {loans.map((loan) => (
                    <Tr key={loan.id}>
                        <Td>{loan.id}</Td>
                        <Td>{loan.amount}</Td>
                        <Td>{loan.interestRate}</Td>
                        <Td alignItems={'center'}>
                            {loan.status}
                        </Td>
                        <Td>{loan.status=='finished' ? <Button backgroundColor={'green.400'}>View</Button> : <Button backgroundColor={'green.400'}>Repay</Button>}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

const loans = [
    {
        id: '1',
        amount: '1000',
        interestRate: '5.2',
        status: 'active'
    },
    {
        id: '2',
        amount: '500',
        interestRate: '3.8',
        status: 'finished'
    },
    {
        id: '3',
        amount: '2000',
        interestRate: '4.5',
        status: 'finished'
    },
    {
        id: '4',
        amount: '1500',
        interestRate: '6.1',
        status: 'finished'
    },
];

const Borrow = () => {
    return (
        <Box mx="auto" p={6}>
            <Heading mb={6}>Reputation Borrowing</Heading>

            <Text mb={4}>Enter the amount you want to borrow:</Text>
            <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input type="number" placeholder="Enter the amount" />
            </FormControl>

            <Text mt={6} mb={4}>Select the collateral:</Text>
            <Flex justifyContent={'space-between'} >
            <Menu p={5}>
                <MenuButton
                    px={4}
                    transition='all 0.2s'
                    borderRadius='md'
                    borderWidth='1px'
                    _hover={{ bg: 'gray.400' }}
                    _expanded={{ bg: 'blue.400' }}
                    _focus={{ boxShadow: 'outline' }}
                >
                    <i>{'Tokee DAO'}</i> (Coming Soon)
                </MenuButton>
                <MenuList color={'black'}>

                    <MenuItem as="button"
                        onClick={() => {

                        }}
                    >{'TPKEN DAO'}</MenuItem>

                </MenuList>
            </Menu>

            <Button mt={8} backgroundColor={'green.400'} size="lg" isFullWidth>
                Borrow
            </Button>
            </Flex>
        </Box>
    );
};

const Borrowing = () => {
    return (
        <Box alignItems={'center'}>
            <Header balance={0} address={'a'} />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Flex w="100%" my="6" mx="auto" px="6">
                    <Flex p={4} flexDir={'row'}>
                        <Borrow />
                        <BorrowingTable loans={loans} />
                    </Flex>
                </Flex>
            </Flex>
        </Box>

    );
};

export default Borrowing;
