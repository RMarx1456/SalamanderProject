# centroid-finder-frontend
A simple web app for uploading a video, selecting a color and threshold, and generating a CSV file showing the centroid location of the largest area of that color per second.

## Project Overview
This frontend lets you:
- Pick a video file
- Choose a target color and threshold
- Run the processor to analyze the video
- Download a CSV file with the results

## Setup Instructions
1. Set up the server and processor backend.

This frontend depends on a backend processor and server bundled in a Docker image.
You must run it first, on port 3000!

Run this command in your terminal:
```
docker run -p 3000:3000 -v "{absolute path to videos folder}:/videos" -v "{absolute path to results folder}:/results" ghcr.io/auglebobaugles/salamander:latest
```
Replace:
- {absolute path to videos folder} — the folder where your .mp4 files are stored
- {absolute path to results folder} — the folder where you want the CSV output files to be saved
2. Start the front end.

a. Clone this repo
```
git clone https://github.com/rifflere/centroid-finder-frontend
cd centroid-finder-frontend
```

b. Install dependencies
```
npm install
```
c. Launch the frontend
```
npm run dev
```