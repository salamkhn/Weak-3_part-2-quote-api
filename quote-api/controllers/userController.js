import Joi from "joi";
import { user } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { quote } from "../models/quotesModel.js";
import jwt from "jsonwebtoken";

export const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().allow(""),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

//user registration
export const registerUser = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: error.details[0].message,
      success: true,
    });
  }
  try {
    const { firstName, lastName, email, password } = req.body;

    const exist = await quote.findOne({ email });
    if (exist) {
      return res.status(400).json({
        message: "user already found",
        success: false,
      });
    }
    // hashing password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const userDetails = new user({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    //save to dbs
    await user.create(userDetails);
    return res.status(201).json({
      message: "user created successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

//user login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("email :", email);
    const exist = await user.findOne({ email });
    //validation
    if (!exist) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }

    console.log("exist :", exist);

    const encodePassword = await bcryptjs.compare(password, exist.password);

    console.log("encodePassword :", encodePassword);
    if (!encodePassword) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const token = jwt.sign({ userId: exist._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    console.log("token form login :", token);

    //success response
    return res.status(200).json({
      message: "login successfully",
      success: true,
      user: exist,
    });
  } catch (err) {
    next(err);
  }
};
