'use client';
import Video from '@/components/Video';
import { SettingsContext } from "@/context/SettingsContext";
import { Button, List, ListItem, Typography, Box, Paper } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

export default function VideoChooserPage({children}){

    // Temporary Data until we get an api route to paste here or whatever we use to retrieve data from Docker
    // const sampleVideoData = ['video1.mp4', 'video2.mp4', 'video3.mp4'];

    // Get setFilename function from Settings Context
    const { setFilename } = useContext(SettingsContext);
    // Create myVideos state to hold an array of available videos
    const [myVideos, setMyVideos] = useState([]);

    // This useEffect runs once when the page loads, it fetches a list of videos from the api
    useEffect(() => {
        // fetch call to get list of all available videos
        const fetchData = async () => {
        try {
            const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/videos`);
            const data = await response.json();
            console.log(data);

            // set videos state to contain each video returned from fetch call
            setMyVideos(data.map(video => video.video));

            console.log("Sample videos: ", sampleVideoData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
        fetchData();
    }, [])
    
    return (
        <Paper elevation={4} sx={{m: 2, p: 2}}>
            <Box sx={{ padding:2 }}>
                <Typography variant="h4" component="h1">Select a video</Typography>
                <Typography variant="body1" component="body1">Listed below are the videos available for processing.</Typography>
                <List disablePadding="true">

                    {/* While videos is loading, display "Loading videos...", then display all videos found */}
                    {myVideos.length > 0 ? (
                        myVideos.map((filename, index) => (
                            <ListItem key={index}>
                                {/* When this button is clicked, it sets filenname to the name of the selected video */}
                                <Button variant="outlined" onClick={() => setFilename(filename)} href={`/preview/${filename}`}>{filename}</Button>
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant='caption' color='secondary'>Loading Videos...</Typography>
                    )}
                </List>    
            </Box>
        </Paper>   
    );
}