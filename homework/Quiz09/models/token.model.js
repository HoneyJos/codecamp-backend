import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: String,
  phone: String,
  isAuth: {
    type: Boolean,
    default: false
  }
});

export const Token = mongoose.model("Token", tokenSchema);