import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import JobCard from "../components/home/jobcard/JobCard.jsx";


const Home = ({ url, limit = 5 }) => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedMinExp, setSelectedMinExp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedWorkType, setSelectedWorkType] = useState("");
  const [selectedMinSalary, setSelectedMinSalary] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [reachedEnd, setReachedEnd] = useState(false); //state to track if the end is reached

  async function fetchJobs(getUrl) {
    try {
      setLoading(true);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          limit: `${limit}`,
          offset: `${jobs.length}`, // Used the current length of jobs as offset
        }),
      };

      const response = await fetch(getUrl, requestOptions);
      const data = await response.json();
      console.log(data);

      if (data && data.jdList && data.jdList.length > 0) {
        setJobs([...jobs, ...data.jdList]);
        setLoading(false);
      } else {
        setReachedEnd(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "" && selectedRole === "" && selectedMinExp === "" && selectedLocation === "" && selectedWorkType === "" && selectedMinSalary === "") {
      fetchJobs(url);
    }
  }, [url, selectedRole, selectedMinExp, selectedLocation, selectedWorkType, selectedMinSalary]);

  function handleScrollPercentage() {
    const scrolledToBottom =
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) ===
      document.documentElement.offsetHeight;

    if (scrolledToBottom && !loading && !reachedEnd) {
      // Fetch new data only if not already loading and not reached end
      fetchJobs(url);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", handleScrollPercentage);
    };
  }, [loading, reachedEnd]);


  const searchJobs = jobs.filter((job) => {
    return Object.keys(job).some((key) =>
      job[key] &&
      job[key]
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase())
    ) && (selectedRole === "" || job.jobRole === selectedRole) && (selectedMinExp === "" || job.minExp >= selectedMinExp) && (selectedLocation === "" || job.location === selectedLocation) && (selectedWorkType === "" || (selectedWorkType === "Remote" ? job.location.toLowerCase() === "remote" : job.location.toLowerCase() !== "remote")) && (selectedMinSalary === "" || job.minJdSalary >= selectedMinSalary); 
  });

  // Get all unique roles in ascending order
  const roles = [...new Set(jobs.map((job) => job.jobRole))].sort();

  // Get all unique minimum experiences in ascending order
  const minExperiences = [...new Set(jobs.map((job) => job.minExp))].sort((a, b) => a - b);

  // Get all unique locations in ascending order
  const locations = [...new Set(jobs.map((job) => job.location))].sort();

  // Get all unique minimum base pay salaries in ascending order
  const minSalaries = [...new Set(jobs.map((job) => job.minJdSalary))].sort((a, b) => a - b);
  



  if (errorMsg !== null) {
    <div>Error:{errorMsg}</div>;
  }

  console.log(jobs);

  return (
    <div style={{ padding: "1rem" }}>
    <div style={{marginLeft:"1rem", marginBottom:"1.3rem"}}>

    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} style={{width:"12rem", height:"2.8rem", borderRadius:"0.5rem", border:"2px solid #d9d9d9", paddingLeft:"1rem", color:"gray"}}>
          <option value="">Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <select value={selectedMinExp} onChange={(e) => setSelectedMinExp(e.target.value)} style={{width:"12rem", height:"2.8rem", borderRadius:"0.5rem", border:"2px solid #d9d9d9", paddingLeft:"1rem", color:"gray", marginLeft:"0.8rem"}}>
          <option value="">Min Experience</option>
          {minExperiences.map((minExp) => (
            <option key={minExp} value={minExp}>
              {minExp}
            </option>
          ))}
        </select>

        <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} style={{width:"12rem", height:"2.8rem", borderRadius:"0.5rem", border:"2px solid #d9d9d9", paddingLeft:"1rem", color:"gray", marginLeft:"0.8rem"}}>
          <option value="">Location</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        <select value={selectedWorkType} onChange={(e) => setSelectedWorkType(e.target.value)} style={{width:"12rem", height:"2.8rem", borderRadius:"0.5rem", border:"2px solid #d9d9d9", paddingLeft:"1rem", color:"gray", marginLeft:"0.8rem"}}>
          <option value="">Work Type</option>
          <option value="Remote">Remote</option>
          <option value="Onsite">Onsite</option>
        </select>

        <select value={selectedMinSalary} onChange={(e) => setSelectedMinSalary(e.target.value)} style={{width:"13rem", height:"2.8rem", borderRadius:"0.5rem", border:"2px solid #d9d9d9", paddingLeft:"1rem", color:"gray", marginLeft:"0.8rem"}}>
          <option value="">Min Base Pay Salary</option>
          {minSalaries.map((minSalary) => (
            <option key={minSalary} value={minSalary}>
              {minSalary}
            </option>
          ))}
        </select>

    <input
            className="company-input"
            placeholder="Search Company Name, Job Role or Location"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            style={{width:"18rem", height:"2.5rem", borderRadius:"0.5rem", border:"2px solid #d9d9d9", paddingLeft:"1rem", color:"gray", marginLeft:"0.8rem"}}
          />
          </div>
       

      {loading ? (
        <Spinner />
      ) : jobs && jobs.length > 0 ? (
        <>
          <JobCard jobs={searchJobs} />
          {reachedEnd && <div>You have reached the end</div>}
        </>
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
};

export default Home;
