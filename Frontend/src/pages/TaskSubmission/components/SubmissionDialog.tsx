import FieldIcon from "@mui/icons-material/QuizOutlined";
import { Chip, ListItem, ListItemIcon, Stack, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { FC } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import { formatDate } from "src/utils";
import useGetSubmission from "../hooks/useGetSubmission";
import { SubmissionDialogProps } from "../types";
import SubmissionDialogSkeleton from "./SubmissionDialogSkeleton";

const SubmissionDialog: FC<SubmissionDialogProps> = ({
  submissionId,
  isOpen,
  onClose,
}) => {
  const { submission, isFetching } = useGetSubmission(submissionId);

  const { number, submittedAt, answers } = submission!;

  const submittedAtDate = formatDate(submittedAt);

  const submissionMonthAndYear = () => {
    const slittedDate = submittedAtDate.split(" ");
    return `${slittedDate[0]}, ${slittedDate[2].slice(0, 4)}`;
  };

  return (
    <MaqasidDialog isOpen={isOpen} onClose={onClose}>
      <MaqasidDialog.Header>
        <MaqasidDialog.Title
          title={`Submission #${number} in ${submissionMonthAndYear()}`}
        />
        <MaqasidDialog.Actions>
          <MaqasidDialog.Fullscreen />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      <MaqasidDialog.Body niceScroll>
        {isFetching && <SubmissionDialogSkeleton />}
        {!isFetching && (
          <Stack>
            {answers.map((answeredField) => (
              <ListItem
                key={answeredField.fieldId}
                sx={{
                  border: 1.2,
                  mb: 1.5,
                  borderRadius: 2,
                  borderColor: (theme) => theme.palette.grey[300],
                  spacing: 0,
                  // bgcolor: (theme) => theme.palette.grey[100],
                  // bgcolor: answeredField.answer ? green[50] : red[50],
                }}
              >
                <ListItemIcon
                  sx={{
                    mr: 0,
                    pr: 1.5,
                    width: "fit-content",
                    minWidth: "fit-content",
                  }}
                >
                  <FieldIcon />
                </ListItemIcon>
                <Stack direction="row" gap={2} width={"100%"}>
                  <Typography>{`${answeredField.field.content}`}</Typography>
                  {/* <Typography
                  sx={{
                    // color: answeredField.answer ? "green" : "red",
                    color: "grey.600",
                    ml: "auto",
                  }}
                >{answeredField.answer ? "Yes" : "No"}</Typography> */}
                  <Chip
                    label={answeredField.answer ? "Yes" : "No"}
                    sx={{
                      fontSize: "0.88rem",
                      fontWeight: 500,
                      ml: "auto",
                      bgcolor: answeredField.answer ? green[50] : red[50],
                    }}
                  />
                </Stack>
              </ListItem>
            ))}
          </Stack>
        )}
      </MaqasidDialog.Body>
    </MaqasidDialog>
  );
};

export default SubmissionDialog;
