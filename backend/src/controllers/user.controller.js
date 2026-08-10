import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password , phone, role } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email or password are required!");
  }

  const existUser = await User.findOne({ email });

  if (existUser) {
    throw new ApiError(409, "User already exists!");
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role,
  });

  const safeUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(201, safeUser, "user registered successfully!"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email or password are required!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "User does'nt exists!");
  }

  const isValidUser = await user.comparePassword(password);

  if (!isValidUser) {
    throw new ApiError(400, "Invalid credientials!");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

  const safeUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, safeUser, "user loggedIn successfully!"));
});
