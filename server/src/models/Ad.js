import mongoose from 'mongoose';

const adSchema = new mongoose.Schema(
  {
    slot: { type: String, required: true }, // e.g. 'leaderboard', 'billboard', 'hero-right', 'sports-right', 'bangladesh-right', 'bottom-billboard'
    title: { type: String, default: '' },
    size: { type: String, default: '300x250' },
    imageUrl: { type: String, default: '' },
    targetUrl: { type: String, default: '#' },
    active: { type: Boolean, default: true },
    startsAt: { type: Date, default: Date.now },
    endsAt: { type: Date, default: null },
  },
  { timestamps: true }
);

adSchema.index({ slot: 1, active: 1 });

export const Ad = mongoose.model('Ad', adSchema);
