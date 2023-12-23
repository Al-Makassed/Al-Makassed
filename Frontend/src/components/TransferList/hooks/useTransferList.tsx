import { useEffect, useState } from "react";
import { WithId } from "src/types";
import { intersection, not, union } from "../utils";
import { UseTransferListProps } from "../types";

const useTransferList = <T extends WithId<object>>({
  left,
  right,
}: UseTransferListProps<T>) => {
  const [checkedList, setCheckedList] = useState<T[]>([]);
  const [leftList, setLeftList] = useState<T[]>(() => left);
  const [rightList, setRightList] = useState<T[]>(() => right);

  const leftCheckedIds = intersection(checkedList, leftList);
  const rightCheckedIds = intersection(checkedList, rightList);

  const onTransferToRight = () => {
    const newLeftList = not(leftList, checkedList);
    const newRightList = union(rightList, checkedList);

    setLeftList(newLeftList);
    setRightList(newRightList);

    setCheckedList(not(checkedList, leftList));

    return [newLeftList, newRightList];
  };

  const onTransferToLeft = () => {
    const newRightList = not(rightList, checkedList);
    const newLeftList = union(leftList, checkedList);

    setRightList(newRightList);
    setLeftList(newLeftList);

    setCheckedList(not(checkedList, rightList));

    return [newLeftList, newRightList];
  };

  useEffect(() => {
    setLeftList(left);
  }, [left]);

  return {
    checkedList,
    onSetCheckedList: setCheckedList,

    leftCheckedIds,
    rightCheckedIds,

    leftList,
    onSetLeftList: setLeftList,

    rightList,
    onSetRightList: setRightList,

    onTransferToRight,
    onTransferToLeft,
  };
};

export default useTransferList;
