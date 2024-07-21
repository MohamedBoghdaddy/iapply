import { AppliedJob } from "../models/AppliedJobModel.js";
import { Subscription } from '../models/Subscription.js';

const getJobApplicationAnalytics = async (req, res) => {
  try {
    // Example of using req object (e.g., accessing query parameters)
    const userId = req.query.userId; // Assuming you want to filter analytics by userId from query params
    
    // Fetch and return job application analytics (e.g., count, success rate, trends)
    const analyticsData = await AppliedJob.aggregate([
      { $match: { status: "completed", userId: userId } }, // Example of using userId from req.query
      { $group: { _id: "$userId", totalApplications: { $sum: 1 } } },
      { $sort: { totalApplications: -1 } },
    ]);
    res.status(200).json(analyticsData);
  } catch (error) {
    console.error('Failed to fetch job application analytics:', error);
    res.status(500).json({ message: 'Failed to fetch job application analytics', error });
  }
};

const getSubscriptionAnalytics = async (req, res) => {
  try {
    // Example of using req object (e.g., accessing headers)
    const authToken = req.headers.authorization; // Assuming you want to access authorization header
    
    // Fetch and return subscription analytics (e.g., active subscriptions, revenue)
const analyticsData = await Subscription.aggregate([
  { $match: { isActive: true } },
  { $group: { _id: "$category", totalSubscriptions: { $sum: 1 } } },
  { $sort: { totalSubscriptions: -1 } },
]);
    res.status(200).json(analyticsData);
  } catch (error) {
    console.error('Failed to fetch subscription analytics:', error);
    res.status(500).json({ message: 'Failed to fetch subscription analytics', error });
  }
};

export { getJobApplicationAnalytics, getSubscriptionAnalytics };
