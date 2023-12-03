import React, { ChangeEvent, FC, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FieldCardProps } from "../types";

const FieldPaper: FC<FieldCardProps> = ({ field, onAnswerChange }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value === "true";
    setSelectedAnswer(answer);
    onAnswerChange(field.id, answer);
    //console.log(answer);
  };

  return (
    <Paper
      sx={{
        bgcolor: (theme) => theme.palette.grey[100],
        p: 4,
        minWidth: { md: 600 },
      }}
      elevation={2}
    >
      <FormControl sx={{ alignItems: "center", gap: 3, minWidth: { md: 600 } }}>
        <FormLabel id="field-answer-group-label">
          <Typography variant="body1">{field.content}</Typography>
        </FormLabel>

        <RadioGroup
          name="field-answer-group"
          aria-labelledby="field-answer-group-label"
          row
          value={selectedAnswer}
          onChange={handleAnswerChange}
          sx={{ gap: 3 }}
        >
          <FormControlLabel value={"true"} control={<Radio />} label="Yes" />
          <FormControlLabel value={"false"} control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default FieldPaper;
