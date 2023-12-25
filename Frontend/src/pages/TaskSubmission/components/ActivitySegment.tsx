import ArrowIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import UserAvatar from "src/components/UserAvatar";
import { formatDate } from "src/utils";
import getAvatarAbbreviation from "src/utils/getAvatarAbbreviation";
import { ActivitySegmentProps } from "../types";

const ActivitySegment: FC<ActivitySegmentProps> = ({ submission }) => {
  const {
    submittedAt,
    submitter: { fullName, userName, avatarUrl },
  } = submission;

  const userInitial = getAvatarAbbreviation(userName);

  const submittedAtDate = formatDate(submittedAt);

  const handleButtonClick = () => {
    console.log("Clicked");
  };

  return (
    <Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <UserAvatar src={avatarUrl} initials={userInitial} />

        <Stack width={"100%"}>
          <Stack
            direction={{ md: "column", lg: "row" }}
            alignItems={{ lg: "center" }}
            gap={{ lg: 0.5 }}
          >
            <Typography variant="body1" fontWeight={500}>
              {fullName}
            </Typography>
            <Typography
              variant="body2"
              color={"grey.500"}
              fontSize={"0.75rem"}
            >{`@${userName}`}</Typography>
          </Stack>
          <Typography variant="body2" color={"grey.500"}>
            {submittedAtDate}
          </Typography>
        </Stack>
      </Stack>

      <Button
        variant="text"
        startIcon={<ArrowIcon />}
        disableRipple
        onClick={handleButtonClick}
        sx={{
          width: "fit-content",
          "&:hover": { backgroundColor: "transparent" },
          textTransform: "none",
        }}
      >
        Added a submission
      </Button>
    </Stack>
  );
};

export default ActivitySegment;
