'use client';
import React from 'react';
import VideoPreview from "@/components/VideoPreview";
import SideBar from "@/components/SideBar";
import { Grid, Box, Button, Paper, Typography} from "@mui/material";
import { useState, createContext } from 'react';

export default function PreviewPage({children, params}){
    const { filename } = React.use(params, null); // should this be props?

    if (!filename){
        return <Typography variant='caption' color='secondary'>Loading Videos...</Typography>;
    }

    console.log("PARAMETER FILENAME: " + filename)

    // TODO: Use context to send and get data from videosettings
    // // Create context 
    // const SettingsContext = createContext(undefined);

    // // create context wrapper
    // const SettingsProvider = ({ children }) => {
    // // set states - default threshold 0, default color black
    // // const filename = params.filename
    // const { threshold, setThreshold } = useState(0)
    // const { color, setColor } = useState("#ffffff");
    // }


    async function postVideo() {
        // post data with ...
            // filename
            // color
            // threshold
    }
    
    return (
        <Paper elevation={4} sx={{m: 2, p: 2}}>
            <Typography variant='h4' component='h1'>Video Preview</Typography>
            <Grid container spacing={2} sx={{justifyContent:"space-between"}}>
            
            {/* The left side of the grid has the original frame and the binarized frame */}
                <Grid size={8} sx={{padding:2}}>
                    <VideoPreview filename={filename}/>
                </Grid>

                {/* The right side of the grid has sidebar tools that adjust the settings and the process video button */}
                <Grid size={4} sx={{padding:2}}>
                    <SideBar filename={filename} />
                    
                </Grid>

            </Grid>
            {/* <Button href={`/result/${filename}`}>Temp Link to Result Page</Button> */}
        </Paper>
                
            
    );
    {/* <SettingsContext.Provider value={ {filename, color, threshold} }> */}
                
            {/* </SettingsContext.Provider> */}
}