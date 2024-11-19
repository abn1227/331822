export interface IJobPetition {
  userId: string;
  handyManId?: string;
  status: "pending" | "assignated" | "rejected" | "completed";
  description: string;
  service: string;
  date: string;
  time: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IJobPetitionRecord extends IJobPetition {
  _id: string;
}
