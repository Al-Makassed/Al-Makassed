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
      roles: [["Focal Point"], ["Admin"]], // You can access this page if you have at least one of the roles
    },
  ],
  [
    "FocalPointTaskSubmission",
    {
      roles: [["Focal Point"]],
    },
  ],
  [
    "Page5",
    {
      roles: [["Focal Point", "Admin"]], // You must have both roles to access this page
    },
  ],
]);

export default pagesAccessRights;
