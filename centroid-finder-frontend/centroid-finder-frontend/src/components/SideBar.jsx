// This component renders the sidebar 
// Parent -> main
// children -> VideoSettings, VideoActions

import VideoSettings from "./VideoSettings";
import VideoActions from "./VideoActions";
import { Paper } from '@mui/material'

export default function SideBar({ filename }){
    return (
        <div>
            <VideoSettings />
            <VideoActions filename={filename}/>
        </div>
        
    )
}