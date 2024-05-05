import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const Home = ({ url, limit= 5, offset= 0 }) => {
  const [jobs, setJobs] = useState([]);
  const [Loading, setLoading] = useState(false);
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
    <div>
      <h1>Home</h1>
      <Spinner />
    </div>
  );
};

export default Home;
