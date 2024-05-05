import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import JobCard from "../components/home/jobcard/JobCard.jsx";

const Home = ({ url, limit = 5 }) => {
  const [jobs, setJobs] = useState([]);
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
    if (url !== "") {
      fetchJobs(url);
    }
  }, [url]);

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

  if (errorMsg !== null) {
    <div>Error:{errorMsg}</div>;
  }

  console.log(jobs);

  return (
    <div style={{ padding: "1rem" }}>
      {loading ? (
        <Spinner />
      ) : jobs && jobs.length > 0 ? (
        <>
          <JobCard jobs={jobs} />
          {reachedEnd && <div>You have reached the end</div>}
        </>
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
};

export default Home;
