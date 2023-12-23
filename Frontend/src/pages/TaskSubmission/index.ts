import routeHOC from "src/routes/routeHOC";
import TaskSubmission from "./TaskSubmission";

const withRouteHoC = routeHOC({
  title: "Submit Task",
  pageAccessName: "TaskSubmissionForm",
});

export default withRouteHoC(TaskSubmission);
