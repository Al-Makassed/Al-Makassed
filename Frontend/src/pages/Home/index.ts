import routeHOC from "src/routes/HOCs/routeHOC";
import Home from "./Home";
import { HomeProps } from "./types";

export default routeHOC<HomeProps>({
  title: "Home",
  // pageAccessName: "Home",
})(Home);
