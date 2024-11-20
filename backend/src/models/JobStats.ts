import mongoose, { Document, Schema } from "mongoose";

export interface IJobStats extends Document {
  handyManId: string;
  jobPetitionId: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const JobStatsSchema = new Schema<IJobStats>(
  {
    handyManId: {
      type: String,
      required: true,
    },
    jobPetitionId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const JobStats = mongoose.model<IJobStats>("JobStats", JobStatsSchema);
