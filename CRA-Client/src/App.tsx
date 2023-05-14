import * as React from "react"
import "./styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "./styles/theme"
import { SidebarDrawerProvider } from "./contexts/SidebarDrawerContext"
import { SSRProvider } from "react-bootstrap";
import { WalletProvider } from "./contexts/WalletProviderContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Borrowing from "./pages/borrowing";
// import ExploreDAO from "./pages/exploreDAO";
// import CreateDAO from "./pages/createDAO";
// import Notifications from "./pages/notifications";
// import MyWeight from "./pages/myWeight";
// import Ranking from "./pages/ranking";
// import FAQPage from "./pages/mechanism";
import { routes } from "./components/Sidebar/SidebarNav";


export const App = () => (
  <SSRProvider>
  <WalletProvider>
  <ChakraProvider theme={theme}>
    <SidebarDrawerProvider>
    <Routes >
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                element={route.main()}
              />
            ))}
        </Routes >
    </SidebarDrawerProvider>
  </ChakraProvider>
  </WalletProvider>
</SSRProvider>
)
