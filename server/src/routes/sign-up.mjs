import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { signUpValidationSchema } from "../utils/validationSchemas.mjs";
import { hashPassword } from "../utils/passwordHashing.mjs";
import { User } from "../mongoose/schemas/user.mjs";

const router = Router();

router.post(
  "/api/auth/sign-up",
  checkSchema(signUpValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ error: result.array() });
    const userData = matchedData(req);
    userData.password = hashPassword(userData.password);
    const newUser = new User(userData);
    req.session.user = newUser;
    console.log("Session user:", req.session.user);
    try {
      await newUser.save();
      return res.status(200).send(newUser);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  }
);

export default router;
