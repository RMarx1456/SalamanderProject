'use client'
import { Box, Button, Grid, Icon, List, ListItem, ListItemIcon, ListItemText, Typography, Paper} from "@mui/material";
import Image from 'next/image';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import { useState, useEffect } from 'react';

export default function Home() {
  const [randomNum, setRandomNum] = useState(Math.random());

  useEffect (() => {
    setRandomNum(Math.random());
  }, []);

  // Handle Image Change on Hover
  const[imageSrc, setImageSrc] = useState('/splat-orange.PNG');
  const hoverImageSrc = '/salamander-orange.ico';

  const handleMouseEnter = () => {
    setImageSrc(hoverImageSrc);
  };

  const handleMouseLeave = () => {
    setImageSrc('/splat-orange.PNG')
  }


  return (
    <Paper elevation={4} sx={{m: 2, p: 2}}>
      <Grid container spacing={2} sx={{justifyContent:"space-between"}}>

      {/* The left side of the grid has a list of simple istructions for starting the app */}
        <Grid size={7} sx={{ margin: 3 }}>
          <Typography variant="h4" component="h1">
            Instructions
          </Typography>
          <Typography variant="body1" component="p">
            This app processes an mp4 video, returning a CSV of the location of a centroid at every one second interval.
          </Typography>
            <List>

              <ListItem>
                <ListItemIcon>
                  <LooksOneIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  Select a video
                </ListItemText>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <LooksTwoIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  Select a target color and a threshold.
                </ListItemText>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Looks3Icon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  Process and download CSV results.
                </ListItemText>
              </ListItem>

            </List>
            
              <Button variant="contained" color="primary" href="/videos">Start</Button>
            
            
          <br />
        </Grid>

        {/* The right side of the grid has a logo and Latin motto */}
        <Grid size={3} sx={{ margin: 2, justifyContent: "right", alignItems: "right"}} >
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <Image src={imageSrc} width="200" height="200" alt="logo"></Image>
          </div>
          <br />
          <Typography variant="subtitle1" component="h6">
              <em>Inveniamus Ensantinas</em>
              <br/>
              Let's find Salamanders
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
