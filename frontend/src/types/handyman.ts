export interface IHandyMan {
  firstName: string;
  lastName: string;
  phone: string;
  expertise: string;
  availability: string[];
  services: string[];
  rating?: number;
  jobsCount?: number;
}

export interface IHandyManRecord extends IHandyMan {
  _id: string;
}
