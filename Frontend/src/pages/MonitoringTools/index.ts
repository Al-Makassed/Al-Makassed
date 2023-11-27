import routeHOC from "src/routes/routeHOC";
import MonitoringTools from "./MonitoringTools";

const withRouteHoC = routeHOC({
  title: "Monitoring Tools",
  pageAccessName: "MonitoringTools",
});

export default withRouteHoC(MonitoringTools);
