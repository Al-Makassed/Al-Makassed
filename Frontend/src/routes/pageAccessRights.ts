import { PageAccessRight, PageAccessName } from "./types";

const pagesAccessRights = new Map<PageAccessName, PageAccessRight>([
  [
    "Home",
    {
      roles: [["Admin"], ["Focal Point"]],
    },
  ],
  [
    "Dashboard",
    {
      roles: [["Admin"]],
    },
  ],
  [
    "MonitoringTools",
    {
      roles: [["Focal Point"], ["Sub-Admin"], ["Admin"]], // You can access this page if you have at least one of the roles
    },
  ],
  [
    "TaskSubmissionForm",
    {
      roles: [["Focal Point"]],
    },
  ],
  [
    "Requests Approval",
    {
      roles: [["Admin"]],
    },
  ],
  [
    "PoliciesAndProceduresWithProvider",
    {
      roles: [["Focal Point"], ["Sub-Admin"], ["Admin"], ["Staff"]],
    },
  ],
]);

export default pagesAccessRights;
