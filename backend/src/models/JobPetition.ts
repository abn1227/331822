import mongoose, { Document, Schema } from "mongoose";

export interface IJobPetition extends Document {
  userId: string;
  handyManId?: string;
  status: "pending" | "assignated" | "rejected" | "completed";
  description: string;
  availability: string;
  service: string;
  date: Date;
  time: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IJobPetitionDetailed extends IJobPetition {
  userName?: string;
  handyManName?: string;
}

export interface JobPetitionFilters {
  search?: string;
  status?: string[];
  userId?: string[];
  handyManId?: string[];
  service?: string[];
  dateRange?: {
    start?: Date;
    end?: Date;
  };
}

const JobPetitionSchema = new Schema<IJobPetition>(
  {
    userId: {
      type: String,
      required: true,
    },
    handyManId: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      enum: ["plumbing", "electrical", "carpentry", "painting", "general"],
      required: true,
    },
    availability: {
      type: String,
      enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const JobPetition = mongoose.model<IJobPetition>(
  "JobPetition",
  JobPetitionSchema
);
