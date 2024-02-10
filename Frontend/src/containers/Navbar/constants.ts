import { Page } from "./types";

export const LANGUAGES = [
  { code: "en", name: "English", countryCode: "us" },
  { code: "ar", name: "العربية", countryCode: "sa", dir: "rtl" },
];

export const NAVBAR_PAGES: Page[] = [
  {
    name: "Policies and procedures",
    path: "/me/policies-and-procedures",
    managersOnly: false,
  },
  {
    name: "Monitoring Tools",
    path: "/me/monitoring-tools",
    managersOnly: false,
  },
];

export const SETTINGS = ["Logout"];

export const MANAGMENT_MENU_PAGES: Page[] = [
  {
    name: "Settings",
    path: "/me/settings",
    managersOnly: true,
  },
  {
    name: "Requests Approval",
    path: "/me/requests-approval",
    managersOnly: true,
  },
];

export const MOBILE_MENU_PAGES = [...NAVBAR_PAGES, ...MANAGMENT_MENU_PAGES];
