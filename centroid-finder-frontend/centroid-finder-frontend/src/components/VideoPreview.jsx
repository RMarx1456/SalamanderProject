// Logical Component
// Children: Original Frame, Binarized Frame

import OriginalFrame from "./OriginalFrame"
import { Grid, Typography, Box } from '@mui/material';
import BinarizedFrameContainer from "./BinarizedFrameContainer";
import { useContext, useState, useEffect } from 'react';
import { SettingsContext } from "@/context/SettingsContext";

export default function VideoPreview({filename}) {
    // get filename, thumbnail, and thumbnail setter from Settings Context
    const { setFilename, thumbnail, setThumbnail } = useContext(SettingsContext);

    // Store filename in context on load or when it changes
    useEffect(() => {
        setFilename(filename);
    }, [filename, setFilename]);

    // GET thumbnail from api
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/thumbnail/${filename}`);
                
                // Check if the response is OK
                if (!response.ok) {
                    throw new Error('Failed to fetch thumbnail');
                }

                // Convert the response to a Blob
                const imageBlob = await response.blob();

                // Create an object URL from the Blob to use as a source for the <img> element
                const imageUrl = URL.createObjectURL(imageBlob);
                
                // Set the thumbnail state with the object URL
                setThumbnail(imageUrl);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [filename]);


    // Display text while video is loading
    if (!thumbnail) {
        return <Typography variant='caption' color='secondary'>Loading Video...</Typography>;
    }

    return(
        <Box style={{ margin:2}}>
            <Grid container spacing={2} sx={{justifyContent:"space-between"}}>
                <Grid size={6}>
                    <OriginalFrame/>
                </Grid>
                <Grid size={6}>
                    <BinarizedFrameContainer/>
                </Grid>
            </Grid>
        </Box>
    )
}