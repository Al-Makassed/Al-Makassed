import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FieldsCheckboxListProps } from "../types";
import { FC } from "react";

const FieldsCheckboxList: FC<FieldsCheckboxListProps> = ({
  fields,
  selectedItems,
  onToggle,
}) => {
  return (
    <List sx={{ width: "100%" }}>
      {fields.map((field) => {
        const labelId = `checkbox-list-label-${field.id}`;

        return (
          <ListItem key={field.id} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={() => onToggle(field.id)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedItems.includes(field.id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={field.content} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default FieldsCheckboxList;
