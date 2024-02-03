import { ENV_TO_API_URL_MAP } from "src/constants/environment";

export const isStagingServer = () => import.meta.env.VITE_ENV === "staging";

export const isProductionServer = () =>
  import.meta.env.VITE_ENV === "production";

export const getEnvironment = () =>
  import.meta.env.VITE_ENV as keyof typeof ENV_TO_API_URL_MAP;

export const getApiUrl = () =>
  ENV_TO_API_URL_MAP[getEnvironment() ?? "staging"];
