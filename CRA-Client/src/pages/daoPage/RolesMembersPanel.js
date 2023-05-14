import React, { Component, useEffect, useState } from "react";
import { Box, Divider, Flex, Heading, SimpleGrid, VStack, Text, Button } from "@chakra-ui/react";
import NeuroDAOACI from "../acis/NeuroDAO.json"
import { useWalletProvider } from "../../contexts/WalletProviderContext";

const RolesMembersPanel = ({ appState }) => {
    const { walletInfo, savedSDK } = useWalletProvider()
    // handleEpochChange(event) {
    //     appState.doSetEpochs(event.target.value)
    // }

    // handleBatchChange(event) {
    //     appState.doSetBatchSize(event.target.value)
    // }
    // console.log('=====', appState)
    // const [alertState, setAlertState] = useState('success');
    // console.log(appState)

    const [inputNodes, setInputNodes] = useState([]);
    const [hiddenNodes, setHiddenNodes] = useState([]);
    const [outputNodes, setOutputNodes] = useState([]);
    const [lpNodes, setLPNodes] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [metaData, setMetaData] = useState({})

    useEffect(() => {
        if (!appState.readOnlyContract) return
        async function getNodes() {
            const input = await appState.readOnlyContract.getInputNodesWithWeight()
            const hidden = await appState.readOnlyContract.getHiddenNodesWithWeight()
            const output = await appState.readOnlyContract.getOutputNodesWithWeight()
            const lp = await appState.readOnlyContract.getLpNodesWithWeight()
            const metaInfo = await appState.readOnlyContract.getMetaInfo()
            setInputNodes(input.decodedResult)
            setHiddenNodes(hidden.decodedResult)
            setOutputNodes(output.decodedResult)
            setLPNodes(lp.decodedResult)
            setMetaData(metaInfo.decodedResult)
            console.log(metaInfo.decodedResult)
        }
        getNodes()
    }, [appState.contract, appState.readOnlyContract])

    // const DAOContract = sdk.getContract(
    //     contractAddressdata, // The address of your smart contract
    //     abi, // The ABI of your smart contract
    // );

    const callJoinDAOAsInputs = async () => {
        try {
            if (!savedSDK) {
                appState.doPrompt({ description: 'Please connect to wallet first', status: 'error' })
                return
            }
            setIsLoading(true)
            const aeSdk = savedSDK;
            console.log(aeSdk)
            if (!appState.contract) {
                const contract = await aeSdk.initializeContract({ aci: NeuroDAOACI, address: appState.contractAddress.replace('ak_', 'ct_') });
                appState.doSetContract(contract)
                const data = await contract.joinAsInputNode(walletInfo.address)
                console.log(data.decodedResult)
            } else {
                const data = await appState.contract.joinAsInputNode(walletInfo.address)
                console.log(data.decodedResult)
            }
            // contractAddress = ct.address.replace('ct_', 'ak_')
            setIsLoading(false)
            console.info("contract call successs");
            appState.doPrompt({ description: 'Your has sucessfully joined the DAO!', status: 'success' });
        } catch (err) {
            console.error("contract call failure", err);
            appState.doPrompt({ description: 'Join DAO failed', status: 'error' });
            setIsLoading(false)
        }
    }

    const callJoinDAOAsHidden = async () => {
        try {
            if (!savedSDK) {
                appState.doPrompt({ description: 'Please connect to wallet first', status: 'error' })
                return
            }
            setIsLoading(true)
            const aeSdk = savedSDK;
            console.log(aeSdk)
            if (!appState.contract) {
                const contract = await aeSdk.initializeContract({ aci: NeuroDAOACI, address: appState.contractAddress.replace('ak_', 'ct_') });
                appState.doSetContract(contract)
                const data = await contract.joinAsHiddenNode(walletInfo.address)
                console.log(data.decodedResult)
            } else {
                const data = await appState.contract.joinAsHiddenNode(walletInfo.address)
                console.log(data.decodedResult)
            }
            // contractAddress = ct.address.replace('ct_', 'ak_')
            setIsLoading(false)
            console.info("contract call successs");
            appState.doPrompt({ description: 'Your has sucessfully joined the DAO!', status: 'success' });
        } catch (err) {
            console.error("contract call failure", err);
            appState.doPrompt({ description: 'Join DAO failed', status: 'error' });
            setIsLoading(false)
        }
    }

    const callJoinDAOAsOutput = async () => {
        try {
            if (!savedSDK) {
                appState.doPrompt({ description: 'Please connect to wallet first', status: 'error' })
                return
            }
            setIsLoading(true)
            const aeSdk = savedSDK;
            console.log(aeSdk)
            if (!appState.contract) {
                const contract = await aeSdk.initializeContract({ aci: NeuroDAOACI, address: appState.contractAddress.replace('ak_', 'ct_') });
                appState.doSetContract(contract)
                const data = await contract.joinAsOutputNode(walletInfo.address)
                console.log(data.decodedResult)
            } else {
                const data = await appState.contract.joinAsOutputNode(walletInfo.address)
                console.log(data.decodedResult)
            }
            // contractAddress = ct.address.replace('ct_', 'ak_')
            setIsLoading(false)
            console.info("contract call successs");
            appState.doPrompt({ description: 'Your has sucessfully joined the DAO!', status: 'success' });
        } catch (err) {
            console.error("contract call failure", err);
            appState.doPrompt({ description: 'Join DAO failed', status: 'error' });
            setIsLoading(false)
        }
    }

    const callJoinDAOAsLP = async () => {
        try {
            if (!savedSDK) {
                appState.doPrompt({ description: 'Please connect to wallet first', status: 'error' })
                return
            }
            setIsLoading(true)
            const aeSdk = savedSDK;
            console.log(aeSdk)
            if (!appState.contract) {
                const contract = await aeSdk.initializeContract({ aci: NeuroDAOACI, address: appState.contractAddress.replace('ak_', 'ct_') });
                appState.doSetContract(contract)
                const data = await contract.joinAsLpNode(walletInfo.address)
                console.log(data.decodedResult)
            } else {
                const data = await appState.contract.joinAsLpNode(walletInfo.address)
                console.log(data.decodedResult)
            }
            // contractAddress = ct.address.replace('ct_', 'ak_')
            setIsLoading(false)
            console.info("contract call successs");
            appState.doPrompt({ description: 'Your has sucessfully joined the DAO!', status: 'success' });
        } catch (err) {
            console.error("contract call failure", err);
            appState.doPrompt({ description: 'Join DAO failed', status: 'error' });
            setIsLoading(false)
        }
    }



    return (
        <Box>
            
            <Box borderWidth="1px" borderRadius="md" p="4" shadow="md">
                <Text>DAO Name: {metaData.name}</Text>
                <Text>Description: {metaData.description}</Text>
                <Text>DAO Token Address: {metaData.daoTokenAdress}</Text>
                <Text>Founder: {metaData.owner}</Text>
                <Button onClick={()=>{}} colorScheme="cyan">
                    Details
                </Button>
            </Box>
            <Box mb="1rem" />
            <Button backgroundColor={'green.400'} onClick={appState.selectedLayer == 0 ? callJoinDAOAsInputs : appState.selectedLayer == appState.network.arrLayers.length - 1 ? callJoinDAOAsOutput : callJoinDAOAsHidden} disabled={isLoading}>
                {`Join DAO As ${appState.selectedLayer == 0 ? 'Input' : appState.selectedLayer == appState.network.arrLayers.length - 1 ? 'Output' : 'Hidden'} Nodes`}
            </Button>
            <Box mb="1rem" />
            <Text>Or</Text>
            <Box mb="1rem" />
            <Button backgroundColor={'green.400'} onClick={callJoinDAOAsLP} disabled={isLoading}>
                {`Join DAO As LP Nodes`}
            </Button>
            <Box mb="1rem" />
            <Text fontWeight={'semibold'}>{`Nodes of Input Layer: ${inputNodes.length} /${appState.network.arrLayers[0].numNodes} (Who responsible for Information Collection and Verification)`}</Text>
            <Box mb="1rem" />
            <Text fontWeight={'semibold'}>{`Nodes of Hidden Layer: ${hiddenNodes.length} /${appState.network.arrLayers.slice(1, -1).reduce((acc, layer) => {
                return parseInt(parseInt(acc) + parseInt(layer.numNodes));
            }, 0)} (Who responsible for Information Processing and Analyzing)`}</Text>
            <Box mb="1rem" />
            <Text fontWeight={'semibold'}>{`Nodes of Output Layer: ${outputNodes.length} /${appState.network.arrLayers[appState.network.arrLayers.length - 1].numNodes} (Who responsible for Final Investment Decision Making)`}</Text>
            <Box mb="1rem" />
            <Text fontWeight={'semibold'}>{`Nodes of Output Layer: ${lpNodes.length} (Who only invest funds into the proposal)`}</Text>
            <Box mb="1rem" />
            <Text fontWeight={'semibold'}>{`Total Decisional Nodes Positions: ${appState.network.arrLayers.reduce((acc, layer) => {
                return parseInt(parseInt(acc) + parseInt(layer.numNodes));
            }, 0)}`}</Text>
            <Box mb="1rem" />
            <Text fontWeight={'semibold'}>{`Total Nodes: ${inputNodes.length + hiddenNodes.length + outputNodes.length + lpNodes.length}`}</Text>
            <Box mb="1rem" />

        </Box>
    );
}

export default RolesMembersPanel;