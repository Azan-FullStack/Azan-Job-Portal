import React, { useState } from "react";
import { useApplications } from "../context/ApplicationContext";
import "./ApplyJobs.css";

const ApplyJobs = ({ close, jobId }) => {
  const { applyForJob } = useApplications();

  const [edu, setEdu] = useState("");
  const [exp, setExp] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");

  const apply = async () => {
    if (!edu || !exp) {
      alert("Please fill required fields");
      return;
    }

    
      const applicationData = {
      jobId,
      edu,
      exp,
      gender,
      skills
    };

    await applyForJob(applicationData);

    setEdu("");
    setExp("");
    setGender("");
    setSkills("");
    close();
  };

  return (
    <div className="apply-section">
      <textarea
        placeholder="Education"
        value={edu}
        onChange={(e) => setEdu(e.target.value)}
      />
      <textarea
        placeholder="Experience"
        value={exp}
        onChange={(e) => setExp(e.target.value)}
      />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <textarea
        placeholder="Skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <button onClick={apply}>Apply Now</button>
      <button onClick={close}>Cancel</button>
    </div>
  );
};

export default ApplyJobs;





