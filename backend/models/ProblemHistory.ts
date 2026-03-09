import mongoose, { Schema, Document } from 'mongoose';

export interface IProblemHistory extends Document {
  userId: mongoose.Types.ObjectId;
  profileId: mongoose.Types.ObjectId;
  problemId: string;
  problemName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  solvedAt: Date;
}

const ProblemHistorySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  profileId: { type: Schema.Types.ObjectId, ref: 'CodingProfile', required: true },
  problemId: { type: String, required: true },
  problemName: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  tags: [{ type: String }],
  solvedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<IProblemHistory>('ProblemHistory', ProblemHistorySchema);
