import { ListItemBaseProps } from "@mui/material";
import { ItemWrapperProps } from "./MenuItemWrapper";

export interface StyledMenuItemProps extends ItemWrapperProps {
  isChild?: boolean;
}

export interface StyledListItemButtonProps extends ListItemBaseProps {
  isChild?: boolean;
  hasIcon?: boolean;
  /** true if the item is a parent with a selected child */
  hasSelectedChild?: boolean;
}

export interface StyledListItemTextProps {
  isChild?: boolean;
  hasIcon?: boolean;
}
