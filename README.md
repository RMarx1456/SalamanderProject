# Salamander Centroid Finder Project

A full-stack application for processing videos to detect and track salamanders (or other colored objects) by analyzing color centroids. The application consists of a Java-based video processor, Node.js/Express backend API, and Next.js frontend.

## Project Structure

```
.
├── centroid-finder/                     # Backend service
│   ├── processor/                       # Java video processing engine
│   │   ├── src/                        # Java source files
│   │   ├── pom.xml                     # Maven configuration
│   │   └── target/                     # Built JAR files (generated)
│   ├── server/                         # Express.js API server
│   │   ├── server.js                   # Main server file
│   │   ├── controllers/                # API controllers
│   │   └── routers/                    # API routes
│   └── Dockerfile                      # Backend Docker configuration
├── centroid-finder-frontend/           # Frontend service
│   └── centroid-finder-frontend/       # Next.js application
│       ├── src/                        # Frontend source files
│       └── Dockerfile                  # Frontend Docker configuration
├── videos/                             # Directory for input video files
├── results/                            # Directory for processing results
└── docker-compose.yml                  # Docker Compose configuration

```

## Prerequisites

- Docker and Docker Compose installed
- Maven (for building the Java processor)
- Java 21 JDK (for building the Java processor)
- Node.js 18+ (for local development without Docker)

## Quick Start with Docker

### 1. Build the Java Processor

Before running Docker, you need to build the Java processor JAR file:

```bash
cd centroid-finder/processor
mvn clean package
cd ../..
```

This will create the JAR file at `centroid-finder/processor/target/centroid-finder-1.0-SNAPSHOT-jar-with-dependencies.jar`.

### 2. Add Video Files

Place your `.mp4` video files in the `videos/` directory at the project root:

```bash
# Copy your video files to the videos directory
cp /path/to/your/video.mp4 videos/
```

### 3. Build and Run with Docker Compose

```bash
# Build the Docker images
docker-compose build

# Start the services
docker-compose up
```

Or combine both steps:

```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3005
- Backend API: http://localhost:3000

### 4. Stop the Services

```bash
docker-compose down
```

## How It Works

1. **Upload Videos**: Place `.mp4` video files in the `videos/` directory
2. **Access Frontend**: Open http://localhost:3005 in your browser
3. **Select Video**: Choose a video from the list
4. **Configure Processing**:
   - Set target color (hex format, e.g., FFA200 for orange)
   - Set threshold value (e.g., 164)
5. **Process**: Submit the job and track its status
6. **View Results**: Results are saved in the `results/` directory

## Docker Configuration Details

### Volume Mounts

The Docker setup includes the following volume mounts:

- `./videos:/videos` - Input video files
- `./results:/results` - Processing output files

This allows you to:
- Add videos to the local `videos/` directory and they'll be accessible in the container
- View processing results in the local `results/` directory

### Environment Variables

Backend service uses:
- `VIDEO_DIR=/videos` - Directory containing input videos
- `RESULTS_DIR=/results` - Directory for output files
- `JAVA_JAR_PATH=/app/processor/centroid-finder-1.0-SNAPSHOT-jar-with-dependencies.jar` - Path to Java processor

Frontend service uses:
- `NEXT_PUBLIC_API_BASE_URL=http://backend:3000` - Backend API URL for server-side requests

## Local Development (Without Docker)

### Backend

```bash
cd centroid-finder/server
npm install
node server.js
```

Backend will run on http://localhost:3000

### Frontend

```bash
cd centroid-finder-frontend/centroid-finder-frontend
npm install
npm run dev
```

Frontend will run on http://localhost:3005 (or another port if 3005 is in use)

## Troubleshooting

### Permission Denied on /videos or /results

If you encounter permission errors:

1. Ensure the directories exist:
   ```bash
   mkdir -p videos results
   ```

2. Check directory permissions:
   ```bash
   chmod 755 videos results
   ```

3. On Windows with Docker Desktop, ensure the drive is shared in Docker settings

### JAR File Not Found

If the Docker build fails because the JAR file is missing:

```bash
cd centroid-finder/processor
mvn clean package
```

### Port Already in Use

If ports 3000 or 3005 are already in use, you can modify the port mappings in `docker-compose.yml`:

```yaml
ports:
  - "8000:3000"  # Change host port from 3000 to 8000
```

### Backend Can't Connect to Frontend

Make sure both services are on the same Docker network (configured in docker-compose.yml) and that the `NEXT_PUBLIC_API_BASE_URL` environment variable is set correctly.

## API Endpoints

- `GET /api/videos` - List all available videos
- `GET /thumbnail/:filename` - Get video thumbnail
- `POST /process/:filename?targetColor=XXX&threshold=YYY` - Process a video
- `GET /process/:jobId/status` - Check processing job status

## Technologies Used

- **Backend**: Node.js, Express.js, FFmpeg
- **Frontend**: Next.js, React
- **Processor**: Java 21, OpenCV (video processing)
- **Containerization**: Docker, Docker Compose
- **Build Tools**: Maven, npm

## License

See individual component licenses in the respective directories.
