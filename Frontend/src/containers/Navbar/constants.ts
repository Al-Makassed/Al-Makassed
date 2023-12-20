import { NavbarPage } from "./types";

export const LANGUAGES = [
  { code: "en", name: "English", countryCode: "us" },
  { code: "ar", name: "العربية", countryCode: "sa", dir: "rtl" },
];

export const NAVBAR_PAGES: NavbarPage[] = [
  {
    name: "Policies and procedures",
    path: "/me/policies-and-procedures",
  },
  {
    name: "Approvel Requests",
    path: "/me/approvel-requests",
  },
  {
    name: "Monitoring Tools",
    path: "/me/monitoring-tools",
  },
];

export const SETTINGS = ["Logout"];
