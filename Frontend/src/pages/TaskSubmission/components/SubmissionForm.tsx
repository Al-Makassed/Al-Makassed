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

  const formFields = focalPointTask.monitoringTool.fields;

  const handleAnswerChange = (fieldId: string, answer: boolean) => {
    setAnswers((prevAnswers) => [...prevAnswers, { fieldId, answer }]);
  };

  const handleSubmit = () => {
    addSubmission({
      departmentId: focalPointTask.departmentId,
      focalPointTaskId: focalPointTask.id,
      answers,
    });
  };

  const checkAllFieldsAreAnswered = () => {
    return focalPointTask.monitoringTool.fields.every((field) =>
      answers.find((answer) => answer.fieldId === field.id),
    );
  };

  return (
    <Stack gap={2} sx={{ height: "100%" }}>
      <Stack gap={2} sx={{ width: "100%" }}>
        {formFields.map((field) => (
          <FieldCard
            key={field.id}
            field={field}
            onAnswerChange={handleAnswerChange}
          />
        ))}
      </Stack>
      {/* <Box sx={{ flexGrow: 1 }} /> */}
      <Stack sx={{ mt: "auto" }}>
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
