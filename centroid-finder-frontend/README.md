# centroid-finder-frontend
A simple web app for uploading a video, selecting a color and threshold, and generating a CSV file showing the centroid location of the largest area of that color per second.

## Project Overview
This frontend lets you:
- Pick a video file
- Choose a target color and threshold
- Run the processor to analyze the video
- Download a CSV file with the results

## VM Setup Instructions
1. Clone this repo inside of your VM
```bash
    git clone https://github.com/RMarx1456/SalamanderProject.git
```
2. Change Directories into the project folder
```bash
    cd SalamanderProject/
```
3. Copy the example .env file and edit the credentials inside of them.
```bash
    cp .env.example .env
    nano .env
```
4. Install the dependencies for the ***backend***
```bash
    cd SalamanderProject/centroid-finder/server/
    npm i
    cd ../../
```
5. Install the dependencies for the ***frontend***
```bash
    cd SalamanderProject/centroid-finder-frontend/centroid-finder-frontend/
    npm i
    cd ../../
```
6. Once you're back inside of the root directory of the project file, go ahead and run the docker-compose.yml file
```bash
    docker-compose build --no-cache frontend
    docker-compose build --no-cache
    docker-compose up -d
```
7. Verify that the containers are running by...
```bash
    docker ps
```
8. Now check your the browser if the backend and frontend are running.
- Frontend: `http://<VM_IP_Address>:3000`
- Backend: `http://<VM_IP_Address>:5000/api/health`