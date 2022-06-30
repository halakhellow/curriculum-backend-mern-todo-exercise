import { model, Schema, Types } from "mongoose";

//TODO: Add types for schema
export interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
}
const userSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
