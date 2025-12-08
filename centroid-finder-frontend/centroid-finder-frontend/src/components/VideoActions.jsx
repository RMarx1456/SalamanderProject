// This component renders "run" and "pick a different video" buttons

// Parent -> SideBar
// children -> n/a

import { Button, Paper} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { useContext, useEffect, useState} from 'react'
import { SettingsContext } from "@/context/SettingsContext";
import CircularProgress from '@mui/material/CircularProgress';
import { ControlPointSharp } from '@mui/icons-material';

export default function VideoActions(){

    // get filename, color, and threshold states fron the Settings Context
    const { filename, color, threshold } = useContext(SettingsContext);
    const encodedColor = encodeURIComponent(color);
    const encodedThreshold = encodeURIComponent(threshold);

    // submit button loading state - from MUI Button Documentation
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = useState('');
    const [jobId, setJobId] = useState(null);


    // Handle the video processing button click
    const handleProcess = async () => {

      // try catch
      try {
        // Logging the post request
        console.log("Sending URL:", `${process.env.NEXT_PUBLIC_API_BASE_URL}/process/${filename}?targetColor=${encodedColor}&threshold=${encodedThreshold}`);

        // POST request to start processing (with filename, color, and threshold)
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/process/${filename}?targetColor=${encodedColor}&threshold=${encodedThreshold}`,
            { method: 'POST' }
        );

        if (!response.ok) {
          throw new Error("Processing failed!");
        }

        const jobData = await response.json();
        setJobId(jobData.jobId);

        // Set status to "processing" once the job starts
        setStatus('processing'); 

        // Start loading indicator
        setLoading(true); 

      } catch (error) {
        console.error(error);
        alert("An error occurred while processing the video.");
      }
    };


    useEffect(() => {
      if (jobId && loading) {
        const interval = setInterval(async () => {
          try {
            // Get the status of the processing job
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/process/${jobId}/status`);
            const data = await response.json();

            if (data.status === 'done') {
              setStatus('done');
              setLoading(false); // Stop loading
              clearInterval(interval); // Stop polling once it's done

              // Redirect to results page
              window.location.href = `/result/${filename}`;
            } else {
              setStatus('processing');
            }

          } catch (error) {
            console.error('Error fetching status:', error);
            setLoading(false); // Stop loading on error
            clearInterval(interval); // Stop polling on error
          }
        }, 1000); // Check every second

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
      }
    }, [jobId, loading]);

    return (
      <Paper elevation={4} sx={{ m: 2, p: 2 }}>
        <Button
          onClick={() => {
            setStatus(''); // Reset status before starting
            handleProcess();
          }}
          disabled={loading}
          variant="contained"
          color="secondary"
          sx={{ width: 1, my: 1 }}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Processing...' : 'Process Video'}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          href="/videos"
          sx={{ width: 1, my: 1 }}
        >
          Back to Videos
        </Button>
      </Paper>
    );

}