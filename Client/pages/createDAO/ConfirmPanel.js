import React, { Component, useState } from "react";
import { Box, Divider, Flex, Heading, SimpleGrid, VStack, Text, Button } from "@chakra-ui/react";
import useAeternitySDK from '../../hooks/useAeternitySDK';
import NeuroDAOFactoryACI from '../acis/NeuroDAOFactory.json'

const ConfirmPanel = (props) => {
    const { aeSdk, address, networkId } = useAeternitySDK();
    
    // handleEpochChange(event) {
    //     props.appState.doSetEpochs(event.target.value)
    // }

    // handleBatchChange(event) {
    //     props.appState.doSetBatchSize(event.target.value)
    // }
    // console.log('=====', props.appState)
    const [alertState, setAlertState] = useState('success');
    const isLoading = false;


    const callCreateDAO = async () => {
        try {
            console.log(aeSdk)
            const contract = await aeSdk.initializeContract({ aci:NeuroDAOFactoryACI, address: 'ct_2CDnNaKBMX2t3PtSmvjBXE95sPRNvsCi1xwZaASH7WYdeBkXrC'})
            const ct = await contract.init();
            contractAddress = ct.address.replace('ct_', 'ak_')
            const set = await contract.getAlldaoData({ onAccount: utils.getDefaultAccounts()[0] });
            console.log(set.decodedResult)
            // const addr = await contract.getTemplateDAOTokenAddress({ onAccount: utils.getDefaultAccounts()[0] });
            daoAddressResult = await contract.createDAOContract('name', 'des', 'tok', 'tok', contractAddress, 3, 3, 3, 3, true, { onAccount: utils.getDefaultAccounts()[0]});
            console.log(daoAddressResult.decodedResult)
            daoInfo = await contract.getdaoData(daoAddressResult.decodedResult, { onAccount: utils.getDefaultAccounts()[0] });
            console.log(daoInfo.decodedResult)


            // const hiddenNodesNum = props.appState.network.arrLayers.slice(1, -1).reduce((acc, layer) => {
            //     return parseInt(parseInt(acc) + parseInt(layer.numNodes))
            // }, 0);
            // // console.log({
            // //     args: [props.appState.DAOName, props.appState.DAODescription, props.appState.TokenName, props.appState.TokenSymbol, props.appState.network.arrLayers.length, props.appState.network.arrLayers[0].numNodes, hiddenNodesNum, props.appState.network.arrLayers[props.appState.network.arrLayers.length - 1].numNodes, props.appState.responsibilityOverlap]
            // // })
            // console.log(hiddenNodesNum);
            // const data = await createNeuroDAOContract({
            //     args: [props.appState.DAOName, props.appState.DAODescription, props.appState.TokenName, props.appState.TokenSymbol, props.appState.network.arrLayers.length, props.appState.network.arrLayers[0].numNodes, hiddenNodesNum, props.appState.network.arrLayers[props.appState.network.arrLayers.length - 1].numNodes, props.appState.responsibilityOverlap]
            // });
            console.info("contract call successs", data);
            props.appState.doPrompt({ description: 'Your DAO has been created!', status: 'success' });
        } catch (err) {
            console.error("contract call failure", err);
            props.appState.doPrompt({ description: 'DAO Creation failed', status: 'error' });
        }
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
            <Button backgroundColor={'green.400'} onClick={callCreateDAO} disabled={isLoading}>
                Create DAO
            </Button>
        </Box>
    );
}

export default ConfirmPanel;