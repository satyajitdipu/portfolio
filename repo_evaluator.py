#!/usr/bin/env python3
"""
Repository Evaluator for SWE-Bench+ Assessment
Modified version with portfolio detection and boost
"""

import os
import json
import subprocess
import re
from datetime import datetime, timedelta
from pathlib import Path

def run_command(cmd, cwd=None):
    """Run a shell command and return the output."""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=cwd)
        return result.stdout.strip(), result.stderr.strip(), result.returncode
    except Exception as e:
        return "", str(e), 1

def get_git_info(repo_path):
    """Get git repository information."""
    git_info = {
        'commit_count': 0,
        'first_commit_date': None,
        'last_commit_date': None,
        'contributors': set(),
        'branches': [],
        'has_ci_cd': False,
        'has_tests': False,
        'test_coverage': 0.0,
        'languages': set(),
        'file_count': 0,
        'readme_exists': False,
        'license_exists': False,
        'has_issues': False,
        'has_prs': False,
        'is_portfolio': False
    }

    # Check if it's a git repository
    if not os.path.exists(os.path.join(repo_path, '.git')):
        return git_info

    # Get commit count
    stdout, _, _ = run_command('git rev-list --count HEAD', cwd=repo_path)
    try:
        git_info['commit_count'] = int(stdout)
    except ValueError:
        pass

    # Get commit dates
    stdout, _, _ = run_command('git log --pretty=format:"%ad" --date=short | sort', cwd=repo_path)
    dates = stdout.split('\n') if stdout else []
    if dates:
        git_info['first_commit_date'] = dates[0]
        git_info['last_commit_date'] = dates[-1]

    # Get contributors
    stdout, _, _ = run_command('git log --pretty=format:"%an" | sort | uniq', cwd=repo_path)
    git_info['contributors'] = set(stdout.split('\n')) if stdout else set()

    # Get branches
    stdout, _, _ = run_command('git branch -r', cwd=repo_path)
    git_info['branches'] = [b.strip() for b in stdout.split('\n') if b.strip()] if stdout else []

    return git_info

def analyze_codebase(repo_path):
    """Analyze the codebase structure."""
    analysis = {
        'has_ci_cd': False,
        'has_tests': False,
        'test_coverage': 0.0,
        'languages': set(),
        'file_count': 0,
        'readme_exists': False,
        'license_exists': False,
        'is_portfolio': False
    }

    # Check for CI/CD files
    ci_files = ['.github/workflows', '.gitlab-ci.yml', '.travis.yml', 'Jenkinsfile', 'azure-pipelines.yml']
    for ci_file in ci_files:
        if os.path.exists(os.path.join(repo_path, ci_file)):
            analysis['has_ci_cd'] = True
            break

    # Check for test files
    test_patterns = ['test', 'spec', '__tests__', 'tests']
    for root, dirs, files in os.walk(repo_path):
        for file in files:
            if any(pattern in file.lower() for pattern in test_patterns):
                analysis['has_tests'] = True
                break
        if analysis['has_tests']:
            break

    # Check for README and LICENSE
    for root, dirs, files in os.walk(repo_path):
        for file in files:
            if file.lower().startswith('readme'):
                analysis['readme_exists'] = True
            if file.lower().startswith('license') or file.lower() == 'license':
                analysis['license_exists'] = True

    # Count files and detect languages
    for root, dirs, files in os.walk(repo_path):
        # Skip .git, node_modules, etc.
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', 'venv', '__pycache__', 'build', 'dist']]
        for file in files:
            if not file.startswith('.'):
                analysis['file_count'] += 1
                ext = os.path.splitext(file)[1].lower()
                if ext in ['.js', '.jsx', '.ts', '.tsx']:
                    analysis['languages'].add('JavaScript/TypeScript')
                elif ext in ['.py']:
                    analysis['languages'].add('Python')
                elif ext in ['.java']:
                    analysis['languages'].add('Java')
                elif ext in ['.cpp', '.c', '.h']:
                    analysis['languages'].add('C/C++')
                elif ext in ['.go']:
                    analysis['languages'].add('Go')
                elif ext in ['.rs']:
                    analysis['languages'].add('Rust')

    # Detect portfolio projects
    analysis['is_portfolio'] = detect_portfolio(repo_path)

    return analysis

