import axios from "src/API/axios";
import { Category, CreateFieldRequest, Field } from "./types";

export const createField = ({ content, categoryId }: CreateFieldRequest) => {
  return axios
    .post<Field>("/fields", { content, categoryId })
    .then((res) => res.data);
};

export const getCategories = () => {
  return axios.get<Category[]>(`/categories`).then((res) => res.data);
};
