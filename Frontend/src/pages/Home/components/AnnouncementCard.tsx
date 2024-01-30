import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { formatDate } from "src/utils";
import Styles from "../styling.module.css";
import { getColor } from "../utils";
import { AnnouncementCardProps } from "../types";

const AnnouncementCard: FC<AnnouncementCardProps> = ({ announcement }) => {
  const { creatorFullName, creatorAvatarUrl, body, createdAt } = announcement;

  const createdAtDate = formatDate(createdAt);

  const color = getColor(creatorFullName);

  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 0.8,
        mb: 1,
        borderRadius: 4,
      }}
    >
      <Stack direction="row" alignItems="center" gap={1.2}>
        <Avatar
          src={creatorAvatarUrl}
          alt={creatorFullName}
          sx={{ bgcolor: color, width: 45, height: 45 }}
        />

        <Stack>
          <Typography variant="h6">{creatorFullName}</Typography>
          <Typography variant="caption" color="GrayText" mt={-0.25}>
            {createdAtDate}
          </Typography>
        </Stack>
      </Stack>

      <Box
        lineHeight={1.4}
        dangerouslySetInnerHTML={{ __html: body }}
        pb={1.6}
        px={1}
        pt={0}
        className={Styles.htmlText}
      />
    </Card>
  );
};

export default AnnouncementCard;
