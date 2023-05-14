import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useWalletProvider } from "../../contexts/WalletProviderContext";
import NeuroDAOACI from "../acis/NeuroDAO.json"

function SwapUI({ appState }) {
    const [inputToken, setInputToken] = useState("$AE");
    const [outputToken, setOutputToken] = useState("DAO");
    const [inputTokenAmount, setInputTokenAmount] = useState(0);
    const [outputTokenAmount, setOutputTokenAmount] = useState(0);
    const [DAOtokenBalance, setDAOtokenBalance] = useState(0);
    // console.log(appState)
    const { walletInfo, savedSDK, setWalletInfo } = useWalletProvider()
    const [isLoading, setIsLoading] = useState(false)
    async function handleSwapTokens() {
        // TODO: Swap tokens

        try {
            if (!savedSDK) {
                appState.doPrompt({ description: 'Please connect to wallet first', status: 'error' })
                return
            }
            setIsLoading(true)
            const aeSdk = savedSDK;
            console.log(aeSdk)
            if (inputToken === "$AE") {
                if (!appState.contract) {
                    const contract = await aeSdk.initializeContract({ aci: NeuroDAOACI, address: appState.contractAddress.replace('ak_', 'ct_') });
                    appState.doSetContract(contract)
                    const data = await contract.stakeToGetDAOToken({ amount: inputTokenAmount, denomination: 'ae' })
                    console.log(data.decodedResult)
                } else {
                    const data = await appState.contract.stakeToGetDAOToken({ amount: inputTokenAmount, denomination: 'ae' })
                    console.log(data.decodedResult)
                }
            } else {
                if (!appState.contract) {
                    const contract = await aeSdk.initializeContract({ aci: NeuroDAOACI, address: appState.contractAddress.replace('ak_', 'ct_') });
                    appState.doSetContract(contract)
                    const data = await contract.burnToGetBackFund(inputTokenAmount * 10**16)
                    console.log(data.decodedResult)
                } else {
                    const data = await appState.contract.burnToGetBackFund(inputTokenAmount * 10**16)
                    console.log(data.decodedResult)
                }


            }
            const _balance = await aeSdk.getBalance(walletInfo.address, { format: "ae" });
            setWalletInfo({ ...walletInfo, balance: _balance });
            // contractAddress = ct.address.replace('ct_', 'ak_')
            setIsLoading(false)
            console.info("contract call successs");
            appState.doPrompt({ description: 'Your has sucessfully get DAO token!', status: 'success' });
        } catch (err) {
            const _balance = await savedSDK.getBalance(walletInfo.address, { format: "ae" });
            setWalletInfo({ ...walletInfo, balance: _balance });
            console.error("contract call failure", err);
            appState.doPrompt({ description: err.toString(), status: 'error' });
            setIsLoading(false)
        }
    }

    function handleTokenSwap() {
        const temp = inputToken;
        setInputToken(outputToken);
        setOutputToken(temp);
        setOutputTokenAmount(inputTokenAmount / 100);
    }

    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={6}>
            <FormControl>
                <FormLabel>Input {inputToken} Token Amount</FormLabel>
                <InputGroup>
                    <Input placeholder={`Enter ${inputToken} amount`} onChange={(event) => {
                        setInputTokenAmount(event.target.value); if (inputToken === '$AE') {
                            setOutputTokenAmount(event.target.value * 100);
                        } else {
                            setOutputTokenAmount(event.target.value / 100);
                        }
                    }} />
                    <InputRightElement ><Box as="span" px="2" onClick={handleTokenSwap} cursor="pointer" _disabled={isLoading}>&#8646;</Box></InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Output {outputToken} Token Amount</FormLabel>
                <InputGroup>
                    <Input placeholder={outputTokenAmount} disabled={true} _highlighted={true} />
                </InputGroup>
            </FormControl>
            <Button colorScheme="blue" mt={8} onClick={handleSwapTokens} isLoading={isLoading}>
                {inputToken === "$AE" ? "Stake AE to Obtain DAO Token" : "Burn DAO Token to Redeem $AE"}
            </Button>
        </Box>
    );
}

export default SwapUI;
