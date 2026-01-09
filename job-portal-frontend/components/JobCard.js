import React from "react";
import "./JobCard.css";

const JobCard = ({
  serial,
  jobTitle,
  jobDesc,
  jobSalary,
  jobWh,
  jobLocation,
  handleDelete,
  handleEdit,
  handleApply,
  showDelete = true,  // default: true
  showEdit = true     // default: true
}) => {
  return (
    <div className="job-card">
      <div className="job-serial">#{serial}</div>
      <div className="job-title">{jobTitle}</div>
      <div className="job-description">{jobDesc}</div>
      <div className="job-salary">{jobSalary}</div>
      <div className="job-working-hours">{jobWh}</div>
      <div className="job-location">{jobLocation}</div>

      {showDelete && handleDelete && (
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      )}

      {showEdit && handleEdit && (
        <button className="edit-btn" onClick={handleEdit}>
          Edit
        </button>
      )}

      {handleApply && (
        <button className="apply-btn2" onClick={handleApply}>
          Apply
        </button>
      )}
    </div>
  );
};

export default JobCard;

