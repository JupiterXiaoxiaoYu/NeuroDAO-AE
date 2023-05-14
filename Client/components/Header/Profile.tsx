import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { AvatarGenerator } from 'random-avatar-generator';
const generator = new AvatarGenerator();
import { useWalletProvider } from '../../contexts/WalletProviderContext';
import React, { useContext } from 'react';
import ConnectWalletButton from "./ConnectWalletButton";

export const Profile = () => {
  const {walletInfo, setWalletInfo} = useWalletProvider();
  const { address, balance, networkId } = walletInfo;
  // const address = walletInfo.address;
  // const balance = walletInfo.balance;
  // const networkId = walletInfo.networkId;
  // console.log(walletInfo)
  const imgurl = generator.generateRandomAvatar(address);
  return (
    <Flex align="center">
      {(address === 'loading...' || !address) ? <ConnectWalletButton /> : (
        <Flex flexDir={'row'}>
          <Box mr="4" textAlign="right">
            <Text>{address}</Text>
            <Box flexDirection={'row'}>
              <Text color="gray.300" fontSize="small">
                Balance: {balance}
              </Text>
              <Text color="gray.300" fontSize="small">
                Network: {networkId}
              </Text>
            </Box>
          </Box>
          <Avatar size="md" name="Eduardo Ferronato" src={imgurl} />      
        </Flex>
      )
      }
    </Flex>
  )
}
