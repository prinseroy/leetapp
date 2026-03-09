import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import DailyStat from '../models/DailyStat';
import CodingProfile from '../models/CodingProfile';
import ActivityTimeline from '../models/ActivityTimeline';
import CodingStreak from '../models/CodingStreak';
import { generateProductivityInsights } from '../services/analytics';

const router = Router();

router.get('/stats', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.userId;
    // Generate mock daily stats if not exists
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let stat = await DailyStat.findOne({ userId, date: today }).lean();
    if (!stat) {
      const newStat = new DailyStat({
        userId,
        date: today,
        problemsSolved: 0,
        totalSubmissions: 0,
        acceptedSubmissions: 0,
        acceptanceRate: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
      });
      await newStat.save();
      stat = newStat.toObject();
    }

    // Calculate Total Solved across all platforms
    const profiles = await CodingProfile.find({ userId });
    const totalSolved = profiles.reduce((acc, profile) => acc + profile.totalSolved, 0);

    // Get weekly activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const weeklyStats = await DailyStat.find({ 
      userId, 
      date: { $gte: sevenDaysAgo } 
    }).sort({ date: 1 });

    const chartData = weeklyStats.map(s => ({
      name: s.date.toLocaleDateString('en-US', { weekday: 'short' }),
      problems: s.problemsSolved,
      submissions: s.totalSubmissions
    }));

    // If less than 7 days, pad with empty data
    while (chartData.length < 7) {
      chartData.unshift({ name: 'N/A', problems: 0, submissions: 0 });
    }

    res.json({ 
      ...stat, 
      totalSolved, 
      chartData,
      difficultyData: [
        { name: 'Easy', count: stat.easySolved || 0, fill: '#10B981' },
        { name: 'Medium', count: stat.mediumSolved || 0, fill: '#F59E0B' },
        { name: 'Hard', count: stat.hardSolved || 0, fill: '#EF4444' }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/timeline', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const timeline = await ActivityTimeline.find({ userId: req.user?.userId })
      .sort({ timestamp: -1 })
      .limit(20);
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/goals', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const Goal = require('../models/Goal').default;
    const goals = await Goal.find({ userId: req.user?.userId });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching goals' });
  }
});

router.get('/achievements', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const Achievement = require('../models/Achievement').default;
    const achievements = await Achievement.find({ userId: req.user?.userId });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching achievements' });
  }
});

router.get('/insights', authMiddleware, async (req: AuthRequest, res) => {
  try {
    if (!req.user?.userId) return res.status(401).json({message: "Unauthorized"});
    const insights = await generateProductivityInsights(req.user.userId);
    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
