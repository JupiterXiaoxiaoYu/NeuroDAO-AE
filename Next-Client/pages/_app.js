import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext"
import { SSRProvider } from "react-bootstrap";
import { WalletProvider } from "../contexts/WalletProviderContext";

function MyApp({ Component, pageProps }) {
  return (
      <SSRProvider>
        <WalletProvider>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
        </WalletProvider>
      </SSRProvider>
  );
}

export default MyApp;
