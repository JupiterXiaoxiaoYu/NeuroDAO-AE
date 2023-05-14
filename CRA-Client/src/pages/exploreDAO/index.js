import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';
import useAeternitySDK from '../../hooks/useAeternitySDK';
import network from "../../configs/network";
import {useEffect, useState } from "react";
import { useWalletProvider } from "../../contexts/WalletProviderContext";

export default function UserList() {
  // console.log(isLoading?'1':data[0])
  const [isLoading, setIsLoading] = useState(false);
  const [daoData, setDaoData] = useState([]);
  const {factoryContract, savedSDK: aeSdk, readOnlyFactoryContract} = useWalletProvider();

  useEffect(()=>{
    console.log("Im here")
  })
  
  useEffect(()=>{
    const fetchData = async () =>{
      console.log('hi')
      const allInfo = await readOnlyFactoryContract.getAlldaoData()
      console.log(allInfo.decodedResult)
      setDaoData(allInfo.decodedResult)
    }
    if(readOnlyFactoryContract == null) return;
    fetchData()
  }, [factoryContract, readOnlyFactoryContract])

  // daoData?.map((dao, index) => (
  //   console.log(dao[1])
  // ))

  const truncatedAddress = (addr) => addr.slice(0, 6) + "..." + addr.slice(-4);
  const trunctaedDescription = (desc) => desc.slice(0, 20);

  return (
    <Box>
      <Header balance={0} address={'a'} networkId={''}/>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Explore NeuroDAOs</Heading>
            <Link href="/createDAO">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Create a DAO
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                {/* <Th px={["4", "4", "6"]} color="gray.300" width="8">
                  <Checkbox colorScheme="green" />
                </Th> */}
                <Th>Name</Th>
                <Th>ID</Th>
                <Th>Description</Th>
                <Th>Token Address</Th>
                <Th>DAO Address</Th>
                <Th width="8">Actions</Th>
              </Tr>
            </Thead>


            <Tbody>
              { daoData?.map((dao, index) => (
              <Tr key={index}>
                <Td>
                  <Box>
                    <Text fontWeight="bold">{dao[1]?.name}</Text>
                  </Box>
                </Td>
                <Td>
                    <Text fontWeight="bold">{Number(dao[1]?.id)}</Text>
                </Td>
                <Td>
                    <Text fontWeight="bold">{trunctaedDescription(dao[1]?.description)}</Text>
                </Td>
                <Td>
                    <Text fontWeight="bold">{truncatedAddress(dao[1]?.daoTokenAdress.toString())}</Text>
                </Td>
                <Td>
                    <Text fontWeight="bold">{truncatedAddress(dao[0]?.toString())}</Text>
                </Td>
                <Td>
                <Link to={`/daoPage/${dao[0]}`}>
                <Button backgroundColor={'green.400'}>View</Button>
                </Link>
                </Td>
              </Tr>))}
              </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
    </Box>
  )
}
