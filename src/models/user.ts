import mongoose from 'mongoose';

export interface User {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
}


const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
});

export const UserModel = mongoose.model<User>('user', userSchema);
