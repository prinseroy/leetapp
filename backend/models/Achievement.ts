import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievement extends Document {
  userId: mongoose.Types.ObjectId;
  badgeName: string;
  description: string;
  iconUrl: string;
  earnedAt: Date;
}

const AchievementSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  badgeName: { type: String, required: true },
  description: { type: String, required: true },
  iconUrl: { type: String },
  earnedAt: { type: Date, default: Date.now }
});

AchievementSchema.index({ userId: 1, badgeName: 1 }, { unique: true });

export default mongoose.model<IAchievement>('Achievement', AchievementSchema);
