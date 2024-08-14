import AppliedJob from "../models/AppliedJobModel.js";

export const handler = async (event) => {
  const { userId, jobDetails } = JSON.parse(event.body);

  try {
    const appliedJob = new AppliedJob({
      userId,
      companyName: jobDetails.companyName,
      jobTitle: jobDetails.jobTitle,
      location: jobDetails.location,
      jobDescription: jobDetails.jobDescription,
    });

    const savedJob = await appliedJob.save();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Job application successful",
        appliedJob: savedJob,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
