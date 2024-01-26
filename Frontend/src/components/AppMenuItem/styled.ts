import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuItemWrapper from "./MenuItemWrapper";
import {
  StyledMenuItemProps,
  StyledListItemButtonProps,
  StyledListItemTextProps,
} from "./types";

const customInset = {
  paddingLeft: "41px !important",
};

export const StyledMenuItem = styled(MenuItemWrapper, {
  name: "StyledMenuItem",
  shouldForwardProp: (prop) => prop !== "isChild",
})<StyledMenuItemProps>(({ theme, isChild }) => ({
  ...(isChild && {
    "&::before": {
      content: '""',
      borderLeft: `3px solid ${theme.palette.appMenu.menuItemLeftBorder}`,
      position: "absolute",
      height: "100%",
      left: "25px",
    },
  }),
}));

export const StyledListItemButton = styled(ListItemButton, {
  name: "StyledListItemButton",
  shouldForwardProp: (prop) =>
    !["hasSelectedChild", "isChild", "hasIcon"].includes(prop.toString()),
})<StyledListItemButtonProps>(
  ({ theme, hasSelectedChild, isChild, hasIcon, selected }) => ({
    borderRadius: `${theme.shape.borderRadius}px !important`,
    "& svg:last-of-type": {
      margin: "0 !important",
    },
    "& .MuiListItemIcon-selected": {
      background: `${theme.palette.appMenu.menuItemSelectedBackground} !important`,
      color: theme.palette.appMenu.menuItemSelectedColor,
      "& .MuiListItemIcon-root, & .MuiListItemText-root": {
        color: `${theme.palette.appMenu.menuItemSelectedColor} !important`,
      },
      "& span": {
        fontWeight: 500,
      },
    },
    ...(selected && {
      "& .MuiListItemIcon-root, & .MuiListItemText-root": {
        color: theme.palette.primary.light,
      },
    }),
    ...(hasSelectedChild && {
      "& .MuiListItemIcon-root, & .MuiListItemText-root": {
        color: `${theme.palette.appMenu.menuItemSelectedColor} !important`,
      },
      "& span": {
        fontWeight: 500,
      },
      "& svg": {
        color: `${theme.palette.appMenu.menuItemSelectedColor} !important`,
      },
    }),
    ...(selected &&
      isChild && {
        "&::before": {
          content: '""',
          borderLeft: `3px solid ${theme.palette.appMenu.menuItemSelectedColor}`,
          position: "absolute",
          height: "100%",
          left: "25px",
        },
      }),
    ...(isChild &&
      hasIcon && {
        ...customInset,
      }),
  }),
);

export const StyledListItemIcon = styled(ListItemIcon, {
  name: "StyledListItemIcon",
})(({ theme }) => ({
  minWidth: "35px !important",
  color: theme.palette.grey[500],
}));

export const StyledListItemText = styled(ListItemText, {
  name: "StyledListItemText",
})<StyledListItemTextProps>(({ theme, isChild, hasIcon }) => ({
  color: theme.palette.grey[500],
  "& span": {
    fontSize: "12px",
    fontWeight: 400,
    letterSpacing: "0.4px",
  },
  ...(!hasIcon &&
    !isChild && {
      paddingLeft: "35px",
    }),
  ...(!hasIcon &&
    isChild && {
      paddingLeft: "60px",
    }),
}));
