import { omit } from "lodash";
import User, { UserInput } from "../models/user.model";

export const createUser = async (input: UserInput) => {
  try {
    const user = await User.create(input);

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
};