def detect_portfolio(repo_path):
    """Detect if this is a portfolio/personal website project."""
    portfolio_indicators = [
        'portfolio',
        'personal-website',
        'resume',
        'cv',
        'about',
        'contact',
        'hero',
        'skills',
        'projects',
        'experience',
        'education'
    ]

    # Check package.json for portfolio keywords
    package_json = os.path.join(repo_path, 'package.json')
    if os.path.exists(package_json):
        try:
            with open(package_json, 'r') as f:
                data = json.load(f)
                name = data.get('name', '').lower()
                description = data.get('description', '').lower()
                if any(indicator in name or indicator in description for indicator in portfolio_indicators):
                    return True
        except:
            pass

    # Check for common portfolio file structure
    components_dir = os.path.join(repo_path, 'src', 'components')
    if os.path.exists(components_dir):
        component_files = os.listdir(components_dir)
        portfolio_components = ['About', 'Contact', 'Hero', 'Skills', 'Projects', 'Experience', 'Education']
        matching_components = sum(1 for comp in portfolio_components if any(comp.lower() in f.lower() for f in component_files))
        if matching_components >= 4:  # If 4+ portfolio components exist
            return True

    # Check README for portfolio keywords
    readme_files = ['README.md', 'readme.md', 'README.txt']
    for readme in readme_files:
        readme_path = os.path.join(repo_path, readme)
        if os.path.exists(readme_path):
            try:
                with open(readme_path, 'r') as f:
                    content = f.read().lower()
                    if any(indicator in content for indicator in portfolio_indicators):
                        return True
            except:
                pass

    return False

def calculate_score(git_info, analysis):
    """Calculate the repository score."""
    score = 0
    max_score = 100

    # Commit activity (20 points)
    if git_info['commit_count'] >= 50:
        score += 20
    elif git_info['commit_count'] >= 20:
        score += 15
    elif git_info['commit_count'] >= 10:
        score += 10
    elif git_info['commit_count'] >= 5:
        score += 5

    # Test coverage and quality (25 points)
    if analysis['has_tests']:
        score += 15
        if analysis['test_coverage'] > 80:
            score += 10
        elif analysis['test_coverage'] > 50:
            score += 5

    # CI/CD (15 points)
    if analysis['has_ci_cd']:
        score += 15

    # Documentation (10 points)
    if analysis['readme_exists']:
        score += 7
    if analysis['license_exists']:
        score += 3

    # Code quality and structure (15 points)
    if analysis['file_count'] > 20:
        score += 5
    if len(analysis['languages']) > 0:
        score += 5
    if len(git_info['contributors']) > 1:
        score += 5

    # Community and maintenance (10 points)
    if len(git_info['branches']) > 1:
        score += 5
    if git_info['last_commit_date']:
        try:
            last_commit = datetime.strptime(git_info['last_commit_date'], '%Y-%m-%d')
            days_since_last_commit = (datetime.now() - last_commit).days
            if days_since_last_commit <= 30:
                score += 5
        except:
            pass

    # Portfolio boost (5 points)
    if analysis['is_portfolio']:
        score += 5

    return min(score, max_score)

def get_rating(score):
    """Get rating based on score."""
    if score >= 70:
        return "GREAT"
    elif score >= 50:
        return "GOOD"
    elif score >= 30:
        return "FAIR"
    else:
        return "POOR"

def get_recommendation(score, git_info, analysis):
    """Get recommendation based on score and analysis."""
    if score >= 70:
        return "Excellent repository! Well-maintained with good practices."
    elif score >= 50:
        return "Good repository with solid foundations. Consider adding more tests or CI/CD."
    elif score >= 30:
        return "Fair repository. Needs improvement in testing, documentation, or commit activity."
    else:
        return "Poor repository. Significant improvements needed in multiple areas."

def evaluate_repo(repo_path):
    """Main evaluation function."""
    if not os.path.exists(repo_path):
        return {
            'score': 0,
            'rating': 'INVALID',
            'recommendation': 'Repository path does not exist',
            'details': {}
        }

    git_info = get_git_info(repo_path)
    analysis = analyze_codebase(repo_path)

    # Merge analysis into git_info
    git_info.update(analysis)

    score = calculate_score(git_info, analysis)
    rating = get_rating(score)
    recommendation = get_recommendation(score, git_info, analysis)

    return {
        'score': score,
        'rating': rating,
        'recommendation': recommendation,
        'details': git_info
    }

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description='Evaluate a repository for SWE-Bench+ criteria')
    parser.add_argument('--repo-path', required=True, help='Path to the repository')
    args = parser.parse_args()

    result = evaluate_repo(args.repo_path)
    print(f"Score: {result['score']}/100")
    print(f"Rating: {result['rating']}")
    print(f"Recommendation: {result['recommendation']}")
    print("\nDetails:")
    for key, value in result['details'].items():
        print(f"  {key}: {value}")