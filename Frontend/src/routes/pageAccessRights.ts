import { PageAccessRight, PageAccessName } from "./types";

const pagesAccessRights = new Map<PageAccessName, PageAccessRight>([
  [
    "Home",
    {
      roles: [["Focal Point"]],
    },
  ],
  [
    "Dashboard",
    {
      roles: [["Admin"]],
    },
  ],
  [
    "Page3",
    {
      roles: [["Focal Point"], ["Admin"]], // You can access this page if you have at least one of the roles
    },
  ],
  [
    "Page4",
    {
      roles: [["Focal Point", "Admin"]], // You must have both roles to access this page
    },
  ],
]);

export default pagesAccessRights;
