# Contributing to Portfolio

Thank you for your interest in contributing to this portfolio project! This guide will help you get started.

## Git Setup and Authentication

### Common Issue: 403 Permission Error

If you encounter this error when trying to push:
```
remote: Permission to satyajitdipu/portfolio.git denied to satyajitdipu.
fatal: unable to access 'https://github.com/satyajitdipu/portfolio.git/': The requested URL returned error: 403
```

This is typically caused by authentication issues. Here are the solutions:

### Solution 1: Use SSH Instead of HTTPS (Recommended)

1. **Generate an SSH key** (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Add your SSH key to GitHub**:
   - Copy your public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub Settings → SSH and GPG keys → New SSH key
   - Paste your key and save

3. **Update your remote URL**:
   ```bash
   git remote set-url origin git@github.com:satyajitdipu/portfolio.git
   ```

4. **Test your connection**:
   ```bash
   ssh -T git@github.com
   ```

### Solution 2: Use GitHub CLI (gh)

1. **Install GitHub CLI**:
   - macOS: `brew install gh`
   - Windows: Download from https://cli.github.com/
   - Linux: Follow instructions at https://cli.github.com/

2. **Authenticate**:
   ```bash
   gh auth login
   ```

3. **Configure git to use gh**:
   ```bash
   gh auth setup-git
   ```

### Solution 3: Use Personal Access Token (PAT)

1. **Create a Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Select scopes: `repo` (full control of private repositories)
   - Generate and copy the token

2. **Configure git credentials**:
   ```bash
   git config --global credential.helper store
   ```

3. **Push with token** (you'll be prompted for credentials):
   ```bash
   git push origin main
   ```
   - Username: your GitHub username
   - Password: paste your Personal Access Token (not your GitHub password)

### Solution 4: Check Repository Permissions

Ensure you have write access to the repository:
- If it's your own repository, check that you're logged in with the correct account
- If it's a forked repository, push to your fork instead
- Contact the repository owner if you need collaborator access

## Development Workflow

### Setting Up the Project

1. **Clone the repository**:
   ```bash
   git clone git@github.com:satyajitdipu/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

### Making Changes

1. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test them locally

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

4. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

## Code Style

- Follow React best practices
- Use functional components with hooks
- Keep components modular and reusable
- Maintain consistent CSS naming conventions
- Test your changes on different screen sizes

## Testing

Before submitting your changes:

```bash
# Run the build to check for errors
npm run build

# Test the application
npm start
```

## Need Help?

If you're still experiencing issues:
1. Check that you're using the correct GitHub account
2. Verify your internet connection
3. Try clearing git credentials: `git credential-cache exit`
4. Check GitHub status: https://www.githubstatus.com/

For project-specific questions, feel free to open an issue on GitHub.
