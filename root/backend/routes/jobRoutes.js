const express = require("express");
const { spawn } = require("child_process");
const Job = require("../models/jobModel");

const router = express.Router();

router.post("/apply", async (req, res) => {
  const { profile, jobDescription } = req.body;

  const python = spawn("python", [
    "../ai/JobMatching.py",
    JSON.stringify(profile),
    JSON.stringify(jobDescription),
  ]);

  python.stdout.on("data", (data) => {
    console.log("Pipe data from Python script ...");
    const coverLetter = data.toString();
    res.status(200).json({ coverLetter });
  });

  python.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
  });
});

module.exports = router;
