
import React from "react";
import "./DisplayApplied.css";

const DisplayApplied = ({
  serial,
  edu,
  exp,
  gender,
  skills
}) => {
  return (
    <div className="information">
      <section>{serial}</section>
      <section>{edu}</section>
      <section>{exp}</section>
      <section>{gender}</section>
      <section>{skills}</section>

      <section>
        <button>Selected</button>
        <button>Not Selected</button>
        <textarea
          className="notes-section"
          placeholder="Leave a note for further contact"
        />
      </section>
    </div>
  );
};

export default DisplayApplied;

