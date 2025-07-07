import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  comparePassword: string,
) => {
  const isPasswordValid = await bcrypt.compare(password, comparePassword);

  return isPasswordValid;
};

export default hashPassword;
