'use client';
import { Paper, Typography } from '@mui/material'

export default function PreviewPage({children}){
  return (
    <Paper elevation={1} sx={{m: 2, p: 2}}>
      <Typography variant="h4" component="h1">
          About
      </Typography>

      {/* We'll add styling components here after I (Tyler) type up some instructions and blurbs about the project */}
      <h2>Welcome to the Salamander Finder!</h2>
      <br /> 
      <h4>
        This program is designed to help salamander researchers from Ohio State University track and record data of salamanders. 
        Using computer vision, the system processes video footage to identify and follow the movement of individual salamanders in a controlled environment. 
        It calculates their centroids and logs positional data into CSV files for further analysis. 
        The goal is to automate and streamline data collection, enabling researchers to study movement patterns, behavior, and environmental responses more efficiently.
      </h4>
      <br />
  
      <p>
        <a id="sal-vid" href="https://www.youtube.com/watch?v=GppCj4Al7Rg">
          A Deep Look of the Salamander Family splitting
        </a>
      </p>
      <br />
  
      {/* <h4>How do I use this program?</h4>
      <h4 style={{ marginTop: "1rem" }}>Instructions:</h4>
      <ol style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}> 
        <li style={{ fontWeight: "bold" }}> Do </li>
        <li style={{ fontWeight: "bold" }}> Some </li>
        <li style={{ fontWeight: "bold" }}> Logic </li>
      </ol> */}
    </Paper>
  );
}