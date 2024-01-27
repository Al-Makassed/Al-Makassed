import { Box, Skeleton, Theme, useTheme } from "@mui/material";
import { FC } from "react";
import useGetAnnouncements from "../hooks/useGetAnnouncements";
import AnnouncementCard from "./AnnouncementCard";
import { selectIsManagerUser } from "src/features/user";
import { useAppSelector } from "src/store/hooks";

const AnnouncementsList: FC = () => {
  const { announcements, isFetching } = useGetAnnouncements();

  const theme = useTheme<Theme>();

  const isManager = useAppSelector(selectIsManagerUser);

  if (isFetching)
    return (
      <Skeleton
        variant="rounded"
        height="calc(100vh - 64px - 32px - 36.5px - 130.7px)"
      />
    );

  if (!announcements) return null;

  return (
    <Box
      style={{
        position: "relative",
      }}
    >
      <Box
        px={{ sm: 5 }}
        py={2}
        borderRadius={2.5}
        height={{
          md: `calc(100vh - 48px - 64px - 32px - 104px + ${
            !isManager ? "36.5px" : "0px"
          })`,
        }}
        sx={{
          overflowY: "auto",
          ...theme.mixins.niceScroll(),
        }}
      >
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </Box>
      <Box
        style={{
          position: "absolute",
          bottom: -1,
          left: 0,
          right: 0,
          height: "70px",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent 60%)",
          borderRadius: "50% 50% 0 0",
          zIndex: 1,
          backdropFilter: "blur(0.55px)",
        }}
      ></Box>
    </Box>
  );
};

export default AnnouncementsList;
