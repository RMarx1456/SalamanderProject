// Presentational Component
// Parent: Video Preview


import { ImageList, ImageListItem, Typography, Paper } from '@mui/material';
import { useContext } from 'react'
import { SettingsContext } from "@/context/SettingsContext";

export default function OriginalFrame() {

    const { thumbnail, filename } = useContext(SettingsContext);

    return (
        <Paper square elevation={1} sx={{m: 2, p: 2}}>
            
            <ImageList  cols={1} rowHeight={450}>
                <ImageListItem>
                    <img src={thumbnail} alt="Original Frame" />
                </ImageListItem>
            </ImageList>
            <Typography variant="caption">{filename}</Typography>
            
        </Paper>
    );

}