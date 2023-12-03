import React, { FC, useState } from "react";
import { FieldsListProps } from "../types";
import { Answer } from "../API/types";
import { Stack } from "@mui/material";
import FieldCard from "./FieldPaper";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import useSubmitFocalPointTask from "../hooks/useSubmitFocalPointTask";
import { LoadingButton } from "@mui/lab";

const FieldsList: FC<FieldsListProps> = ({ focalPointTask }) => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const { addSubmission, isPending } = useSubmitFocalPointTask();

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
    <Stack gap={4}>
      {focalPointTask.monitoringTool.fields.map((field, index) => (
        <FieldCard
          key={index}
          field={field}
          onAnswerChange={handleAnswerChange}
        />
      ))}
      <LoadingButton
        type="submit"
        variant="contained"
        startIcon={<CheckCircleIcon />}
        sx={{ width: "fit-content", ml: "auto" }}
        onClick={handleSubmit}
        loading={isPending}
        loadingPosition="start"
        aria-label="submit task"
        disabled={!checkAllFieldsAreAnswered()}
      >
        Submit
      </LoadingButton>
    </Stack>
  );
};

export default FieldsList;
