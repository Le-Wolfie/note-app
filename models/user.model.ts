import mongoose, { Document, Schema } from "mongoose";

// Define the model name
export const userModelName = "User";

// Define the user interface
export interface IUser extends Document {
  username: string;
  imageUrl?: string;
  clerkId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the user type without mongoose document fields
export type UserType = Omit<IUser, keyof Document>;

// Create the user schema
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  imageUrl: { type: String },
  clerkId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Export the user model
export const UserModel =
  mongoose.models.User || mongoose.model<IUser>(userModelName, userSchema);
