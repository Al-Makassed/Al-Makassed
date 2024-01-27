export interface OrderItem {
  trackingNo: number;
  name: string;
  totalOrder: number;
  status: OrderStatus;
  totalAmount: number;
}

export type OrderStatus = "Pending" | "Approved" | "Rejected";
