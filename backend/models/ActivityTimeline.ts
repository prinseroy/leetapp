import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityTimeline extends Document {
  userId: mongoose.Types.ObjectId;
  eventType: 'ProblemSolved' | 'ContestParticipation' | 'GithubCommit' | 'CodingSession' | 'LearningActivity';
  description: string;
  platform: string;
  timestamp: Date;
}

const ActivityTimelineSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  eventType: { 
    type: String, 
    enum: ['ProblemSolved', 'ContestParticipation', 'GithubCommit', 'CodingSession', 'LearningActivity'], 
    required: true 
  },
  description: { type: String, required: true },
  platform: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

ActivityTimelineSchema.index({ userId: 1, timestamp: -1 });

export default mongoose.model<IActivityTimeline>('ActivityTimeline', ActivityTimelineSchema);
