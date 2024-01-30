import routeHOC from "src/routes/HOCs/routeHOC";
import MonitoringTools from "./MonitoringTools";

const withRouteHoC = routeHOC({
  title: "Monitoring Tools",
  pageAccessName: "MonitoringTools",
});

export default withRouteHoC(MonitoringTools);
