import React, { useState, useEffect } from "react";
import { useJobs } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";
import JobCard from "./JobCard";
import "./CreateJobs.css";

const CreateJobs = () => {
  const { userJobs, addJob, editJob, deleteJob, fetchMyJobs } = useJobs();
  const { user } = useAuth();

  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [jobWh, setJobWh] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!user) return;
    fetchMyJobs();
  }, [user, fetchMyJobs]);

  const handleAddOrUpdateJob = async () => {
    if (!jobTitle || !jobDesc) return alert("Please fill required fields");
    const jobData = { jobTitle, jobDesc, jobSalary, jobWh, jobLocation };

    if (editingId) {
      await editJob(editingId, jobData);
      setEditingId(null);
    } else {
      await addJob(jobData);
    }

    fetchMyJobs(); // refresh
    setJobTitle(""); setJobDesc(""); setJobSalary(""); setJobWh(""); setJobLocation("");
  };

  const handleEditClick = (job) => {
    setJobTitle(job.jobTitle);
    setJobDesc(job.jobDesc);
    setJobSalary(job.jobSalary);
    setJobWh(job.jobWh);
    setJobLocation(job.jobLocation);
    setEditingId(job._id);
  };

  if (!user) return <p>Loading user info...</p>;

  return (
    <>
      <div className="welcome-section">
        <h1>Welcome, {user.username}! Create jobs to find employees</h1>
      </div>

      <div className="create-job-card">
        <input placeholder="Job Title" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
        <input placeholder="Job Description" value={jobDesc} onChange={e => setJobDesc(e.target.value)} />
        <input placeholder="Salary" value={jobSalary} onChange={e => setJobSalary(e.target.value)} />
        <input placeholder="Working Hours" value={jobWh} onChange={e => setJobWh(e.target.value)} />
        <input placeholder="Location" value={jobLocation} onChange={e => setJobLocation(e.target.value)} />
        <button onClick={handleAddOrUpdateJob}>{editingId ? "Update Job" : "Create Now"}</button>
      </div>

      <div className="jobs-list">
        {userJobs.length === 0 && <p>No jobs posted yet</p>}
        {userJobs.map((job, index) => (
          <JobCard
            key={job._id}
            serial={index + 1}
            {...job}
            handleEdit={() => handleEditClick(job)}
            handleDelete={() => deleteJob(job._id)}
          />
        ))}
      </div>
    </>
  );
};

export default CreateJobs;

















