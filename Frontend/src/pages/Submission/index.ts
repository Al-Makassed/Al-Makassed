import routeHOC from "src/routes/routeHOC";
import Submission from "./Submission";

const withRouteHoC = routeHOC({
  title: "Submit Task",
  pageAccessName: "FocalPointTaskSubmission",
});

export default withRouteHoC(Submission);
