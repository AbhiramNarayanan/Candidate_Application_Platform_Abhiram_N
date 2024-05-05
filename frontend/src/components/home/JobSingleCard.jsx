import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import JobCardButton from "../JobCardButton";

const JobSingleCard = ({ job }) => {
  return (
    <div key={job.jdUid}>
      <h6>Posted 10 days ago</h6>
      <LazyLoadImage alt={job.companyName} src={job.logoUrl} effect="blur" />
      <h3>{job.companyName}</h3>
      <h2>{job.jobRole}</h2>
      <h4>{job.location}</h4>
      <h4>
        {job.minJdSalary !== null && job.maxJdSalary !== null
          ? `Estimated Salary: ${job.minJdSalary} to ${job.maxJdSalary} ${job.salaryCurrencyCode}`
          : job.minJdSalary === null && job.maxJdSalary === null
          ? `Salary Cap: Not mentioned`
          : `Salary Cap: ${job.maxJdSalary || job.minJdSalary} ${
              job.salaryCurrencyCode
            }`}
      </h4>

      <div>
        <h3>About Company:</h3>
        <h5>About us</h5>
        <p>
          {job.jobDetailsFromCompany.length > 100
            ? job.jobDetailsFromCompany.substring(0, 100) + "..."
            : job.jobDetailsFromCompany}
        </p>
        <div>
          <h5>Experience Required</h5>
          <h4>
            {job.minExp !== null && job.maxExp !== null
              ? `${job.minExp} - ${job.maxExp} years`
              : job.minExp === null && job.maxExp === null
              ? `Not mentioned`
              : `${job.maxExp || job.minExp} years`}
          </h4>
        </div>
        
        <JobCardButton label="Easy Apply" bgColor="#33ffd6" color={"black"} fontWeight={"bold"} url={job.jdLink}/>
        
        <JobCardButton label="Unlock referral asks" bgColor="#0A66C2"  color={"white"} url={job.jdLink}/>
       
      </div>
      <h5> </h5>
    </div>
  );
};

export default JobSingleCard;
