import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import JobCardButton from "../../JobCardButton";
import { FcCalendar } from "react-icons/fc";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaUserLock } from "react-icons/fa";
import "./JobSingleCard.css";
import { TiTick } from "react-icons/ti";

const JobSingleCard = ({ job }) => (
  <div key={job.jdUid} className="singleCardContainer">
    <div
      className="calendar-container"
      style={{ width: "7.5rem", height: "1.6rem", marginBottom: "1rem" }}
    >
      <FcCalendar />
      <p className="calendar-text">Posted 10 days ago</p>
    </div>
    <div className="company-container">
      <LazyLoadImage
        alt={job.companyName}
        src={job.logoUrl}
        className="company-image"
        effect="blur"
      />
      <div className="company-basic-details">
        <h3 className="company-name">{job.companyName}</h3>
        <h2 className="job-role">
          {job.jobRole.charAt(0).toUpperCase() + job.jobRole.slice(1)}
        </h2>

        <h4 className="job-location">
          {job.location.charAt(0).toUpperCase() + job.location.slice(1)}
        </h4>
      </div>
    </div>
    <h4 className="job-salary">
      {job.minJdSalary !== null && job.maxJdSalary !== null ? (
        <>
          Estimated Salary: {job.minJdSalary} to {job.maxJdSalary}{" "}
          {job.salaryCurrencyCode} <TiTick  color="white" style={{backgroundColor:"#2eb82e", borderRadius:"0.2rem"}}/>
        </>
      ) : job.minJdSalary === null && job.maxJdSalary === null ? (
        `Salary Cap: Not mentioned`
      ) : (
        <>
          Salary Cap: {job.maxJdSalary || job.minJdSalary}{" "}
          {job.salaryCurrencyCode} <TiTick color="white" style={{backgroundColor:"#2eb82e", borderRadius:"0.2rem"}}/>
        </>
      )}
    </h4>

    <div className="company-details">
      <h3>About Company:</h3>
      <h5>About us</h5>
      <p>
        {job.jobDetailsFromCompany.length > 150
          ? job.jobDetailsFromCompany.substring(0, 150) + "..."
          : job.jobDetailsFromCompany}
      </p>
      <a href={job.jdLink}>View job</a>
    </div>
      <div>
        <h5 className="experience-heading">Experience Required</h5>
        <h4 className="experience">
          {job.minExp !== null && job.maxExp !== null
            ? `${job.minExp} - ${job.maxExp} years`
            : job.minExp === null && job.maxExp === null
            ? `Not mentioned`
            : `${job.maxExp || job.minExp} years`}
        </h4>
      </div>

      <JobCardButton
        icon={
          <AiFillThunderbolt
            color="#ffff80"
            style={{ margin: "auto 0.3rem" }}
          />
        }
        label="Easy Apply"
        bgColor="#33ffd6"
        color={"black"}
        fontWeight={"bold"}
        url={job.jdLink}
      />

      <JobCardButton
        icon={<FaUserLock color="#1a1a1a" style={{ margin: "auto 0.3rem" }} />}
        label="Unlock referral asks"
        bgColor="#4747d1"
        color={"white"}
        url={job.jdLink}
      />
    
    
  </div>
);

export default JobSingleCard;
