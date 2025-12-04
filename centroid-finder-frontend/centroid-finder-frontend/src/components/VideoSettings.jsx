// This component renders the video settings

// Parent -> SideBar
// children -> n/a
import { Slider, Tooltip, Typography, Paper} from '@mui/material'
import { useContext } from 'react';
import { SettingsContext } from "@/context/SettingsContext";

export default function VideoSettings(){
    // Access color, threshold, setter functions from Settings Context
    const { color, setColor, threshold, setThreshold } = useContext(SettingsContext);
    
    return (
        <Paper elevation={4} sx={{m: 2, p: 2}}>
            {/* A helpful tooltip about color */}
            <Tooltip title="Use the color picker to the color from the frame.">
                <Typography variant="body1" component="p">Set Color</Typography>
                <div>
                    {/* As the color input changes, the color state stored in Settings Context updates */}
                    <input type="color" id="colorvalue" name="colorvalue" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>
            </Tooltip>

            {/* A helpful tooltip about threshhold */}
            <Tooltip title="The threshold determines how closely the color needs to match to be considered part of the tracked object.">
                <Typography variant="body1" component="p">Set Threshold</Typography>
                {/* As the slider input changes, the threshold state stored in Settings Context updates */}
                <Slider value={threshold} aria-label="Default" valueLabelDisplay="auto" onChange={(e, newValue) => setThreshold(newValue)} />
            </Tooltip>
        </Paper>
        
    )
}