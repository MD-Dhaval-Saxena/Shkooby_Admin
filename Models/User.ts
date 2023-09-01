import mongoose, { Schema, Document } from "mongoose";

interface IAddress {
  street: string;
  city: string;
}

interface IUser extends Document {
  username: string;
  password: string;
  name?: string;
  email: string;
  ip: number;
  createdAt: Date;
  updatedAt: Date;
  address: IAddress;
}


const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
  },
  ip:Number,
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

export default mongoose.model<IUser>("User", userSchema);