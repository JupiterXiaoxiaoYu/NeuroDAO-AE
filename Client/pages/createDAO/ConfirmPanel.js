import React, { Component, useState } from "react";
import { Box, Divider, Flex, Heading, SimpleGrid, VStack, Text, Button } from "@chakra-ui/react";
// import useAeternitySDK from '../../hooks/useAeternitySDK';
// import NeuroDAOFactoryACI from '../acis/NeuroDAOFactory.json'
import {useWalletProvider} from '../../contexts/WalletProviderContext'

const ConfirmPanel = (props) => {
    // const { aeSdk, address, networkId, connectToWallet } = useAeternitySDK();
    const { factoryContract, savedSDK } = useWalletProvider()
    
    // handleEpochChange(event) {
    //     props.appState.doSetEpochs(event.target.value)
    // }

    // handleBatchChange(event) {
    //     props.appState.doSetBatchSize(event.target.value)
    // }
    // console.log('=====', props.appState)
    const [alertState, setAlertState] = useState('success');
    const [isLoading, setIsLoading] = useState(false)


    const callCreateDAO = async () => {

        try {
            // await connectToWallet();
            if(!savedSDK){
                props.appState.doPrompt({ description: 'Please connect to wallet first', status: 'error' })
                return
            }
            setIsLoading(true)
            const aeSdk = savedSDK;
            console.log(aeSdk)
            const contract = factoryContract
            
            // contractAddress = ct.address.replace('ct_', 'ak_')
            const hiddenNodesNum = props.appState.network.arrLayers.slice(1, -1).reduce((acc, layer) => {
                return parseInt(parseInt(acc) + parseInt(layer.numNodes))
            }, 0);

            const set = await contract.getAlldaoData();
            console.log(set.decodedResult)
            const addr = await contract.getTemplateDAOTokenAddress();
            console.log(addr.decodedResult)
            
            console.log({
                args: [props.appState.DAOName, props.appState.DAODescription, props.appState.TokenName, props.appState.TokenSymbol, addr.decodedResult, props.appState.network.arrLayers.length, props.appState.network.arrLayers[0].numNodes, hiddenNodesNum, props.appState.network.arrLayers[props.appState.network.arrLayers.length - 1].numNodes, props.appState.responsibilityOverlap]
            })

            const daoAddressResult = await contract.createDAOContract(props.appState.DAOName, props.appState.DAODescription, props.appState.TokenName, props.appState.TokenSymbol, addr.decodedResult, props.appState.network.arrLayers.length, props.appState.network.arrLayers[0].numNodes, hiddenNodesNum, props.appState.network.arrLayers[props.appState.network.arrLayers.length - 1].numNodes, props.appState.responsibilityOverlap);
            console.log(daoAddressResult.decodedResult)
            const daoInfo = await contract.getdaoData(daoAddressResult.decodedResult);
            console.log(daoInfo.decodedResult)



            // console.log(hiddenNodesNum);
            // const data = await createNeuroDAOContract({
            //     args: [props.appState.DAOName, props.appState.DAODescription, props.appState.TokenName, props.appState.TokenSymbol, props.appState.network.arrLayers.length, props.appState.network.arrLayers[0].numNodes, hiddenNodesNum, props.appState.network.arrLayers[props.appState.network.arrLayers.length - 1].numNodes, props.appState.responsibilityOverlap]
            // });
            // console.info("contract call successs", data);
            
            props.appState.doPrompt({ description: 'Your DAO has been created!', status: 'success' });
        } catch (err) {
            console.error("contract call failure", err);
            props.appState.doPrompt({ description: 'DAO Creation failed', status: 'error' });
        }
        setIsLoading(false)
    }



    return (
        <Box>
            <Box mb="1rem" />
            <Text fontWeight={'semibold'}>{`Nodes of Input Layer: ${props.appState.network.arrLayers[0].numNodes} (Who responsible for Information Collection and Verification)`}</Text>
            <Box mb="1rem" />
            <Text fontWeight={'semibold'}>{`Nodes of Hidden Layer: ${props.appState.network.arrLayers.slice(1, -1).reduce((acc, layer) => {
                return parseInt(parseInt(acc) + parseInt(layer.numNodes));
            }, 0)} (Who responsible for Information Processing and Analyzing)`}</Text>
                        <Box mb="1rem" />
            <Text fontWeight={'semibold'}>{`Nodes of Output Layer: ${props.appState.network.arrLayers[props.appState.network.arrLayers.length - 1].numNodes} (Who responsible for Final Investment Decision Making)`}</Text>
            <Box mb="1rem" />
            <Text fontWeight={'semibold'}>{`Total Decisional Nodes Positions: ${props.appState.network.arrLayers.reduce((acc, layer) => {
                return parseInt(parseInt(acc) + parseInt(layer.numNodes));
            }, 0)}`}</Text>
            <Box mb="1rem" />
            <Button backgroundColor={'green.400'} onClick={callCreateDAO} isLoading={isLoading}>
                Create DAO
            </Button>
        </Box>
    );
}

export default ConfirmPanel;