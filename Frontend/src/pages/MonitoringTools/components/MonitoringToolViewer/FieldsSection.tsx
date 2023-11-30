import React, { FC } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FieldIcon from "@mui/icons-material/QuizOutlined";
import { FieldsSectionProps } from "./types";
import SectionHeader from "./SectionHeader";

const FieldsSection: FC<FieldsSectionProps> = ({ fields }) => {
  return (
    <>
      <SectionHeader title="Fields" />

      <Grid item>
        <List>
          {fields &&
            fields.map((field) => (
              <ListItem key={field.id}>
                <ListItemIcon>
                  <FieldIcon />
                </ListItemIcon>
                <ListItemText primary={field.content} />
              </ListItem>
            ))}
        </List>
      </Grid>
    </>
  );
};

export default FieldsSection;
