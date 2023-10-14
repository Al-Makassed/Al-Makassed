import React, { FC } from "react";
import Navbar from "./components/Navbar";
import LanguageBar from "./components/Languagebars";

const Header: FC = () => {
  return (
    <>
      <LanguageBar />
      <Navbar />
    </>
  );
};

export default Header;
