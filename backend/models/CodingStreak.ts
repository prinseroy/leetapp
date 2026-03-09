import mongoose, { Schema, Document } from 'mongoose';

export interface ICodingStreak extends Document {
  userId: mongoose.Types.ObjectId;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
}

const CodingStreakSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastActivityDate: { type: Date }
}, { timestamps: true });

export default mongoose.model<ICodingStreak>('CodingStreak', CodingStreakSchema);
