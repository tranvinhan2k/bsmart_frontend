export interface SubjectPayload {
  id: number;
  code: string;
  name: string;
  categoryIds: number[];
}

export interface CategoriesPayload {
  id: number;
  code: string;
  name: string;
}
