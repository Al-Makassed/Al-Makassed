import { MouseEvent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "src/constants/localStorage";
import { logout, selectUser } from "src/features/user";
import useMediaQuery from "src/hooks/useMediaQuery";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import getAvatarAbbreviation from "src/utils/getAvatarAbbreviation";
import { TabValue } from "../types";

const useAccountMenu = () => {
  const dispatch = useAppDispatch();

  const { isMobile } = useMediaQuery();

  const [tabValue, setTabValue] = useState<TabValue>("profile");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const {
    userName,
    avatarUrl,
    fullName, // if fullName is empty, use userName
    roles,
  } = useAppSelector(selectUser);

  const userInitial = getAvatarAbbreviation(userName);

  const rolesStr = roles.join(", ");

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    dispatch(logout());
    navigate("/login");
  };

  const handleChangeTab = (_event: SyntheticEvent, newTabValue: TabValue) => {
    setTabValue(newTabValue);
  };

  return {
    isMobile,
    tabValue,
    setTabValue,
    anchorEl,
    open,
    userName,
    avatarUrl,
    fullName,
    roles,
    userInitial,
    rolesStr,
    handleClick,
    handleClose,
    handleLogOut,
    handleChangeTab,
  };
};

export default useAccountMenu;
