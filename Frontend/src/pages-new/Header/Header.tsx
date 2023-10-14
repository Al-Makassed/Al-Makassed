import React, { FC } from "react";
import Navbar from "./components/Navbar";
import LanguageBar from "./components/LanguageBar";

const Header: FC = () => {
  return (
    <>
      <LanguageBar />
      <Navbar />
    </>
  );
};

export default Header;
