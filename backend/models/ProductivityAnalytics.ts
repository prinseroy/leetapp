import mongoose, { Schema, Document } from 'mongoose';

export interface IProductivityAnalytics extends Document {
  userId: mongoose.Types.ObjectId;
  productivityScore: number;
  consistencyScore: number;
  difficultyScore: number;
  bestTimeOfDay: string; // e.g., '8PM-11PM'
  insights: string[];
  reportDate: Date;
}

const ProductivityAnalyticsSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productivityScore: { type: Number, default: 0 },
  consistencyScore: { type: Number, default: 0 },
  difficultyScore: { type: Number, default: 0 },
  bestTimeOfDay: { type: String, default: 'N/A' },
  insights: [{ type: String }],
  reportDate: { type: Date, default: Date.now }
}, { timestamps: true });

ProductivityAnalyticsSchema.index({ userId: 1, reportDate: 1 }, { unique: true });

export default mongoose.model<IProductivityAnalytics>('ProductivityAnalytics', ProductivityAnalyticsSchema);
