import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  googleId: string;
  email: string;
  name: string;
  picture: string;
}

const UserSchema: Schema<IUser> = new Schema(
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

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
