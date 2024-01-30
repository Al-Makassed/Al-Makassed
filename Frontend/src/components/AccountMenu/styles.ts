import { MenuProps, SxProps, TabProps } from "@mui/material";

/* Show a top arrow ⬆️ on top of the menu */
export const arrowTop: SxProps = {
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};

export const menuSlotProps: MenuProps["slotProps"] = {
  paper: {
    elevation: 0,
    sx: {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      mt: 1.5,
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      ...arrowTop,
    },
  },
};

export const tabSx: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  textTransform: "capitalize",
};

export const a11yProps = (index: number): Partial<TabProps> => {
  return {
    id: `account-tab-${index}`,
    "aria-controls": `account-tabpanel-${index}`,
  };
};
