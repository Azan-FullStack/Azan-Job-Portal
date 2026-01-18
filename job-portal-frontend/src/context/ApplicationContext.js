import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const ApplicationContext = createContext();
const API = "http://azan-job-portal.onrender.com/api/applications";

export const ApplicationProvider = ({ children }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  const applyForJob = async (applicationData) => {
    const res = await axios.post(API, applicationData);
    setAppliedJobs(prev => [res.data, ...prev]);
  };

  const fetchApplications = useCallback(async () => {
    const res = await axios.get(API);
    setAppliedJobs(res.data);
  }, []);   

  return (
    <ApplicationContext.Provider
      value={{ applyForJob, fetchApplications, appliedJobs }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => useContext(ApplicationContext);








