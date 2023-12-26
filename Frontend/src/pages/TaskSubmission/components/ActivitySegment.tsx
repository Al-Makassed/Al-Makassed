import ArrowIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { Button, Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";
import UserAvatar from "src/components/UserAvatar";
import { formatDate } from "src/utils";
import getAvatarAbbreviation from "src/utils/getAvatarAbbreviation";
import { ActivitySegmentProps } from "../types";
import { isCurrentMonthSubmission } from "../utils";

const ActivitySegment: FC<ActivitySegmentProps> = ({
  submission,
  onSelectedSubmissionChange,
}) => {
  const {
    id,
    submittedAt,
    submitter: { fullName, userName, avatarUrl },
  } = submission;

  const userInitial = getAvatarAbbreviation(userName);

  const submittedAtDate = formatDate(submittedAt);

  const handleButtonClick = () => {
    onSelectedSubmissionChange(id);
  };

  return (
    <Stack>
      {isCurrentMonthSubmission(submittedAt) && (
        <Chip
          classes={{ label: "custom-chip-label" }}
          sx={{
            width: "fit-content",
            height: "fit-content",
            pt: 0.15,
            pb: 0.1,
            color: "grey.600",
            "& .custom-chip-label": {
              px: 0.75,
            },
          }}
          label={`#${submission.number}`}
        />
      )}

      <Stack direction="row" gap={1} alignItems="center">
        <UserAvatar src={avatarUrl} initials={userInitial} />

        <Stack width={"100%"}>
          <Stack
            direction={{ xs: "row", md: "column", lg: "row" }}
            alignItems={{ xs: "center", md: "flex-start", lg: "center" }}
            gap={{ xs: 0.5, md: 0, lg: 0.5 }}
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
