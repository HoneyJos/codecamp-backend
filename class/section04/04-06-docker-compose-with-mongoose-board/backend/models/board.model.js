import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  writter: String,
  title: String,
  contents: String
});

export const Board = mongoose.model("Board", boardSchema);