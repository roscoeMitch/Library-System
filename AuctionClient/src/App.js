import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/login/NavBar";
import { UserAuth } from "./context/AuctionFunctions";
import { AuctionBody } from "./components/auctions/AuctionBody";
import "@fontsource/ubuntu";

export const App = () => {
  return (
    <UserAuth>
      <NavBar />
      <AuctionBody />
    </UserAuth>
  );
};

export default App;
