// MUI
import {
  Avatar,
  Box,
  Button,
  CardContent,
  Grid,
  IconButton,
  Menu,
  Stack,
  Tooltip,
  Typography,
  Tab,
} from "@mui/material";

import { TabContext, TabList, TabPanel } from "@mui/lab";

// icons
import UserIcon from "@mui/icons-material/Face";
import LogoutIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsIcon from "@mui/icons-material/Settings";

// project imports
import { FC, useEffect } from "react";
import UserAvatar from "src/components/UserAvatar";
import { AccountMenuContext } from "./context/AccountMenuContext";
import ProfileTab from "./ProfileTab";
import SettingsTab from "./SettingsTab";
import useAccountMenu from "./hooks/useAccountMenu";
import { menuSlotProps, tabSx, a11yProps } from "./styles";
import styles from "./styles.module.css";
import { useLocation } from "react-router";

const AccountMenu: FC = () => {
  const {
    anchorEl,
    open,
    tabValue,
    userName,
    avatarUrl,
    fullName,
    userInitial,
    rolesStr,
    isMobile,
    handleClick,
    handleClose,
    handleChangeTab,
    handleLogOut,
  } = useAccountMenu();

  const { pathname } = useLocation();

  // close menu on route change
  useEffect(() => {
    return () => {
      handleClose();
    };
  }, [pathname]);

  return (
    <AccountMenuContext.Provider
      value={{
        onClose: handleClose,
        onLogOut: handleLogOut,
      }}
    >
      <Tooltip title="Account settings">
        <Button
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          startIcon={<UserAvatar src={avatarUrl} initials={userInitial} />}
          sx={{
            textTransform: "none",
            color: (theme) => theme.palette.grey[50],
          }}
        >
          {!isMobile && userName}
        </Button>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        slotProps={menuSlotProps}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        // anchorPosition={}
      >
        <CardContent sx={{ width: "350px" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Avatar
                  alt="profile user"
                  src={avatarUrl}
                  sx={{ width: 32, height: 32 }}
                />
                <Stack>
                  <Typography variant="subtitle2">{fullName}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {rolesStr}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item>
              <Tooltip title="Logout">
                <IconButton size="large" onClick={handleLogOut}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>

        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", p: 0 }}>
            <TabList
              variant="fullWidth"
              onChange={handleChangeTab}
              aria-label="Account Menu Tabs"
            >
              <Tab
                sx={tabSx}
                label={
                  <Stack direction="row" gap={1} alignItems="center">
                    <UserIcon fontSize="small" />
                    <Typography variant="subtitle2">Profile</Typography>
                  </Stack>
                }
                value="profile"
                {...a11yProps(0)}
              />
              <Tab
                sx={tabSx}
                label={
                  <Stack direction="row" gap={1} alignItems="center">
                    <SettingsIcon fontSize="small" />
                    <Typography variant="subtitle2">Settings</Typography>
                  </Stack>
                }
                value="settings"
                {...a11yProps(1)}
              />
            </TabList>
          </Box>

          <TabPanel
            value="profile"
            classes={{
              root: styles.tabPanelRoot,
            }}
          >
            <ProfileTab />
          </TabPanel>

          <TabPanel
            value="settings"
            classes={{
              root: styles.tabPanelRoot,
            }}
          >
            <SettingsTab />
          </TabPanel>
        </TabContext>
      </Menu>
    </AccountMenuContext.Provider>
  );
};

export default AccountMenu;
