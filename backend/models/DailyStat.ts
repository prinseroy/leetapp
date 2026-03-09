import mongoose, { Schema, Document } from 'mongoose';

export interface IDailyStat extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  problemsSolved: number;
  totalSubmissions: number;
  acceptedSubmissions: number;
  acceptanceRate: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

const DailyStatSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  problemsSolved: { type: Number, default: 0 },
  totalSubmissions: { type: Number, default: 0 },
  acceptedSubmissions: { type: Number, default: 0 },
  acceptanceRate: { type: Number, default: 0 },
  easySolved: { type: Number, default: 0 },
  mediumSolved: { type: Number, default: 0 },
  hardSolved: { type: Number, default: 0 },
}, { timestamps: true });

DailyStatSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model<IDailyStat>('DailyStat', DailyStatSchema);
