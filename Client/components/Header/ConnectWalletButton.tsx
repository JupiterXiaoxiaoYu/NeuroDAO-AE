import { Button } from '@chakra-ui/react';
import { useWalletProvider } from '../../contexts/WalletProviderContext';
import React, { createContext, useState, useEffect } from 'react';
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';
import useAeternitySDK from '../../hooks/useAeternitySDK';
import network from "../../configs/network";

const ConnectWalletButton = () => {
  const [walletInfo, setWalletInfo] = useWalletProvider();
  const { aeSdk, address, networkId, connectToWallet } = useAeternitySDK();

  const [balance, setBalance] = useState<string>('loading...');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>();

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
      setBalance(0);
      console.log('----',address)
      try{
        const _balance = await aeSdk.getBalance(address, { format: "ae" });
        setBalance(_balance);
      }catch(e){
        console.log(e)
      }
      // console.log('balance', _balance)
      
    })();

  }, [address, aeSdk, networkId]);

  useEffect(() => {
    console.log(balance)
    setWalletInfo({ balance: balance, address: address, networkId: networkId })
  }, [address, balance, networkId, setWalletInfo])

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
