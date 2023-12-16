import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { WithId } from "src/types";
import HalfList from "./HalfList";
import LoadingSkeleton from "./LoadingSkeleton";
import useTransferList from "./hooks/useTransferList";
import { TransferListProps } from "./types";
import { teal } from "@mui/material/colors";

const TransferList = <T extends WithId<object>>({
  leftTitle = "Choices",
  rightTitle = "Chosen",
  right = [], // empty by default
  left,
  getOptionLabel = (option) => option.id,
  loading,
  onTransfer = (left, right) => ({ left, right }),
}: TransferListProps<T>) => {
  const {
    checkedList,
    onSetCheckedList,
    leftCheckedIds,
    rightCheckedIds,
    leftList,
    rightList,
    onTransferToLeft,
    onTransferToRight,
  } = useTransferList({ left, right });

  const handleTransferToRight = () => {
    const [newLeftList, newRightList] = onTransferToRight();
    onTransfer(newLeftList, newRightList);
  };

  const handleTransferToLeft = () => {
    const [newLeftList, newRightList] = onTransferToLeft();
    onTransfer(newLeftList, newRightList);
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs={12} md={5.65}>
        <HalfList
          title={leftTitle}
          items={leftList}
          checkedItems={checkedList}
          onSetCheckedItems={onSetCheckedList}
          getOptionLabel={getOptionLabel}
        />
      </Grid>

      <Grid item xs={12} md={0.7}>
        <Grid
          container
          direction={{ xs: "row", md: "column" }}
          alignItems="center"
          justifyContent="center"
        >
          <Stack gap={1}>
            <IconButton
              // variant="outlined"
              size="small"
              color="primary"
              onClick={handleTransferToLeft}
              disabled={rightCheckedIds.length === 0}
              aria-label="move selected right"
              sx={{
                bgcolor: teal[50],
                "&:hover": {
                  bgcolor: teal[100],
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              // variant="outlined"
              size="small"
              color="primary"
              onClick={handleTransferToRight}
              disabled={leftCheckedIds.length === 0}
              aria-label="move selected left"
              sx={{
                bgcolor: teal[50],
                "&:hover": {
                  bgcolor: teal[100],
                },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      <Grid item xs={12} md={5.65}>
        <HalfList
          title={rightTitle}
          items={rightList}
          checkedItems={checkedList}
          onSetCheckedItems={onSetCheckedList}
          getOptionLabel={getOptionLabel}
        />
      </Grid>
    </Grid>
  );
};

export default TransferList;
