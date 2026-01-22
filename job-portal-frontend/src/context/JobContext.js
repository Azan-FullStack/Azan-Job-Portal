import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const JobContext = createContext();
const API = "https://azan-job-portal.onrender.com/api/jobs";

export const JobProvider = ({ children }) => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [userJobs, setUserJobs] = useState([]);

  // PUBLIC JOBS
  const fetchAllJobs = useCallback(async () => {
    try {
      const res = await axios.get(API);
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  }, []);

  // MY JOBS
  const fetchMyJobs = useCallback(async () => {
    if (!user?.token) return;

    try {
      const res = await axios.get(`${API}/my`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUserJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch my jobs", err);
    }
  }, [user?.token]);

  // ADD JOB
  const addJob = async (jobData) => {
    if (!user?.token) return alert("Login first");

    const res = await axios.post(API, jobData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    setJobs((prev) => [res.data, ...prev]);
    setUserJobs((prev) => [res.data, ...prev]);
  };

  // EDIT JOB
  const editJob = async (id, updatedJob) => {
    const res = await axios.put(`${API}/${id}`, updatedJob, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    setJobs((prev) => prev.map((j) => (j._id === id ? res.data : j)));
    setUserJobs((prev) => prev.map((j) => (j._id === id ? res.data : j)));
  };

  // DELETE JOB
  const deleteJob = async (id) => {
    await axios.delete(`${API}/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    setJobs((prev) => prev.filter((j) => j._id !== id));
    setUserJobs((prev) => prev.filter((j) => j._id !== id));
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        userJobs,
        fetchAllJobs,
        fetchMyJobs,
        addJob,
        editJob,
        deleteJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);



















