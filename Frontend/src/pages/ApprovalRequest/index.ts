import routeHOC from "src/routes/HOCs/routeHOC";
import Approval from "./Approval";

const withRouteHoC = routeHOC({
  title: "Requests Approval",
  pageAccessName: "RequestsApproval",
});

export default withRouteHoC(Approval);
