import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse, IconButton, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import styles from "../../style.module.css";
import { DescriptionSectionProps } from "./types";

const DescriptionSection: FC<DescriptionSectionProps> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Stack direction="row" alignItems="center">
      <Collapse in={expanded} collapsedSize="1.43em">
        <Typography
          variant="body2"
          className={!expanded ? styles.showFirstLine : ""}
        >
          {description}
        </Typography>
      </Collapse>

      <IconButton
        onClick={handleClick}
        aria-label="expand"
        size="small"
        sx={{ mb: "auto" }}
        disableRipple
      >
        {expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </IconButton>
    </Stack>
  );
};

export default DescriptionSection;
