import React, { createContext, useState, useEffect } from 'react';
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';
import useAeternitySDK from '../hooks/useAeternitySDK';
import network from "../configs/network";
import NeuroDAOFactoryACI from '../pages/acis/NeuroDAOFactory.json'
import NeuroDAOACI from '../pages/acis/NeuroDAO.json'

export const WalletProviderContext = createContext();

export const WalletProvider = ({ children }) => {
const { aeSdk, address, networkId, connectToWallet } = useAeternitySDK();

const [walletInfo, setWalletInfo] = useState({address: 'loading...', balance: 'loading...', networkId: '...'});
// const [balance, setBalance] = useState('loading...');
const [factoryContract, setFactoryContract] = useState();
const [savedSDK, setSavedSDK] = useState();
const [readOnlyFactoryContract, setReadOnlyFactoryContract] = useState();
const [daoContract, setDaoContract] = useState();
const [readOnlyDaoContract, setReadOnlyDaoContract] = useState();
const [connetToWalletFirst, setConnectToWalletFirst] = useState();

useEffect(()=>{
  const initReadOnlyFactoryContract = async () => {
    const readOnlyFactory = await aeSdk.initializeContract({ aci:NeuroDAOFactoryACI, address: 'ct_2CDnNaKBMX2t3PtSmvjBXE95sPRNvsCi1xwZaASH7WYdeBkXrC'})
    setReadOnlyFactoryContract(readOnlyFactory)
}
console.log('initReadOnlyFactoryContract')
initReadOnlyFactoryContract()
},[])

const setReadOnlyDaoContractWithSDK = async (addr) =>{
    console.log(addr)
    const readOnlyDao = await aeSdk.initializeContract({ aci: NeuroDAOACI, address: addr})
    setReadOnlyDaoContract(readOnlyDao)
    return readOnlyDao
} 



  return (
    <WalletProviderContext.Provider value={{
      walletInfo: walletInfo, 
      setWalletInfo: setWalletInfo, 
      factoryContract: factoryContract,
      setFactoryContract: setFactoryContract,
      savedSDK: savedSDK,
      setSavedSDK: setSavedSDK,
      readOnlyFactoryContract: readOnlyFactoryContract,
      daoContract: daoContract,
      setDaoContract: setDaoContract,
      setReadOnlyDaoContract: setReadOnlyDaoContract,
      readOnlyDaoContract: readOnlyDaoContract,
      connetToWalletFirst: connetToWalletFirst,
      setConnectToWalletFirst: setConnectToWalletFirst,
      setReadOnlyDaoContractWithSDK: async (addr) => setReadOnlyDaoContractWithSDK(addr),
      }}>
      {children}
    </WalletProviderContext.Provider>
  );
};

export const useWalletProvider = () => React.useContext(WalletProviderContext);