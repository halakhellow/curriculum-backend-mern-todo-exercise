import { model, Schema, Types } from "mongoose";

//TODO: Add types for schema
interface ITodo {
  name: string;
  description: string;
  status: boolean;
  user: Types.ObjectId;
}

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ITodo>("Todo", todoSchema);
