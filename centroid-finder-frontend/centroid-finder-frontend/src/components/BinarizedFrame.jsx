// This component renders the binarized frame

// Parent -> BinarizedFrameContainer
// children -> n/a

import { ImageList, ImageListItem, Typography, Paper } from "@mui/material"
import { useContext } from 'react'
import { SettingsContext } from "@/context/SettingsContext";


export default function BinarizedFrame({ binarizedSrc }){

    const { thumbnail, filename } = useContext(SettingsContext);

    if (!binarizedSrc) {
        return <p>No binarized image</p>;
    } 

    return (
        <Paper square color="primary" elevation={1} sx={{m: 2, p: 2}}>
            <ImageList  cols={1} rowHeight={450}>
                <ImageListItem>
                    <img src={binarizedSrc} alt="Binarized Frame" />
                </ImageListItem>
            </ImageList>
            <Typography variant="caption">Binarized Frame</Typography>
        </Paper>
    )
}