import mongoose, { Schema, Document } from 'mongoose';

export interface IFocusTracking extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  codingMinutes: number;
  learningMinutes: number;
  socialMediaMinutes: number;
  youtubeMinutes: number;
}

const FocusTrackingSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  codingMinutes: { type: Number, default: 0 },
  learningMinutes: { type: Number, default: 0 },
  socialMediaMinutes: { type: Number, default: 0 },
  youtubeMinutes: { type: Number, default: 0 },
}, { timestamps: true });

FocusTrackingSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model<IFocusTracking>('FocusTracking', FocusTrackingSchema);
