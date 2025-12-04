import Link from 'next/link';

// This component renders a video on the video page
// Should route to the preview/filename if on click

// the video info will be passed as a prop
export default function Video(props) {
    return(
        <li key={props.filename}>
            <Link href={`/preview/${props.filename}`}>{props.filename}</Link> 
        </li>
    )  
}
