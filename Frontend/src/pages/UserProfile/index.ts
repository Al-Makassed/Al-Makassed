import routeHOC from "src/routes/HOCs/routeHOC";
import UserProfile from "./UserProfile";

const withRouteHoC = routeHOC({
  title: "Profile",
  pageAccessName: "UserProfile",
});

export default withRouteHoC(UserProfile);
