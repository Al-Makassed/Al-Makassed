import routeHOC from "src/routes/routeHOC";
import Approval from "./Approval";

const withRouteHoC = routeHOC({
  title: "Requests Approval",
  pageAccessName: "Requests Approval",
});

export default withRouteHoC(Approval);
