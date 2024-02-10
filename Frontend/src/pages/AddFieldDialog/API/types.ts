export interface Field {
  id: string;
  content: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
}

export interface CreateFieldRequest {
  content: string;
  categoryId: string;
}
