import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const JobContext = createContext();
const API = "http://azan-job-portal.onrender.com/api/jobs";


export const JobProvider = ({ children }) => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  







  

  const fetchAllJobs = useCallback(async () => {
    try {
      const res = await axios.get(API); // public jobs
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  }, []);

  const fetchMyJobs = useCallback(async () => {
    if (!user?.token) return;
    try {
      const res = await axios.get(`${API}/my`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUserJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch my jobs", err);
    }
  }, [user]);

  const addJob = async (jobData) => {
    if (!user?.token) return alert("Login first");
    try {
      const res = await axios.post(API, jobData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUserJobs(prev => [res.data, ...prev]);
      setJobs(prev => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      console.error("Failed to add job", err);
      alert("Failed to add job");
    }
  };

  const editJob = async (id, updatedJob) => {
    if (!user?.token) return alert("Login first");
    try {
      const res = await axios.put(`${API}/${id}`, updatedJob, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUserJobs(prev => prev.map(j => j._id === id ? res.data : j));
      setJobs(prev => prev.map(j => j._id === id ? res.data : j));
    } catch (err) {
      console.error("Failed to edit job", err);
    }
  };

  const deleteJob = async (id) => {
    if (!user?.token) return alert("Login first");
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUserJobs(prev => prev.filter(j => j._id !== id));
      setJobs(prev => prev.filter(j => j._id !== id));
    } catch (err) {
      console.error("Failed to delete job", err);
    }
  };

  

  return (
    <JobContext.Provider value={{
      jobs,
      userJobs,
      fetchAllJobs,
      fetchMyJobs,
      addJob,
      editJob,
      deleteJob,
      
  
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);


















