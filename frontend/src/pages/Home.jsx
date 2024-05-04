import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner"

const Home = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    limit: 10,
    offset: 0,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };
  useEffect(() => {
    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }, []);
  return <div>
  <h1>Home</h1>
  <Spinner/>
  </div>;
};

export default Home;
