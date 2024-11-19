import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = (plain) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(plain, salt);
};

export const compareHashedPasswords = (plain, hash) => {
  return bcrypt.compareSync(plain, hash);
};
