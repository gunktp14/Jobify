import Job from "../models/Job.mjs";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.mjs";
import checkPermissions from "../utils/checkPermissions.mjs";
import mongoose from "mongoose";
const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job wtih id : ${jobId}`);
  }

  // verify permissions
  console.log("ชนิดของ req.user.userId : ", typeof req.user.userId);
  console.log("ชนิดของ job.createdBy : ", typeof job.createdBy);

  checkPermissions(req.user, job.createdBy);

  //*alternative approach

  // const job = await Job.findOne({_id:jobId})

  // job.position = position2e
  // job.company = company
  // job.jobLocation = jobLocation
  // await job.save()

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  const jobId = id;

  const job = await Job.findOne({ _id: jobId });
  console.log(job);
  if (!job) {
    throw new NotFoundError(`No job with id:${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);
  await Job.deleteOne({ _id: jobId });

  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

const showStats = async (req, res) => {
  const createdBy = new mongoose.Types.ObjectId(req.user.userId);
  let stats = await Job.aggregate([
    { $match: { createdBy } }, 
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc,curr)=>{
    const {_id:title,count} = curr 
    acc[title] = count 
    return acc;
  },{})

  const defaultStats = {
    pending:stats.pending || 0,
    interview:stats.pending || 0,
    declined:stats.declined || 0,
  }
  let monthlyApplications = []
  res.status(StatusCodes.OK).json({ defaultStats,monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
