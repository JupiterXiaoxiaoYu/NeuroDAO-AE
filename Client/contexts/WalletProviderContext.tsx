import React, { createContext, useState, useEffect } from 'react';
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';
import useAeternitySDK from '../hooks/useAeternitySDK';
import network from "../configs/network";

export const WalletProviderContext = createContext();

export const WalletProvider = ({ children }) => {


const [walletInfo, setWalletInfo] = useState({address: 'loading...', balance: 'loading...', networkId: '...'});
// const [balance, setBalance] = useState('loading...');




  return (
    <WalletProviderContext.Provider value={[walletInfo, setWalletInfo]}>
      {children}
    </WalletProviderContext.Provider>
  );
};

export const useWalletProvider = () => React.useContext(WalletProviderContext);