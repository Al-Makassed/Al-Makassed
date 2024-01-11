import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { FC, useState } from "react";
import { AnsweredField } from "../API/types";
import useSubmitFocalPointTask from "../hooks/useSubmitFocalPointTask";
import { SubmissionFormProps } from "../types";
import FieldCard from "./FieldCard";

const SubmissionForm: FC<SubmissionFormProps> = ({ focalPointTask }) => {
  const [answers, setAnswers] = useState<AnsweredField[]>([]);

  const { addSubmission, isSubmitting } = useSubmitFocalPointTask();

  const {
    id,
    departmentId,
    monitoringTool: { fields },
  } = focalPointTask;

  const handleAnswerChange = (fieldId: string, answer: boolean) => {
    setAnswers((prevAnswers) => [...prevAnswers, { fieldId, answer }]);
  };

  const handleSubmit = () => {
    addSubmission({
      departmentId,
      focalPointTaskId: id,
      answers,
    });
  };

  const checkAllFieldsAreAnswered = () => {
    return fields.every((field) =>
      answers.find((answer) => answer.fieldId === field.id),
    );
  };

  return (
    <Stack gap={2}>
      <Stack gap={2} sx={{ width: "100%" }}>
        {fields.map((field) => (
          <FieldCard
            key={field.id}
            field={field}
            onAnswerChange={handleAnswerChange}
          />
        ))}
      </Stack>

      <Stack sx={{ mt: "auto", mb: 1 }}>
        <LoadingButton
          type="submit"
          variant="contained"
          startIcon={<CheckCircleIcon />}
          sx={{ width: "fit-content", ml: "auto" }}
          onClick={handleSubmit}
          loading={isSubmitting}
          loadingPosition="start"
          aria-label="submit task"
          disabled={!checkAllFieldsAreAnswered()}
        >
          Submit
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default SubmissionForm;
