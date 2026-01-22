
import React, { useState, useEffect } from "react";
import { useJobs } from "../context/JobContext";
import JobCard from "./JobCard";
import ApplyJobs from "./ApplyJobs";
import "./Jobs.css";

const Jobs = () => {
  const { jobs, fetchAllJobs } = useJobs(); // fetchAllJobs gets all jobs from backend
  const [applyingJobId, setApplyingJobId] = useState(null);

  // 🔹 Fetch all jobs on component mount
  useEffect(() => {
    fetchAllJobs();
  }, [fetchAllJobs]);


  console.log(jobs);
  

  return (
    
    <div className="job-display-section">
      <h1>All Posted Jobs in the Market</h1>
      {jobs.length === 0 && <p>No jobs available yet</p>}

      {jobs.map((job, index) => (
        <div key={job._id}>
          <JobCard
            serial={index + 1}
            {...job}
            handleApply={() => setApplyingJobId(job._id)}
          />
          {applyingJobId === job._id && (
            <ApplyJobs
              close={() => setApplyingJobId(null)}
              jobId={job._id}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Jobs;





