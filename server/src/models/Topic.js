import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema(
  {
    nameBn: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isTrending: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

topicSchema.index({ isTrending: 1, order: 1 });

export const Topic = mongoose.model('Topic', topicSchema);
