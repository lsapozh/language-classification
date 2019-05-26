import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from "@material-ui/core/LinearProgress";

const ResultsList = ({ predictions, title = "Results" }) => (
  <Grid item>
    <Typography variant="h5" >{title}</Typography>
    {predictions.map((item, i) => (
      <div key={i}>
        <Grid container direction="row" justify={"space-between"}>
          <Grid item>
            <Typography variant="overline">{item.name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="overline">
            {`${(item.result * 100).toFixed(1)} %`}
            </Typography>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" color={"primary"} value={item.result * 100} style={{minWidth: "300px", width: "100%"}}/>
      </div>
    ))}
  </Grid>
)

export default ResultsList