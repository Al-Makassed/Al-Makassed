import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { FieldCardProps } from "../types";

const FieldCard: FC<FieldCardProps> = ({ field, onAnswerChange }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value === "true";
    setSelectedAnswer(answer);
    onAnswerChange(field.id, answer);
  };

  return (
    <Paper
      sx={{
        px: 2,
        py: 1,
        // width: { md: 600 },
      }}
      variant="outlined"
    >
      <FormControl sx={{ gap: 0.5, width: "100%" }}>
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
          <FormControlLabel
            value="true"
            control={<Radio size="small" />}
            label="Yes"
          />
          <FormControlLabel
            value="false"
            control={<Radio size="small" />}
            label="No"
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default FieldCard;
