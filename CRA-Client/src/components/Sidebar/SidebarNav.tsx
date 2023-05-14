import { Stack } from "@chakra-ui/react";
import { BiNetworkChart, BiBarChartAlt } from "react-icons/bi";
import {GiMicroscope, GiSpawnNode, GiReceiveMoney} from "react-icons/gi";
// import {VscGitPullRequestCreate} from "react-icons/vsc";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import {FaTasks} from "react-icons/fa";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import MyDAO from "../../pages/myDAO";
import Borrowing from "../../pages/borrowing";
import ExploreDAO from "../../pages/exploreDAO";
import CreateDAO from "../../pages/createDAO";
import Notifications from "../../pages/notifications";
import MyWeight from "../../pages/myWeight";
import Ranking from "../../pages/ranking";
import FAQPage from "../../pages/mechanism";
import DaoPage from "../../pages/daoPage";


// import {MdOutlinePrecisionManufacturing} from "react-icons/md";
// import {TbChartArrowsVertical} from "react-icons/tb";

export const routes = [
  {
    path: "/myDAO",
    sidebar: () => <div>home!</div>,
    main: () => <MyDAO/>
  },
  {
    path: "/exploreDAO",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <ExploreDAO/>
  },
  {
    path: "/",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <ExploreDAO/>
  },
  {
    path: "/createDAO",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <CreateDAO/>
  },
  {
    path: "/notifications",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <Notifications/>
  },
  {
    path: "/myWeight",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <MyWeight/>
  },
  {
    path: "/ranking",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <Ranking/>
  },
  {
    path: "/borrowing",
    sidebar: () => <div>home!</div>,
    main: () => <Borrowing/>
  },
  {
    path: "/mechanism",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <FAQPage/>
  },
  {
    path: "/daoPage/:id",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <DaoPage/>
  },
];

export function SidebarNav() {
  return (

    <Stack spacing="12" align="flex-start" >
      <NavSection title="DAO">
        <NavLink icon={BiNetworkChart} href="/myDAO">My DAOs</NavLink>
        <NavLink icon={GiMicroscope} href="/exploreDAO">Explore DAO</NavLink>
        <NavLink icon={GiMicroscope} href="/createDAO">Create DAO</NavLink>
        <NavLink icon={FaTasks} href="/notifications">Notifications</NavLink>
      </NavSection>

      <NavSection title="Reputation (Coming soon)">
        <NavLink icon={GiSpawnNode} href="/myWeight">My Reputation</NavLink>
        <NavLink icon={BiBarChartAlt} href="/ranking">Member Ranking</NavLink>
        <NavLink icon={GiReceiveMoney} href="/borrowing">Credit Borrowing</NavLink>
      </NavSection>

      <NavSection title="FAQ">
        <NavLink icon={GiMicroscope} href="/mechanism">Mechanism</NavLink>
        {/* <NavLink icon={TbChartArrowsVertical} href="/increaseWeight">Increase Your Weight</NavLink> */}
      </NavSection>
    
    </Stack>

  )
}
