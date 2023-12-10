import { useContext } from "react";
import { TransferListContext } from "./TransferList";

const useTransferListContext = () => {
    const context = useContext(TransferListContext);

    if (!context)
        throw new Error("useTransferListContext must be used within a TransferListProvider");

    return context;
};

export default useTransferListContext;
