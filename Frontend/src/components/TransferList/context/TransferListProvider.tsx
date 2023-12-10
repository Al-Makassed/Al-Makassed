import {
    useState,
    FC,
    PropsWithChildren,
    useCallback,
} from "react";
import { TransferListContext } from "./TransferList";
import { intersection, not, union } from "../utils";
import { TransferListContextValue } from "./types";

const TransferListProvider: FC<PropsWithChildren> = ({ children }) => {
    const [checked, setChecked] = useState<readonly number[]>([]);
    const [left, setLeft] = useState<readonly number[]>([0, 1, 2, 3]);
    const [right, setRight] = useState<readonly number[]>([4, 5, 6, 7]);

    const leftChecked = intersection(checked, left);

    const rightChecked = intersection(checked, right);

    const getNumberOfChecked = useCallback(
        (items: readonly number[]) => intersection(checked, items).length
        , []
    );

    const onToggleAll = useCallback(
        (items: readonly number[]) => () => {
            console.log("onToggleAll");
            if (getNumberOfChecked(items) === items.length) {
                setChecked(not(checked, items));
            } else {
                setChecked(union(checked, items));
            }
        }
        , [checked]
    );


    const onToggle = useCallback(
        (value: number) => {
            console.log(value);
            // const currentIndex = checked.indexOf(value);
            // const newChecked = [...checked];

            // if (currentIndex === -1) {
            //     newChecked.push(value);
            // } else {
            //     newChecked.splice(currentIndex, 1);
            // }

            // setChecked(newChecked);


            console.log(checked);
            const isChecked = checked.find((x) => x === value);
            const updatedChecked = isChecked ? checked.filter((x) => x !== value) : [...checked, value]
            setChecked(updatedChecked);
        }
        , []
    );

    const onCheckRight = useCallback(
        () => {
            setRight(right.concat(leftChecked));
            setLeft(not(left, leftChecked));
            const x = not(checked, leftChecked);
            console.log(x);
            setChecked(x);
        }
        , [checked, left, leftChecked, right]
    );

    const onCheckLeft = useCallback(
        () => {
            setLeft(left.concat(rightChecked));
            setRight(not(right, rightChecked));
            setChecked(not(checked, rightChecked));
        },
        [checked, left, right, rightChecked]
    );

    const contextValue: TransferListContextValue = {
        left,
        right,
        checked,
        leftChecked,
        rightChecked,
        onToggleAll,
        onToggle,
        onCheckLeft,
        onCheckRight,
        getNumberOfChecked,
    }

    return (
        <TransferListContext.Provider value={contextValue}>
            {children}
        </TransferListContext.Provider>
    );
};


export default TransferListProvider;
