import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import User, { UserDocument, UserInput } from "../models/user.model";

export const createUser = async (input: UserInput) => {
  try {
    const user = await User.create(input);

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email }).select("_id email password");

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
};

export const findUser = async (query: FilterQuery<UserDocument>) => {
  return User.findOne(query).lean();
};
