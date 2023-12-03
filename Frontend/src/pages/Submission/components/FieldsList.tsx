import React, { FC, useState } from "react";
import { FieldsListProps } from "../types";
import { Answer } from "../API/types";
import { Button, Stack } from "@mui/material";
import FieldCard from "./FieldPaper";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import useSubmitFocalPointTask from "../hooks/useSubmitFocalPointTask";

const FieldsList: FC<FieldsListProps> = ({ focalPointTask }) => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const { addSubmission } = useSubmitFocalPointTask();

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

  return (
    <Stack gap={4}>
      {focalPointTask.monitoringTool.fields.map((field, index) => (
        <FieldCard
          key={index}
          field={field}
          onAnswerChange={handleAnswerChange}
        />
      ))}
      <Button
        variant="contained"
        startIcon={<CheckCircleIcon />}
        sx={{ width: "fit-content", ml: "auto" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default FieldsList;
