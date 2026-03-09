import mongoose, { Schema, Document } from 'mongoose';

export interface ICodingProfile extends Document {
  userId: mongoose.Types.ObjectId;
  platform: 'LeetCode' | 'Codeforces' | 'CodeChef' | 'HackerRank' | 'GitHub';
  platformUsername: string;
  rating: number;
  totalSolved: number;
  globalRank: number;
  lastSyncedAt: Date;
}

const CodingProfileSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  platform: { type: String, enum: ['LeetCode', 'Codeforces', 'CodeChef', 'HackerRank', 'GitHub'], required: true },
  platformUsername: { type: String, required: true },
  rating: { type: Number, default: 0 },
  totalSolved: { type: Number, default: 0 },
  globalRank: { type: Number, default: 0 },
  lastSyncedAt: { type: Date, default: Date.now }
}, { timestamps: true });

CodingProfileSchema.index({ userId: 1, platform: 1 }, { unique: true });

export default mongoose.model<ICodingProfile>('CodingProfile', CodingProfileSchema);
