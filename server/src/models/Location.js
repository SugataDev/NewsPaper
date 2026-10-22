import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['division', 'district', 'upazila'],
    },
    nameBn: { type: String, required: true },
    slug: { type: String, required: true },
    parent: { type: String, default: null }, // parent slug
  },
  { timestamps: true }
);

locationSchema.index({ type: 1, parent: 1 });
locationSchema.index({ slug: 1 });

export const Location = mongoose.model('Location', locationSchema);
