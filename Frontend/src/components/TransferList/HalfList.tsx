import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FC } from "react";
import { HalfListProps, ListItem } from "./types";
import { not, union } from "./utils";

const HalfList: FC<HalfListProps> = ({
  title,
  items,
  checkedItems,
  onSetCheckedItems,
  getOptionLabel = (option) => option.label,
}) => {
  const checkedIds = checkedItems.map((x) => x.id);

  const isAllItemsSelected =
    items.every((item) => checkedIds.includes(item.id)) &&
    checkedItems.length > 0;

  const isSomeItemsSelected =
    items.some((item) => checkedIds.includes(item.id)) &&
    checkedItems.length > 0;

  const handleToggleListItem = (item: ListItem) => {
    const isItemChecked = checkedItems.some((x) => x.id === item.id);

    isItemChecked
      ? onSetCheckedItems(checkedItems.filter((x) => x.id !== item.id))
      : onSetCheckedItems([...checkedItems, item]);
  };

  const handleToggleAllListItems = () => {
    isAllItemsSelected
      ? onSetCheckedItems(not(checkedItems, items))
      : onSetCheckedItems(union(checkedItems, items));
  };

  return (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAllListItems}
            checked={isAllItemsSelected}
            indeterminate={isSomeItemsSelected && !isAllItemsSelected}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${checkedItems.length}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          const isChecked = checkedItems.some((x) => x.id === value.id);

          return (
            <ListItemButton
              key={value.id}
              role="listitem"
              onClick={() => handleToggleListItem(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={isChecked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={getOptionLabel(value)} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );
};

export default HalfList;
