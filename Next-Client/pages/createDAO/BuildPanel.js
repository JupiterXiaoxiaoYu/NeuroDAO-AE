import React, { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
// import Button from 'react-bootstrap/Button'
import { Form } from "react-bootstrap";
import { Box, Divider, Flex, Heading, SimpleGrid, VStack, Button, Text } from "@chakra-ui/react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Input,
    InputGroup,
    InputLeftAddon
} from '@chakra-ui/react'

class BuildPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 13,
            input: 12,
            value: 0,
            setValue: 0,
            currentActivation: "<select a layer>",
            currentInit: "<select a layer>",
            activations: [
                "linear", "relu"
            ],
            inits: [
                "uniform"
            ],
            currentOpti: "SGD",
            optimizers: [
                "SGD"
            ],
            losses: [
                "Mean Squared Error"
            ],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleLearningRateChange = this.handleLearningRateChange.bind(this);
        this.handleChangeDAOName = this.handleChangeDAOName.bind(this)
        this.handleChangeTokenName = this.handleChangeTokenName.bind(this)
        this.handleChangeTokenSymbol = this.handleChangeTokenSymbol.bind(this)
        this.handleChangeDAODescription = this.handleChangeDAODescription.bind(this)
    }

    handleChange(event) {
        // this.props.appState.selectedLayer
        this.props.appState.doSetNumNodes(this.props.appState.selectedLayer, event.target.value);
        this.props.appState.hideModelPanel();
    }

    handleLearningRateChange(event) {
        // this.setState({ unitSliderValue: event.target.value });
        // this.props.appState.selectedLayer
        this.props.appState.doSetLearnRate(event.target.value)

    }

    handleClick(event) {
        this.props.appState.doSetResponsibilityOverlap();
        // alert(this.props.appState.network.learningRateDecay);
    }

    getActivation(selectedLayer) {
        if (selectedLayer) return selectedLayer.activation;
        else return "";
    }

    getInit(selectedLayer) {
        if (selectedLayer) return selectedLayer.weightInit;
        else return "";
    }

    handleChangeDAOName(event){
        this.props.appState.doSetDAOName(event.target.value)
    }
    handleChangeTokenName(event){
        this.props.appState.doSetTokenName(event.target.value)
    }
    handleChangeTokenSymbol(event){
        this.props.appState.doSetTokenSymbol(event.target.value)
    }
    handleChangeDAODescription(event){
        this.props.appState.doSetDAODescription(event.target.value)
    }


    render() {
        const selectedLayer = this.props.appState.network.arrLayers[this.props.appState.selectedLayer];
        console.log('?????',this.props)
        return (
            <Box>
                <Box mb="1rem" />
                <InputGroup size='sm' mb={2}>
                    <InputLeftAddon textColor={'black'} >DAO Name</InputLeftAddon>
                    <Input
                        value={this.props.appState.DAOName}
                        onChange={this.handleChangeDAOName}
                        placeholder='Please enter your DAO name'

                    />
                </InputGroup>
                <InputGroup size='sm' mb={2}>
                    <InputLeftAddon textColor={'black'} >DAO Description</InputLeftAddon>
                    <Input
                        value={this.props.appState.DAODescription}
                        onChange={this.handleChangeDAODescription}
                        placeholder='Please enter your DAO description'

                    />
                </InputGroup>
                <InputGroup size='sm' mb={2}>
                    <InputLeftAddon textColor={'black'} >Token Name</InputLeftAddon>
                    <Input
                        value={this.props.appState.TokenName}
                        onChange={this.handleChangeTokenName}
                        placeholder='Please enter your Token name'

                    />
                </InputGroup>
                <InputGroup size='sm' mb={2}>
                    <InputLeftAddon textColor={'black'} >Token Symbol</InputLeftAddon>
                    <Input
                        value={this.props.appState.TokenSymbol}
                        onChange={this.handleChangeTokenSymbol}
                        placeholder= 'Please enter your Token symbol'

                    />
                </InputGroup>
                <Box mb="1rem" />
                <Text fontWeight={'bold'}>Modify Architecture and Paramters of the DAO:</Text>
                <Box mb="1rem" />
                <Form>
                    <Form.Group controlId="formBasicRange">
                        <Form.Label>Node Count: {selectedLayer.numNodes}</Form.Label>
                        <Form.Control type="range"
                            onChange={this.handleChange}
                            min="1"
                            max="10"
                            value={selectedLayer.numNodes} />
                    </Form.Group>
                </Form>
                <Box mb="1rem" />
                <Menu>
                    <MenuButton
                        px={4}
                        py={2}
                        transition='all 0.2s'
                        borderRadius='md'
                        borderWidth='1px'
                        _hover={{ bg: 'gray.400' }}
                        _expanded={{ bg: 'blue.400' }}
                        _focus={{ boxShadow: 'outline' }}
                    >
                        Activation Function: <i>{this.getActivation(selectedLayer)}</i> (Coming Soon)
                    </MenuButton>
                    <MenuList color={'black'}>
                        {this.state.activations.map(activation => {
                            return (
                                <MenuItem as="button" key={activation}
                                    onClick={() => {
                                        this.setState({ currentActivation: activation });
                                        this.props.appState.doSetActivation(this.props.appState.selectedLayer, activation);
                                    }}
                                >{activation}</MenuItem>
                            )
                        })}
                    </MenuList>
                </Menu>
                <Box mb="1rem" />
                <Menu>
                    <MenuButton
                        px={4}
                        py={2}
                        transition='all 0.2s'
                        borderRadius='md'
                        borderWidth='1px'
                        _hover={{ bg: 'gray.400' }}
                        _expanded={{ bg: 'blue.400' }}
                        _focus={{ boxShadow: 'outline' }}
                    >
                        Weight Initializer: <i>{this.getInit(selectedLayer)}</i> (Coming Soon)
                    </MenuButton>
                    <MenuList color={'black'}>
                        {this.state.inits.map(init => {
                            return (
                                <MenuItem as="button" key={init}
                                    onClick={() => {
                                        this.setState({ currentInit: init });
                                        this.props.appState.doSetWeightInit(this.props.appState.selectedLayer, init);
                                    }}>{init}</MenuItem>
                            )
                        })
                        }
                    </MenuList>
                </Menu>

                <Box mb="1rem" />
                <Menu>
                    <MenuButton
                        px={4}
                        py={2}
                        transition='all 0.2s'
                        borderRadius='md'
                        borderWidth='1px'
                        _hover={{ bg: 'gray.400' }}
                        _expanded={{ bg: 'blue.400' }}
                        _focus={{ boxShadow: 'outline' }}
                    >
                        Optimizer: <i>{this.state.currentOpti}</i> (Coming Soon)
                    </MenuButton>
                    <MenuList color={'black'}>
                        {this.state.optimizers.map(opti => {
                            return (
                                <MenuItem as="button" key={opti}
                                    onClick={() => {
                                        this.setState({ currentOpti: opti });
                                        this.props.appState.doSetOptimizer(opti);
                                    }}
                                >{opti}</MenuItem>
                            )
                        })}
                    </MenuList>
                </Menu>
                <Box mb="1rem" />

                <Menu>
                    <MenuButton
                        px={4}
                        py={2}
                        transition='all 0.2s'
                        borderRadius='md'
                        borderWidth='1px'
                        _hover={{ bg: 'gray.400' }}
                        _expanded={{ bg: 'blue.400' }}
                        _focus={{ boxShadow: 'outline' }}
                    >
                        Loss Function: <i>{this.props.appState.network.loss}</i> (Coming Soon)
                    </MenuButton>
                    <MenuList color={'black'}>
                        {this.state.losses.map(loss => {
                            return (
                                <MenuItem as="button" key={loss}
                                    onClick={() => {
                                        // this.setState({currentOpti: loss});
                                        this.props.appState.doSetLoss(loss);
                                    }}
                                >{loss}</MenuItem>
                            )
                        })}
                    </MenuList>
                </Menu>

                <Box mb="1rem" />
                <Form>
                    <Form.Group controlId="formBasicRange">
                        <Form.Label>Learning rate of the network: {this.props.appState.network.learnRate}</Form.Label> (Coming Soon)
                        <Form.Control type="range"
                            onChange={this.handleLearningRateChange}
                            max="0.1"
                            step="0.01"
                            value={this.props.appState.network.learnRate} />
                    </Form.Group>
                </Form>

                <Form>
                    <Form.Check
                        type={'checkbox'}
                        label={`Responsibility Overlap (Whether users could take on multiple roles)`}
                        onChange={this.handleClick}
                        checked={this.props.appState.responsivilityOverlap}
                    />
                </Form>


            </Box>
        );
    }
}


export default BuildPanel;
