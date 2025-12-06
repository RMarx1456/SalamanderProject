# CI/CD Workflows

This directory contains GitHub Actions workflows for the Salamander Project (Centroid Finder).

## Workflows

### 1. CI (`ci.yml`)

**Triggers:** Push to `master`, Pull Requests to `master`

**Purpose:** Continuous Integration - runs tests and builds on every push and PR

**Jobs:**
- **Backend Test**: Runs Jest tests for the Express backend
- **Frontend Test**: Lints and builds the Next.js frontend
- **Java Processor**: Builds and tests the Maven Java processor, uploads JAR artifact
- **Docker Build**: Builds Docker images for both services (runs after all tests pass)

**Status Badge:**
```markdown
![CI](https://github.com/YOUR_USERNAME/SalamanderProject/actions/workflows/ci.yml/badge.svg)
```

### 2. Docker Publish (`docker-publish.yml`)

**Triggers:**
- Push to `master` branch
- Version tags (v*.*.*)
- Manual workflow dispatch

**Purpose:** Builds and publishes Docker images to GitHub Container Registry (ghcr.io)

**Jobs:**
- Builds the Java processor JAR
- Builds and pushes Docker images for backend and frontend
- Tags images with branch name, git SHA, and `latest` for master branch

**Image Naming:**
- Backend: `ghcr.io/YOUR_USERNAME/salamanderproject/centroid-finder-backend`
- Frontend: `ghcr.io/YOUR_USERNAME/salamanderproject/centroid-finder-frontend`

**Permissions Required:**
- `packages: write` (automatically granted to GITHUB_TOKEN in workflows)

### 3. Deploy (`deploy.yml`)

**Triggers:** Manual workflow dispatch only

**Purpose:** Deploys the application to a server via SSH

**Inputs:**
- `environment`: Choose between production/staging/development
- `docker_compose`: Whether to use docker-compose (default: true)

**Deployment Methods:**
1. **Docker Compose** (recommended): SSHs to server, pulls code, and runs `docker-compose up -d --build`
2. **Direct Docker**: Pulls images from registry and runs containers manually

**Required Secrets/Variables:**
Configure these in your repository settings (Settings > Secrets and variables > Actions):

**Secrets:**
- `SSH_PRIVATE_KEY`: SSH private key for server access

**Variables:**
- `SSH_HOST`: Server hostname or IP address
- `SSH_USER`: SSH username
- `DEPLOY_PATH`: Path to project on server (default: `~/salamander-project`)

**Example Setup:**
```bash
# On your server
mkdir -p ~/salamander-project
cd ~/salamander-project
git clone https://github.com/YOUR_USERNAME/SalamanderProject.git .

# On GitHub
# Add SSH_PRIVATE_KEY secret with your private key
# Add variables: SSH_HOST=your-server.com, SSH_USER=deploy, DEPLOY_PATH=~/salamander-project
```

## Dependabot

The `.github/dependabot.yml` file configures automated dependency updates for:
- Backend npm packages (weekly)
- Frontend npm packages (weekly)
- Java Maven dependencies (weekly)
- Docker base images (weekly)
- GitHub Actions versions (weekly)

Dependabot will automatically create PRs when new versions are available.

## Setup Instructions

### 1. Enable GitHub Container Registry

1. Go to your GitHub profile settings
2. Navigate to "Developer settings" > "Personal access tokens"
3. The workflows use `GITHUB_TOKEN` automatically, no manual token needed

### 2. Configure Deployment (Optional)

If you want to enable automated deployments:

1. Generate an SSH key pair:
   ```bash
   ssh-keygen -t ed25519 -C "github-actions" -f deploy_key
   ```

2. Add the public key (`deploy_key.pub`) to your server's `~/.ssh/authorized_keys`

3. Add the private key (`deploy_key`) to GitHub:
   - Go to Settings > Secrets and variables > Actions
   - Create new secret: `SSH_PRIVATE_KEY`
   - Paste the private key contents

4. Add deployment variables:
   - `SSH_HOST`: Your server's hostname/IP
   - `SSH_USER`: SSH username
   - `DEPLOY_PATH`: Deployment directory path

### 3. Running Workflows

**CI:** Runs automatically on push and PR

**Docker Publish:**
- Automatic: Push to master or create version tag
- Manual: Actions tab > Docker Publish > Run workflow

**Deploy:**
- Manual only: Actions tab > Deploy > Run workflow > Select environment

## Local Testing

Test the workflows locally using [act](https://github.com/nektos/act):

```bash
# Install act
# macOS: brew install act
# Windows: choco install act-cli
# Linux: See https://github.com/nektos/act#installation

# Run CI workflow
act push

# Run specific job
act -j backend-test
```

## Troubleshooting

### Docker build fails with "JAR not found"

The Java processor must be built first. The CI workflow handles this by:
1. Building the JAR in the `java-processor` job
2. Uploading it as an artifact
3. Downloading it in the `docker-build` job

### Deployment fails with SSH connection refused

- Verify `SSH_HOST` and `SSH_USER` variables are correct
- Ensure the public key is in the server's `authorized_keys`
- Check server firewall allows SSH connections

### Docker images not showing in packages

- Ensure workflow has completed successfully
- Check repository settings > Actions > General > Workflow permissions
- Make sure "Read and write permissions" is enabled

## Monitoring

View workflow runs:
- Repository > Actions tab
- Each workflow run shows logs for all jobs
- Failed jobs are highlighted in red

Enable notifications:
- Repository > Watch > Custom > Actions
- Get notified of workflow failures via email or GitHub notifications
