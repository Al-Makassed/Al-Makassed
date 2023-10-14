import React, { FC } from "react";
import Navbar from "./Components/Navbar";
import LanguageBar from "./Components/LanguageBar";

const Header: FC = () => {
  return (
    <>
      <LanguageBar />
      <Navbar />
    </>
  );
};

export default Header;
