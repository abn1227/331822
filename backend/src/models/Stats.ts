import { Document } from "mongoose";

export interface IJobStats extends Document {
  handyManId: string;
  jobPetitionId: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
