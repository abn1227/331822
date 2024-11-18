import mongoose, { Document, Schema } from "mongoose";

export interface CategoryOption {
  value: string;
  label: string;
}

export interface ICategory extends Document {
  type: string;
  options: CategoryOption[];
}

const CategorySchema = new Schema<ICategory>({
  type: {
    type: String,
    required: true,
  },
  options: {
    type: [
      {
        value: String,
        label: String,
      },
    ],
    required: true,
  },
});

export const Category = mongoose.model<ICategory>("Category", CategorySchema);
