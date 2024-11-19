import { Document } from "mongoose";

export interface ISchedule extends Document {
  handyManId: string;
  jobPetitionId: string;
  day: string;
  time: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
