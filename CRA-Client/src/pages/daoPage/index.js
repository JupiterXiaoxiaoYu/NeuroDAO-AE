import React, { Component, useEffect, useState } from 'react';
import JSide from "./JSide.js";
import { network, layer } from "../../panels/kerasCode.js";
import ModelPanel from "./ShowPanel.js"
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
//import {NetworkGraph} from "./ModelPanel.js"
import { Box, Divider, Flex, Alert, AlertIcon, AlertDescription, CloseButton, AlertTitle, useDisclosure } from "@chakra-ui/react";
import { useWalletProvider } from '../../contexts/WalletProviderContext';
import useAeternitySDK from '../../hooks/useAeternitySDK';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';

const DaoPage = () => {
    const { id } = useParams();
    console.log('sdasd',id)
    const { factoryContract, savedSDK, readOnlyFactoryContract, setReadOnlyDaoContractWithSDK, readOnlyDaoContract, walletInfo } = useWalletProvider()
    const { aeSDK } = useAeternitySDK()
    const [neuroData, setNeuroData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState({
        id: id,
        hiddenModelPanel: false,
        hideModelPanel: () => setState(prevState => ({ ...prevState, hiddenModelPanel: true })),
        unhideModelPanel: () => setState(prevState => ({ ...prevState, hiddenModelPanel: false })),
        network: new network(),
        selectedLayer: 0,
        selectedNode: 0,
        responsibilityOverlap: false,
        DAOName: '',
        TokenName: '',
        TokenSymbol: '',
        DAODescription: '',
        coloredLayer: undefined,
        coloredNode: undefined,
        promptStatus: 'success',
        propmtDescription: 'Your DAO has been created!',
        contractAddress: id,
        contract: undefined,
        readOnlyContract: undefined,
        tokenBalance: 0,
        doSetDAOName: new_name => setState(prevState => ({ ...prevState, DAOName: new_name })),
        doSetTokenName: new_name => setState(prevState => ({ ...prevState, TokenName: new_name })),
        doSetTokenSymbol: new_symbol => setState(prevState => ({ ...prevState, TokenSymbol: new_symbol })),
        doSetDAODescription: new_description => setState(prevState => ({ ...prevState, DAODescription: new_description })),
        doSetResponsibilityOverlap: () => setState(prevState => ({ ...prevState, responsibilityOverlap: !prevState.responsibilityOverlap })),
        doSelectLayer: selected_layer => doSelectLayer(selected_layer),
        doSelectNode: selected_node => doSelectNode(selected_node),
        doColorNode: hoverednode => doColorNode(hoverednode),
        doColorLayer: hoveredlayer => doColorLayer(hoveredlayer),
        doSetOptimizer: new_opt => doSetOptimizer(new_opt),
        doSetActivation: (layer, new_act) => doSetActivation(layer, new_act),
        doSetWeightInit: (layer, new_weight) => doSetWeightInit(layer, new_weight),
        doSetNumNodes: (layer, new_nodes) => doSetNumNodes(layer, new_nodes),
        doSetLearnRate: (new_learn) => doSetLearnRate(new_learn),
        doSetContract: (new_contract) => doSetContract(new_contract),
        // doSetEpochs: (new_epochs) => doSetEpochs(new_epochs),
        // doSetBatchSize: (new_batch) => doSetBatchSize(new_batch),
        doSetLoss: (new_loss) => doSetLoss(new_loss),
        // doSetLearningDecay: (new_decay) => doSetLearningDecay(new_decay),
        doPrompt: (state) => {setState(prevState => ({ ...prevState, promptStatus: state.status, propmtDescription:state.description })); onOpen()},
    });

    // useEffect(() => {
    //     setState({...state, id: id})
    // }, [])

    useEffect(()=>{
        const setContract = async () =>{
            console.log('hicontract')
            const readOnlyDAO = await setReadOnlyDaoContractWithSDK(id.toString().replace('ak_', 'ct_'))
            // console.log(readOnlyDAO)
            const data = await readOnlyDAO.getNeuralNetworkInfo()
            const neuro = data.decodedResult
            setNeuroData(data.decodedResult)
            console.log(neuro)
            let arrayLayers = []
            arrayLayers.push(new layer(Number(neuro.inputNodesNum), 'relu', false, true, 'uniform')) 
            arrayLayers.push(new layer(Number(neuro.hiddenNodesNum), 'relu', false, true, 'uniform')) 
            arrayLayers.push(new layer(Number(neuro.outputNodesNum), 'relu', false, true, 'uniform')) 
            console.log(arrayLayers)
            setState({...state, network: new network(arrayLayers), readOnlyContract: readOnlyDAO})
            state.hideModelPanel()
          }
          setContract()
    }, [id])


    useEffect(()=>{
        const updateDaoTokenBalance = async() =>{
            const daoTokenBalance = await state.readOnlyContract.getDAOTokenBalance(walletInfo.address)
            console.log('DAO Token Balance',Number(daoTokenBalance.decodedResult))
            setState({...state, tokenBalance: Number(daoTokenBalance.decodedResult)/10**18})
        }
        if(savedSDK){updateDaoTokenBalance()}

    }, [savedSDK])

    // useEffect(()=>{
    //     const fetchData = async () =>{
    //         console.log('hidata')
            
            
    //     }
    //     fetchData()
    // }, [readOnlyDaoContract])

    // const { data: contractAddressdata, isLoading: isContractAddressDataLoading, error } = useContractRead(contract, "contracts", [state.id?.toString()])

    // useEffect(() => {
    //     if(!isContractAddressDataLoading){
    //         setState({...state, contractAddress: contractAddressdata})
    //         console.log(contractAddressdata)
    //     }
    // }, [isContractAddressDataLoading])

    // useEffect(() => {
    //     async function getContract(){
    //     if(!isContractAddressDataLoading){
    //         const DAOContract = await sdk.getContract(
    //             contractAddressdata.toString(), // The address of your smart contract
    //             abi, // The ABI of your smart contract
    //         );
    //         const DAOtokenAddress = await DAOContract.call("DAOtokenAddress")
    //         const DAOtokenContract = await sdk.getContract(
    //             DAOtokenAddress, // The address of your smart contract
    //             abi1, // The ABI of your smart contract
    //         );
    //         const address = await sdk.wallet.getAddress();
    //         const balance = await DAOtokenContract.call("balanceOf", [address])
    //         setState({...state, contract: DAOContract, contractAddress: contractAddressdata.toString(), tokenBalance: balance.toNumber()})
    //     }
    // }
    // getContract()
    // }, [isContractAddressDataLoading])

    // const getTokenBalance = async () => {
    //     const DAOtokenAddress = await state.contract.call("DAOtokenAddress")
    //     const DAOtokenContract = await sdk.getContract(
    //         DAOtokenAddress, // The address of your smart contract
    //         abi1, // The ABI of your smart contract
    //     );
    //     const balance = await DAOtokenContract.call("balanceOf")
    //     return balance
    // }

    // const updateTokenBalance = async () => {
    //     const balance = await getTokenBalance()
    //     setState({...state, tokenBalance: balance.toNumber()})
    // }

    // const sdk = useSDK();

    // const { contract } = useContract("0x3BC8C4BAE74D5A0fc4a8E4494b73f46c2103cd12");
    // const { mutateAsync: joinDAOAsInput, isLoading } = useContractWrite(contract, "joinDAOAsInput")
    // // const [alertState, setAlertState] = useState('success');
    // console.log(appState)
    // const { data: contractAddressdata, isLoading: isContractAddressDataLoading, error } = useContractRead(contract, "contracts", [state.id.toString()])
    // console.log(contractAddressdata, isContractAddressDataLoading ,error)
    // const DAOContract = sdk.getContract(
    //     contractAddressdata, // The address of your smart contract
    //     abi, // The ABI of your smart contract
    // );


    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: false })

    const doSetLearningDecay = new_decay => {
        let new_network = new network();
        new_network.copy(state.network);
        new_network.setlearningRateDecay(new_decay);
        setState(prevState => {
            return {
                ...prevState,
                network: new_network
            }
        })
    }

    const doSetContract = new_contract => {
        setState(prevState => {
            return {
                ...prevState,
                contract: new_contract
            }
        })
    }

    const doSetLoss = new_loss => {
        let new_network = new network();
        new_network.copy(state.network);
        new_network.setLoss(new_loss);
        setState(prevState => {
            return {
                ...prevState,
                network: new_network
            }
        })
    }

    const doSelectLayer = selected_layer => {
        // console.log('seletcing');
        doColorLayer(selected_layer);

        setState(prevState => {
            // console.log(prevState.selectedLayer)
            return {
                ...prevState,
                selectedLayer: selected_layer
            }
        })
    }

    const doSelectNode = selected_node => {

        doColorNode(selected_node);

        setState(prevState => {
            return {
                ...prevState,
                selectedNode: selected_node
            }
        })
    }

    const doColorNode = colored_node => {
        setState(prevState => {
            return {
                ...prevState,
                coloredNode: colored_node
            }
        })
        hideModelPanel();
    }

    const doColorLayer = colored_layer => {
        setState(prevState => {
            return {
                ...prevState,
                coloredLayer: colored_layer
            }
        })
        hideModelPanel();
    }


    const doSetLearnRate = new_learn => {
        let new_network = new network();

        new_network.copy(state.network);
        new_network.setLearnRate(new_learn);
        setState(prevState => {
            return {
                ...prevState,
                network: new_network
            }
        })

    }

    const hideModelPanel = () => {
        setState(prevState => {
            return {
                ...prevState,
                hiddenModelPanel: true,
            }
        })
    }


    const doSetOptimizer = new_opt => {
        console.log("starting");
        // const network = state.network;
        // network.theoptimizer = "test";
        // state.network.reportContent();
        let new_network = new network();

        new_network.copy(state.network);
        new_network.setOptimizer(new_opt);
        // new_network.reportContent();
        setState(prevState => {
            return {
                ...prevState,
                network: new_network
            }
        })
        // console.log("after setting state");
        // state.network.reportContent();
        // console.log("finished");
    }
    /**
     * 
     * @param {*} layer numeric id of the layer
     * @param {*} new_act new activation function to be set
     */
    const doSetActivation = (layer, new_act) => {
        let new_network = new network();
        new_network.copy(state.network);

        new_network.arrLayers[layer].setActivation(new_act);
        setState(prevState => {
            return {
                ...prevState,
                network: new_network
            }
        })
    }

    const doSetWeightInit = (layer, new_weight) => {
        let new_network = new network();
        new_network.copy(state.network);

        new_network.arrLayers[layer].setWeightInit(new_weight);
        setState(prevState => {
            return {
                ...prevState,
                network: new_network
            }
        })
    }

    const doSetNumNodes = (layer, new_num) => {
        let new_network = new network();
        new_network.copy(state.network);

        new_network.arrLayers[layer].setNumNodes(new_num);
        setState(prevState => {
            return {
                ...prevState,
                network: new_network
            }
        })
    }




    return (
        <Flex direction="column" h="100vh">
            <Header />
            {isVisible && (
            <Alert status={state.promptStatus}>
                <AlertIcon />
                <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                    <AlertDescription color={'black'}>
                        {state.propmtDescription}
                    </AlertDescription>
                    <CloseButton
                    color={'black'}
                    onClick={onClose}
                />
                </Flex>
            </Alert>
            )}
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Flex class="wrapper" flex={1} h={'100%'}>
                    <ModelPanel appState={state} />
                    <JSide appState={state}></JSide>
                </Flex>
            </Flex>
        </Flex>
    );
}



export default DaoPage;



