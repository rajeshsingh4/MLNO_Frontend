import React from "react";
import ChartPie from './Chart'
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const DashBoard = () => {
  return (
    <div className="container">
      <h3> Dashboard</h3>
      <Grid container spacing={3}>
        <Grid xs={12} sm={4}>
          <ChartPie />
        </Grid>
        <Grid xs={12} sm={4}>
          <ChartPie />
        </Grid>
        <Grid xs={12} sm={4}>
          <ChartPie />
        </Grid>
        <Grid xs={12} sm={4}>
          <ChartPie />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashBoard;
