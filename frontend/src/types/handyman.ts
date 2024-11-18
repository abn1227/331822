export interface IHandyMan {
  firstName: string;
  lastName: string;
  phone: string;
  expertise: string;
  availability: string[];
  services: string[];
}

export interface IHandyManRecord extends IHandyMan {
  _id: string;
}
