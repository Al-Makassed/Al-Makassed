import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { FC, useState } from "react";
import HalfList from "./HalfList";
import { ListItem, TransferListProps } from "./types";
import { intersection, not, union } from "./utils";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const TransferList: FC<TransferListProps> = ({
  leftTitle = "Choices",
  rightTitle = "Choices",
  right = [], // initially empty
  left,
  getOptionLabel = (option) => option.label,
}) => {
  const [checkedList, setCheckedList] = useState<ListItem[]>([]);
  const [leftList, setLeftList] = useState<ListItem[]>(() => left);
  const [rightList, setRightList] = useState<ListItem[]>(() => right);

  const leftCheckedIds = intersection(checkedList, leftList);
  const rightCheckedIds = intersection(checkedList, rightList);

  const transferToRight = () => {
    const checkedItemsIds = checkedList.map((x) => x.id);

    const leftListItems = leftList.filter(
      (x) => !checkedItemsIds.includes(x.id),
    );

    setLeftList(leftListItems);
    setRightList(union(rightList, checkedList));

    setCheckedList(not(checkedList, leftList));
  };

  const transferToLeft = () => {
    const checkedItemsIds = checkedList.map((x) => x.id);

    const rightListItems = rightList.filter(
      (x) => !checkedItemsIds.includes(x.id),
    );

    setLeftList(union(leftList, checkedList));
    setRightList(rightListItems);

    setCheckedList(not(checkedList, rightList));
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <HalfList
          title={leftTitle}
          items={leftList}
          checkedItems={checkedList}
          onSetCheckedItems={setCheckedList}
          getOptionLabel={getOptionLabel}
        />
      </Grid>

      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={transferToLeft}
            disabled={rightCheckedIds.length === 0}
            aria-label="move selected right"
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={transferToRight}
            disabled={leftCheckedIds.length === 0}
            aria-label="move selected left"
          >
            <ChevronRightIcon />
          </Button>
        </Grid>
      </Grid>

      <Grid item>
        <HalfList
          title={rightTitle}
          items={rightList}
          checkedItems={checkedList}
          onSetCheckedItems={setCheckedList}
          getOptionLabel={getOptionLabel}
        />
      </Grid>
    </Grid>
  );
};

export default TransferList;
