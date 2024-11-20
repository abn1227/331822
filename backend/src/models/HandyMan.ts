import mongoose, { Document, Schema } from "mongoose";

export interface IHandyMan extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  expertise: string;
  availability: string[];
  services: string[];
  rating?: number;
  jobsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface HandyManFilters {
  search?: string;
  expertise?: string;
  services?: string[];
  availability?: string[];
  dateRange?: {
    start?: Date;
    end?: Date;
  };
}

export interface IHandyManStats {
  handyManId: string;
  totalJobs: number;
  averageRating: number;
}

const HandyManSchema = new Schema<IHandyMan>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    availability: {
      type: [String],
      required: true,
    },
    services: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const HandyMan = mongoose.model<IHandyMan>("HandyMan", HandyManSchema);
