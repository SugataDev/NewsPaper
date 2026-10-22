import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    nameBn: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    order: { type: Number, default: 0 },
    showInNav: { type: Boolean, default: true },
    parent: { type: String, default: null }, // parent category slug
  },
  { timestamps: true }
);

categorySchema.index({ order: 1 });

export const Category = mongoose.model('Category', categorySchema);
