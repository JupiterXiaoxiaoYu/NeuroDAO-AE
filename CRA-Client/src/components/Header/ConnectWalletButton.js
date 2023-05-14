import { Button } from '@chakra-ui/react';
import { useWalletProvider } from '../../contexts/WalletProviderContext';
import React, { createContext, useState, useEffect } from 'react';
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';
import useAeternitySDK from '../../hooks/useAeternitySDK';
import network from "../../configs/network";
import NeuroDAOFactoryACI from '../../pages/acis/NeuroDAOFactory.json'

const ConnectWalletButton = () => {
  const {setWalletInfo:setWalletInfo, setFactoryContract:setFactoryContract, setSavedSDK:setSavedSDK} = useWalletProvider();
  const { aeSdk, address, networkId, connectToWallet } = useAeternitySDK();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  // setConnectToWalletFirst(async ()=>{connectToAE()})
  
  const connect = async () => {
    setIsLoading(true);
    setMessage('Searching for Wallet ...');
    try {
      await connectToWallet();
      setMessage(undefined);
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    (async () => {
      console.log(address,networkId)
      if (networkId == null || address == null) return;

      if (networkId !== network.id) {
        console.log('networkId', networkId)
        setMessage(`Current network "${networkId}" is not supported. Please switch network in the wallet.`);
        return;
      }
      setMessage(undefined);


      const _balance = await aeSdk.getBalance(address, { format: "ae" });
      const factory = await aeSdk.initializeContract({ aci:NeuroDAOFactoryACI, address: 'ct_2CDnNaKBMX2t3PtSmvjBXE95sPRNvsCi1xwZaASH7WYdeBkXrC'})
      setFactoryContract(factory)
      setWalletInfo({ balance: _balance, address: address, networkId: networkId })
      console.log('balance', aeSdk)
      setSavedSDK(aeSdk)
      
    })();

  }, [address, aeSdk, networkId, setFactoryContract, setSavedSDK, setWalletInfo]);

  // useEffect(() => {
  //   console.log(balance)
    
  // }, [address, balance, networkId, setWalletInfo])

  const connectToAE = async () => {
    await connect()
  };

  return (
    <Button onClick={connectToAE} backgroundColor={'green.400'} isLoading={isLoading}>
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton;
