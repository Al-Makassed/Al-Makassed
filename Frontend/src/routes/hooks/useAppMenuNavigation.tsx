// icons
import BookIcon from "@mui/icons-material/Book";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import HomeIcon from "@mui/icons-material/Home";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ScienceIcon from "@mui/icons-material/Science";
import TableViewIcon from "@mui/icons-material/TableView";
import DashboardIcon from "@mui/icons-material/Dashboard";

// project imports
import { useMemo } from "react";
import { selectIsManagerUser } from "src/features/user/selectors";
import { IAppMenuItem } from "src/routes/types";
import { useAppSelector } from "src/store/hooks";

const useAppMenuNavigation = () => {
  const isManagerUser = useAppSelector(selectIsManagerUser);

  const appMenuItems: IAppMenuItem[] = useMemo(
    () => [
      {
        label: "Landing",
        link: "/",
        Icon: () => <EmojiPeopleIcon />,
      },
      {
        label: "Home",
        link: "/me",
        Icon: () => <HomeIcon />,
      },
      {
        label: "Dashboard",
        link: "/me/dashboard",
        Icon: () => <DashboardIcon />,
      },
      {
        label: "Policies",
        Icon: () => <BookIcon />,
        items: [
          {
            label: "Policies",
            link: "/me/policies-and-procedures",
          },
        ],
      },
      {
        label: "Monitoring Tools",
        link: "/me/monitoring-tools",
        Icon: () => <MonitorHeartIcon />,
        useIsVisible: () => isManagerUser,
      },
      {
        label: "Test Playground",
        Icon: () => <ScienceIcon />,
        items: [
          {
            label: "Data Grid",
            Icon: () => <TableViewIcon />,
            items: [
              {
                label: "Paginated",
                link: "/data-grid-paginated",
              },
              {
                label: "Infinite Scroll",
                link: "/data-grid-infinite",
              },
            ],
          },
          {
            label: "Infinite Scroll",
            link: "/infinite-scroll",
            // Icon: () => <AllInclusiveIcon />,
          },
        ],
      },
    ],
    [],
  );

  return {
    appMenuItems,
  };
};

export default useAppMenuNavigation;
