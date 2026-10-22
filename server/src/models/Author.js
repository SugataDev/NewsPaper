import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    nameBn: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    designation: { type: String, default: '' },
    bio: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Author = mongoose.model('Author', authorSchema);
