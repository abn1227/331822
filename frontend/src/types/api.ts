export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
  pagination?: Pagination;
}
export interface Pagination {
  total: number;
  totalPages: number;
  limit: number;
  offset: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: Pagination;
}