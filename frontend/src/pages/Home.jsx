import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import JobCard from "../components/home/jobcard/JobCard.jsx";


const Home = ({ url, limit = 5 }) => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
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
    if (url !== "" && selectedRole === "") {
      fetchJobs(url);
    }
  }, [url, selectedRole]);

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
    ) && (selectedRole === "" || job.jobRole === selectedRole); 
  });

  // Get all unique roles in ascending order
  const roles = [...new Set(jobs.map((job) => job.jobRole))].sort();
  



  if (errorMsg !== null) {
    <div>Error:{errorMsg}</div>;
  }

  console.log(jobs);

  return (
    <div style={{ padding: "1rem" }}>
    <div style={{marginLeft:"1rem"}}>

    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} style={{width:"10rem", height:"2.8rem", borderRadius:"0.5rem", border:"2px solid #d9d9d9", paddingLeft:"1rem", color:"gray"}}>
          <option value="">Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
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
