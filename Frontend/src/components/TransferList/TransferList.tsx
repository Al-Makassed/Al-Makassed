import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FC } from "react";
import HalfList from "./HalfList";
import { TransferListContext } from "./context/TransferList";
import TransferListProvider from "./context/TransferListProvider";
import { TransferListProps } from './types';

const TransferList: FC<TransferListProps> = ({ leftTitle, rightTitle, leftList, rightList }) => {

    return (
        <TransferListProvider>
            <TransferListContext.Consumer>
                {({ onCheckLeft, onCheckRight }) => (
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>
                            <HalfList title={leftTitle} items={leftList} />
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={onCheckRight}
                                    // disabled={leftChecked.length === 0}
                                    aria-label="move selected right"
                                >
                                    &gt;
                                </Button>
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={onCheckLeft}
                                    // disabled={rightChecked.length === 0}
                                    aria-label="move selected left"
                                >
                                    &lt;
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <HalfList title={rightTitle} items={rightList} />
                        </Grid>
                    </Grid>
                )}
            </TransferListContext.Consumer>
        </TransferListProvider>
    )
}

export default TransferList;
