import { ReactElement } from "react";
import { PageAccessName } from "src/types";

export interface IAppMenuItem {
  label: string;
  link?: string;
  Icon?: () => ReactElement;
  items?: IAppMenuItem[];
  useIsVisible?: () => boolean;
}

export interface RouteConfigs {
  title: string;
  pageAccessName?: PageAccessName;
}
