import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { WithId } from "src/types";
import { HalfListProps } from "./types";
import { not, union } from "./utils";

const HalfList = <T extends WithId<object>>({
  title,
  items,
  checkedItems,
  onSetCheckedItems,
  getOptionLabel,
}: HalfListProps<T>) => {
  const checkedIds = checkedItems.map((x) => x.id);

  const isAllItemsSelected =
    items.every((item) => checkedIds.includes(item.id)) &&
    checkedItems.length > 0;

  const isSomeItemsSelected =
    items.some((item) => checkedIds.includes(item.id)) &&
    checkedItems.length > 0;

  const handleToggleListItem = (item: T) => {
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
            disabled={items.length === 0}
          />
        }
        title={title}
        subheader={`${checkedItems.length}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((item) => {
          const labelId = `transfer-list-all-item-${item}-label`;
          const isChecked = checkedItems.some((x) => x.id === item.id);

          return (
            <ListItemButton
              key={item.id}
              role="listitem"
              onClick={() => handleToggleListItem(item)}
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
              <ListItemText id={labelId} primary={getOptionLabel(item)} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );
};

export default HalfList;
