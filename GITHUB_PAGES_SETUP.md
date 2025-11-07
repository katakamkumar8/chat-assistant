# GitHub Pages Setup - Fixing API Key Issues

## Problem
If you're getting "Sorry, I encountered an error. Please try again." on GitHub Pages, it's because the API key is not available during the build process.

## Solution

### Step 1: Add GitHub Secret

1. Go to your GitHub repository: `https://github.com/katakamkumar8/chat-assistant`
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add:
   - **Name**: `REACT_APP_GROQ_API_KEY`
   - **Value**: Your Groq API key (get it from https://console.groq.com/)
6. Click **Add secret**

### Step 2: Verify Workflow File

The workflow file (`.github/workflows/deploy.yml`) is already configured to use this secret. It should contain:

```yaml
- name: Build
  env:
    REACT_APP_GROQ_API_KEY: ${{ secrets.REACT_APP_GROQ_API_KEY }}
  run: npm run build
```

### Step 3: Trigger Deployment

After adding the secret:

1. **Option A**: Push any change to trigger automatic deployment
   ```bash
   git commit --allow-empty -m "Trigger deployment"
   git push
   ```

2. **Option B**: Manually trigger the workflow
   - Go to **Actions** tab in your repository
   - Select the **Deploy to GitHub Pages** workflow
   - Click **Run workflow**

### Step 4: Verify Deployment

1. Wait for the workflow to complete (check the **Actions** tab)
2. Visit your GitHub Pages URL: `https://katakamkumar8.github.io/chat-assistant/`
3. Try asking a question - it should work now!

## Troubleshooting

### Still Getting Errors?

1. **Check GitHub Actions Logs**
   - Go to **Actions** tab
   - Click on the latest workflow run
   - Check the **Build** step logs to see if the API key is being used

2. **Verify Secret Name**
   - Make sure the secret name is exactly: `REACT_APP_GROQ_API_KEY`
   - It's case-sensitive!

3. **Check API Key**
   - Make sure your Groq API key is valid
   - Get a new one from https://console.groq.com/ if needed

4. **Rebuild**
   - Sometimes you need to trigger a new deployment after adding the secret
   - Push a new commit or manually trigger the workflow

### Local Testing

To test the build locally with the API key:

```bash
# Set the environment variable
$env:REACT_APP_GROQ_API_KEY="your_api_key_here"  # Windows PowerShell
# or
export REACT_APP_GROQ_API_KEY="your_api_key_here"  # Linux/Mac

# Build
npm run build

# Test the build
npm run serve
```

## Security Note

⚠️ **Important**: The API key will be embedded in the built JavaScript bundle. This means anyone can see it by inspecting the browser's developer tools. For production applications, consider:

- Using a backend proxy to hide the API key
- Setting up rate limiting on your API key
- Monitoring API usage in Groq console

For a portfolio/showcase application, this is acceptable, but be aware of potential costs if the API key is abused.

