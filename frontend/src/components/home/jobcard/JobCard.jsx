import React from 'react'
import { Grid } from '@mui/material';
import JobSingleCard from "../JobSingleCard"
import './JobCard.css';

const JobCard = ({jobs}) => {
  return (
    <Grid container className="JobsCardGrid">
    {jobs.map((item) => (
      <Grid item key={item.jdUid} xs={12} sm={6} md={4} lg={3}>
        <JobSingleCard job={item} />
      </Grid>
    ))}
  </Grid>
  )
}

export default JobCard