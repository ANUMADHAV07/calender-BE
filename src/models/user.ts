import mongoose, { Document, Schema, Model } from "mongoose";
import { User } from "../types";

const UserSchema: Schema<User> = new Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<User> = mongoose.model<User>("User", UserSchema);

export default User;
