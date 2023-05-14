import React, { useEffect, useState } from "react";
import {
    Table,
    Tbody,
    Tr,
    Td,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Textarea,
    Select,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProposalCard from "./ProposalCard";
import { useWalletProvider } from "../../contexts/WalletProviderContext";
import NeuroDAOACI from "../acis/NeuroDAO.json"
import useAeternitySDK from '../../hooks/useAeternitySDK';

const ProposalTable = ({appState}) => {
    // console.log(appState)
    const [buyTime, setBuyTime] = useState(new Date());
    const [sellTime, setSellTime] = useState(new Date());
    const [proposals, setProposals] = useState([]);
    const [tokenAddress, setTokenAddress] = useState("");
    const [deposit, setDeposit] = useState("");
    const [decisionTime, setDecisionTime] = useState("");
    const [description, setDescription] = useState("");
    const [proposalId, setProposalId] = useState("");
    const [contractAddress, setContractAddress] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {walletInfo, savedSDK, setReadOnlyDaoContractWithSDK} = useWalletProvider()
    const [proposalName, setProposalName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [proposalsData, setProposalsData] = useState()

    // console.log(props.contractAddressData)

    // useEffect(() => {
    //     setContractAddress(appState.contractAddressData)
    //     console.log(appState.contractAddressData)
    // }, [appState.contractAddressData])


    useEffect(()=>{
        const fetchProposals = async () =>{
            console.log('hicontract')
            const readOnlyDAO = await setReadOnlyDaoContractWithSDK(appState.contractAddress.replace('ak_', 'ct_'))
            // console.log(readOnlyDAO)
            const data = await readOnlyDAO.getProposals()
            const proposals = convertMapToObject(data.decodedResult)
            setProposalsData(Object.entries(proposals))
            console.log(Object.entries(proposals))
          }
          fetchProposals()
    }, [appState.contractAddress])

    function convertMapToObject(map) {
        const obj = {};
      
        for (const [key, value] of map) {
          if (value instanceof Map) {
            obj[key] = convertMapToObject(value);
          } else {
            obj[key] = value;
          }
        }
      
        return obj;
      }

    const handleSubmit = async () => {
        try {
            if(!savedSDK){
                appState.doPrompt({ description: 'Please connect to wallet first', status: 'error' })
                return
            }
            setIsLoading(true)
            const aeSdk = savedSDK;
            console.log(aeSdk)
            if(!appState.contract){
                const contract = await aeSdk.initializeContract({aci: NeuroDAOACI, address: appState.contractAddress.replace('ak_', 'ct_')});
                appState.doSetContract(contract)
                const data = await contract.createProposal(proposalName, description, tokenAddress.replace('ct_', 'ak_'), buyTime.getTime(), sellTime.getTime(), decisionTime, deposit.toString())
                console.log(data.decodedResult)
                const data1 = await contract.getProposals()
                const proposals = convertMapToObject(data1.decodedResult)
                setProposalsData(Object.entries(proposals))
            }else{
                const data = await appState.contract.createProposal(proposalName, description, tokenAddress.replace('ct_', 'ak_'), buyTime.getTime(), sellTime.getTime(), decisionTime, deposit.toString())
                const data1 = await appState.contract.getProposals()
                const proposals = convertMapToObject(data1.decodedResult)
                setProposalsData(Object.entries(proposals))
                console.log(data.decodedResult)
            }

            // contractAddress = ct.address.replace('ct_', 'ak_')
            setIsLoading(false)
            console.info("contract call successs");
            appState.doPrompt({ description: 'Your has sucessfully created a proposal!', status: 'success' });
        } catch (err) {
            console.error("contract call failure", 'Craete proposal Failed, Please join as Input nodes or get DAO token first');
            appState.doPrompt({ description: err.toString() , status: 'error' });
            setIsLoading(false)
        }
        // 获取表单输入的值
        // console.log(e.target)
        // console.log(contractAddress)
        console.log(tokenAddress, deposit, buyTime.getTime(), sellTime.getTime(), decisionTime)
        // const data = await appState.contract.call(
        //     "createProposal", // Name of your function as it is on the smart contract
        //     // Arguments to your function, in the same order they are on your smart contract
        //     [
        //         proposalName, description, tokenAddress, buyTime.getTime(), sellTime.getTime(), decisionTime, deposit.toString()
        //     ],
        // );

    };

    // const getProposals = async () => {

    //     console.log(props.contractAddressdata)
    //     const DAOContract = await sdk.getContract(
    //         contractAddress, // The address of your smart contract
    //         abi, // The ABI of your smart contract
    //     );
    //     const data = await DAOContract.call(
    //         "numProposals", // Name of your function as it is on the smart contract
    //         // Arguments to your function, in the same order they are on your smart contract
    //         // [
    //         //   "arg1", // e.g. Argument 1
    //         // ],
    //     );
    //     console.log(data)
    // }

    // useEffect(() => {
    //         getProposals().then(() => {
    //             console.log('data')
    //         })

    // }, [props.contractAddressdata])

    // useEffect(() => {
    //     console.log(buyTime)
    // }, [buyTime])

    // useEffect(() => {
    //     console.log(sellTime)
    // }, [sellTime])

    const handleFund = () => {
        // handle fund action
    };

    const handleVote = () => {
        // handle vote action
    };

    const handleDetails = () => {
        // handle details action
    };

    return (
        <Box overflowX="auto">
            <Box mb="1rem" />
            <Button backgroundColor={'green.400'} onClick={onOpen} isLoading={isLoading}>
                {`Create a Proposal`}
            </Button>
            <Box mb="1rem" />
            <Modal isOpen={isOpen} onClose={onClose} colorScheme={'black'} >
                <ModalOverlay />
                <ModalContent color={'black'}>
                    <ModalHeader color={'black'}>Create Proposal</ModalHeader>
                    <ModalBody>
                    <FormControl>
                            <FormLabel>Proposal Name</FormLabel>
                            <Input name="proposalName" onChange={(event) => setProposalName(event.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Token Address for Investment</FormLabel>
                            <Input name="tokenAddress" onChange={(event) => setTokenAddress(event.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Buy Time</FormLabel>
                            <DatePicker
                                selected={buyTime}
                                minDate={new Date()}
                                onChange={(date) => {
                                    setBuyTime(date);
                                    if (date > sellTime) {
                                        setSellTime(date);
                                    }
                                }}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Sell Time</FormLabel>
                            <DatePicker
                                selected={sellTime}
                                minDate={buyTime}
                                onChange={(date) => setSellTime(date)}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Deposit</FormLabel>
                            <Input type="number" name="deposit" onChange={(event) => setDeposit(event.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Decision Time In Seconds</FormLabel>
                            <Input type="number" name="decisionTime" onChange={(event) => setDecisionTime(event.target.value)}></Input>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea name="description" onChange={(event) => setDescription(event.target.value)
                            }/>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={isLoading} >
                            Create
                        </Button>
                        <Button onClick={onClose} isLoading={isLoading}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            { proposalsData?.map((proposal, index) => (
            <ProposalCard
                key={proposal[0]}
                tokenAddress={proposal[1].targetedTokenAddress}
                totalDeposit={Number(proposal[1].totalDeposit)}
                totalFunds={Number(proposal[1].totalFunds)}
                plannedBuyTime={new Date(Number(proposal[1].executeBuyAfter)).toLocaleDateString()}
                plannedSellTime={new Date(Number(proposal[1].executeSellAfter)).toLocaleDateString()}
                decisionStagePeriod={`${Number(proposal[1].decisionTimeInSeconds)} seconds`}
                currentStage={Object.keys(proposal[1].stage)[0]}
                onFund={()=>handleFund(index)}
                onVote={()=>handleVote(index)}
                onDetails ={()=>handleDetails(index)}
            />
            ))}
        </Box>
    );
};

export default ProposalTable;