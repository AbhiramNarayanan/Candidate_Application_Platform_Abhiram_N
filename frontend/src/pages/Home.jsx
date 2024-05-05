import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import JobCard from "../components/home/jobcard/JobCard.jsx"


const Home = ({ url, limit= 5, offset= 0 }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function fetchJobs(getUrl) {
    try {
      setLoading(true);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        limit: `${limit}`,
        offset: `${offset}`,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };
      const response = await fetch(`${getUrl}`, requestOptions);
      const data = await response.json();
      console.log(data)

      if(data && data.jdList && data.jdList.length >0){
        setJobs(data.jdList)
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setLoading(false)
    }
  }

  useEffect(() => {
    if (url !== "") {
      fetchJobs(url);
    }
  }, [url]);

  if (errorMsg !== null) {
    <div>Error:{errorMsg}</div>;
  }

  console.log(jobs)
  

  return (
    <div style={{padding:"1rem"}}>
    {loading ? (
        <Spinner />
      ) : 

      (
        jobs && jobs.length > 0 ?(
        <JobCard jobs ={jobs}/>
        ):
        (
          <div>No data found</div>
        )
      
      )
      }
      
    </div>
  );
};

export default Home;
