import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { signInValidationSchema } from "../utils/validationSchemas.mjs";
import { compareHashedPasswords } from "../utils/passwordHashing.mjs";
import { User } from "../mongoose/schemas/user.mjs";

const router = Router();

router.post(
  "/api/auth/sign-in",
  checkSchema(signInValidationSchema),
  async (req, res) => {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username });
    if (!findUser) return res.status(401).send({ msg: "Invalid Credentials" });
    if (!compareHashedPasswords(password, findUser.password)) {
      return res.status(401).send({ msg: "Invalid Credentials" });
    }
    req.session.user = findUser;
    return res.status(200).send({ msg: "authorized" });
  }
);

router.get("/api/auth/status", (req, res) => {
  const authUser = req.session.user;
  if (!authUser) return res.status(401).json({ status: "Unauthenticated" });
  return res.status(200).json({ status: "Authenticated", username: authUser });
});

router.post("/api/auth/sign-out", (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out." });
      }
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Successfully logged out." });
    });
  } else {
    return res.status(400).json({ message: "No active session found." });
  }
});

export default router;
