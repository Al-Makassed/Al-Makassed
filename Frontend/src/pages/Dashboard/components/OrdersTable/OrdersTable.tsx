import { Box } from "@mui/material";
import OrdersDataGrid from "./definition";
import { ORDERS } from "./fixtures";

const OrdersTable = () => {
  return (
    <Box sx={{ height: "542px" }}>
      <OrdersDataGrid.Provider
        data={ORDERS}
        isFetching={false}
        totalRows={ORDERS.length}
        onFetch={() => {}}
      >
        <OrdersDataGrid.Container>
          <OrdersDataGrid.Table>
            <OrdersDataGrid.Head />
            <OrdersDataGrid.Body />
          </OrdersDataGrid.Table>
        </OrdersDataGrid.Container>
      </OrdersDataGrid.Provider>
    </Box>
  );
};

export default OrdersTable;
