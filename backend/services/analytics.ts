import ProductivityAnalytics from '../models/ProductivityAnalytics';

export const generateProductivityInsights = async (userId: string) => {
  // Example AI analytics algorithm simulation
  
  const bestTimeSlots = ['8AM-11AM', '2PM-5PM', '8PM-11PM'];
  const bestTimeOfDay = bestTimeSlots[Math.floor(Math.random() * bestTimeSlots.length)];
  
  const insights = [
    `You solve most problems between ${bestTimeOfDay}`,
    `Your Medium problem success rate improved by ${Math.floor(Math.random() * 20 + 5)}%`,
    `Your coding streak is increasing this week. Keep it up!`,
    `You spend 60% of your time coding and 40% learning.`
  ];

  const productivityScore = Math.floor(Math.random() * 30 + 70); // 70-100
  const consistencyScore = Math.floor(Math.random() * 40 + 60);

  const analytics = new ProductivityAnalytics({
    userId,
    productivityScore,
    consistencyScore,
    difficultyScore: 85,
    bestTimeOfDay,
    insights,
    reportDate: new Date()
  });

  await analytics.save();

  return analytics;
};
