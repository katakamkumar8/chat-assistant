# GitHub Pages Deployment Guide

This guide will help you deploy your MCHAT application to GitHub Pages.

## Prerequisites

1. Your code must be in a GitHub repository
2. You need to have push access to the repository

## Setup Steps

### 1. Enable GitHub Pages in Repository Settings

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 2. Repository Structure

Make sure your repository has the following structure:
```
MCHAT/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
├── public/
├── package.json
├── webpack.config.js
└── ... (other files)
```

### 3. Automatic Deployment

The deployment is now automated! Here's what happens:

- **Trigger**: Every time you push to the `main` branch
- **Process**: 
  1. GitHub Actions installs dependencies
  2. Builds the production version
  3. Deploys to GitHub Pages
- **URL**: Your app will be available at `https://[your-username].github.io/MCHAT/`

### 4. Manual Deployment (if needed)

If you want to deploy manually:

```bash
# Build the project
npm run build

# The dist/ folder will contain your built application
# GitHub Actions will automatically deploy this
```

### 5. Environment Variables

If your app uses environment variables:

1. Go to your repository **Settings**
2. Click **Secrets and variables** → **Actions**
3. Add your environment variables as repository secrets
4. Update the GitHub Actions workflow to use these secrets

### 6. Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to your repository root with your domain
2. Configure your domain's DNS settings
3. Update the GitHub Pages settings with your custom domain

## Troubleshooting

### Build Fails
- Check the Actions tab in your repository for error details
- Ensure all dependencies are in `package.json`
- Verify the build works locally with `npm run build`

### App Not Loading
- Check if the `publicPath` in webpack.config.js matches your repository name
- Verify the GitHub Pages source is set to "GitHub Actions"
- Wait a few minutes for the deployment to complete

### Environment Variables Not Working
- Make sure to add them as repository secrets
- Update the workflow file to use `${{ secrets.YOUR_SECRET_NAME }}`

## Local Testing

Test your production build locally:

```bash
# Build for production
npm run build

# Serve the built files
npm run serve
```

Visit `http://localhost:3000` to test your production build.

## Repository Name Considerations

The current configuration assumes your repository is named `MCHAT`. If your repository has a different name:

1. Update the `publicPath` in `webpack.config.js`
2. Change `/MCHAT/` to `/[your-repo-name]/`

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify your repository settings
3. Ensure all files are committed and pushed to the main branch
