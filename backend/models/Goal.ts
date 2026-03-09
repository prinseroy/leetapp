import mongoose, { Schema, Document } from 'mongoose';

export interface IGoal extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  goalType: 'DailyProblems' | 'MaintainStreak' | 'ContestsMonthly' | 'Custom';
  targetValue: number;
  currentValue: number;
  deadline: Date;
  status: 'Active' | 'Completed' | 'Failed';
}

const GoalSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  goalType: { 
    type: String, 
    enum: ['DailyProblems', 'MaintainStreak', 'ContestsMonthly', 'Custom'], 
    required: true 
  },
  targetValue: { type: Number, required: true },
  currentValue: { type: Number, default: 0 },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Completed', 'Failed'], default: 'Active' }
}, { timestamps: true });

export default mongoose.model<IGoal>('Goal', GoalSchema);
