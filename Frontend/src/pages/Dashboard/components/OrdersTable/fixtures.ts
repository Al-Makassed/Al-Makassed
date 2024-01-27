import { OrderItem } from "./types";
import { createOrderItem } from "./utils";

export const ORDERS: OrderItem[] = [
  createOrderItem(84564564, "Camera Lens", 40, "Rejected", 40570),
  createOrderItem(98764564, "Laptop", 300, "Pending", 180139),
  createOrderItem(98756325, "Mobile", 355, "Approved", 90989),
  createOrderItem(98652366, "Handset", 50, "Approved", 10239),
  createOrderItem(13286564, "Computer Accessories", 100, "Approved", 83348),
  createOrderItem(86739658, "TV", 99, "Pending", 410780),
  createOrderItem(13256498, "Keyboard", 125, "Rejected", 70999),
  createOrderItem(98753263, "Mouse", 89, "Rejected", 10570),
  createOrderItem(98753275, "Desktop", 185, "Approved", 98063),
  createOrderItem(98753291, "Chair", 100, "Pending", 14001),
];
