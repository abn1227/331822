export interface IJobPetition {
  status?: "pending" | "assignated" | "rejected" | "completed";
  description: string;
  service: string;
  availability: string;
  date: string;
  time: string;
}

export interface IJobPetitionRecord extends IJobPetition {
  _id: string;
  userId: string;
  handyManId?: string;
  userName?: string;
  handyManName?: string;
  createdAt: Date;
  updatedAt: Date;
}
