import mongoose, { Document, Schema } from "mongoose";

export interface IHandyMan extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  expertise: string;
  availability: string[];
  services: string[];
  createdAt: Date;
  updatedAt: Date;
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
