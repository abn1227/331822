export interface CategoryOption {
  value: string;
  label: string;
}

export interface CategoryState {
  expertise: CategoryOption[];
  services: CategoryOption[];
  availability: CategoryOption[];
  jobPetitionStatus: CategoryOption[];
  loading: boolean;
  error: string | null;
}

export interface ICategory {
  type: string;
  options: CategoryOption[];
}

export interface ICategoryRecord extends ICategory {
  _id: string;
}