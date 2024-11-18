export interface CategoryOption {
  value: string;
  label: string;
}

export interface CategoryState {
  expertise: CategoryOption[];
  services: CategoryOption[];
  availability: CategoryOption[];
  loading: boolean;
  error: string | null;
}
