import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useApplications } from "../context/ApplicationContext";
import { useJobs } from "../context/JobContext";
import JobCard from "./JobCard";
import DisplayApplied from "./DisplayApplied";
import "./profile.css";

const Profile = () => {
  const { user } = useAuth();
  const { userJobs, fetchMyJobs } = useJobs();
  const { appliedJobs, fetchApplications } = useApplications();

  // Fetch jobs and applications when user logs in
  useEffect(() => {
    if (!user) return;
    fetchMyJobs();
    fetchApplications();
  }, [user, fetchMyJobs, fetchApplications]);

  // Guard: show message if user not logged in
  if (!user) return <p>Please login to view your profile.</p>;

  // Guard: show loading if jobs not yet fetched
  if (!userJobs || !appliedJobs) return <p>Loading...</p>;

  return (
    <div className="profile-section">
      <h2>Your Posted Jobs</h2>

      {userJobs
        .filter(job => job) // filter out null jobs
        .map((job, index) => (
          <div key={job._id} className="job-card-with-applicants">
            <JobCard serial={index + 1} {...job} />

            <h3>Applicants for this job:</h3>

            {appliedJobs
              .filter(application => application?.job?._id?.toString() === job._id.toString()) // ✅ safe
              .map((application, i) => (
                <DisplayApplied
                  key={application._id}
                  serial={i + 1}
                  edu={application.edu}
                  exp={application.exp}
                  gender={application.gender}
                  skills={application.skills}
                />
              ))}

            {appliedJobs.filter(application => application?.job?._id?.toString() === job._id.toString()).length === 0 && (
              <p>No applicants yet</p>
            )}
          </div>
        ))}
    </div>
  );
};

export default Profile;










