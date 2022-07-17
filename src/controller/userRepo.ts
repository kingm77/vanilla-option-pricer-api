import { User } from "../model/user";
import bcrypt from "bcryptjs";
import { isPasswordValid } from "../common/validator/passwordValidator";
import { isEmailValid } from "../common/validator/emailValidator";

const saltRounds = 10;

export class UserResult {
  constructor(public messages?: Array<string>, public user?: User) {}
}

export const register = async (
  email: string,
  firstname: string,
  lastname: string,
  password: string
): Promise<UserResult> => {
  const result = isPasswordValid(password);
  if (!result.isValid) {
    return {
      messages: [
        "Passwords must have min length 8, 1 upper character, 1 number, and 1 symbol",
      ],
    };
  }

  const trimmedEmail = email.trim().toLowerCase();
  const emailErrorMsg = isEmailValid(trimmedEmail);
  if (emailErrorMsg) {
    return {
      messages: [emailErrorMsg],
    };
  }

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userEntity = await User.create({
    email: trimmedEmail,
    firstname,
    lastname,
    password: hashedPassword,
  }).save();

  userEntity.password = ""; // blank out for security
  return {
    user: userEntity,
  };
};

export const login = async (
  email: string,
  password: string
): Promise<UserResult> => {
  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    return {
      messages: [userNotFound(email)],
    };
  }

  if (!user.confirmed) {
    return {
      messages: ["User has not confirmed their registration email yet."],
    };
  }

  const passwordMatch = await bcrypt.compare(password, user?.password);
  if (!passwordMatch) {
    return {
      messages: ["Password is invalid."],
    };
  }

  return {
    user: user,
  };
};

export const logout = async (email: string): Promise<string> => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return userNotFound(email);
  }

  return "User logged off.";
};

function userNotFound(email: string) {
  return `User with email ${email} not found.`;
}