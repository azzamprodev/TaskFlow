export const signUpValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "name cannot be empty",
    },
    isLength: {
      options: { max: 20 },
      errorMessage: "Please keep the name under 20 characters.",
    },
  },
  username: {
    notEmpty: {
      errorMessage: "username cannot be empty",
    },
    isLength: {
      options: { min: 3, max: 15 },
      errorMessage: "Username must be between 3 and 15 characters.",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "password cannot be empty",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters long.",
    },
  },
  tasks: {},
};

export const signInValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "username cannot be empty",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "password cannot be empty",
    },
  },
};

export const tasksValidationSchema = {
  title: {
    isLength: {
      options: { min: 2 },
      errorMessage: "task couldn't be empty",
    },
  },
};
