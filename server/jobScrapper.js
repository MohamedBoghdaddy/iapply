// jobScraper.js
const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeJobs() {
  try {
    const { data } = await axios.get("https://example-job-board.com");
    const $ = cheerio.load(data);

    const jobs = [];
    $(".job-listing").each((index, element) => {
      const job = {
        title: $(element).find(".job-title").text(),
        company: $(element).find(".company-name").text(),
        location: $(element).find(".job-location").text(),
        description: $(element).find(".job-description").text(),
      };
      jobs.push(job);
    });

    return jobs;
  } catch (error) {
    console.error("Error scraping jobs:", error);
    throw error;
  }
}

module.exports = { scrapeJobs };
