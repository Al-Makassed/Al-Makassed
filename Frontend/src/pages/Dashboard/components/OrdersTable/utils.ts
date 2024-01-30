import { OrderItem, OrderStatus } from "./types";

export const createOrderItem = (
  trackingNo: number,
  name: string,
  totalOrder: number,
  status: OrderStatus,
  totalAmount: number,
): OrderItem => {
  return { trackingNo, name, totalOrder, status, totalAmount };
};
