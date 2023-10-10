import { FC } from "react"
import Navbar from "./Components/Navbar"
import Languagebar from "./Components/Languagebar"




const Header: FC = () => {
  return (
    <>
    <Languagebar />
    <Navbar />
    </>
  )
}

export default Header