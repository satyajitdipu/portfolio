import subprocess
import os
import time

os.chdir(r'd:\portfolio')

# Get current branch
result = subprocess.run(['git', 'branch', '--show-current'], capture_output=True, text=True)
original_branch = result.stdout.strip()

print(f"Current branch: {original_branch}")
print("Checking out main and pulling latest...")

subprocess.run(['git', 'checkout', 'main'], check=True)
subprocess.run(['git', 'pull', 'origin', 'main'], check=True)

# Get list of feature branches
result = subprocess.run(['git', 'branch', '-r'], capture_output=True, text=True)
remote_branches = result.stdout.strip().split('\n')

enhancement_branches = []
for branch in remote_branches:
    branch = branch.strip()
    if 'feature/enhancement-' in branch or 'enhancement-' in branch:
        branch_name = branch.replace('origin/', '')
        if branch_name and branch_name != 'HEAD':
            enhancement_branches.append(branch_name)

print(f"\nFound {len(enhancement_branches)} enhancement branches")
print("Merging all branches into main...")

merged = 0
failed = 0

for branch in sorted(enhancement_branches):
    print(f"\n{'='*60}")
    print(f"Merging: {branch}")
    print(f"{'='*60}")
    
    try:
        # Fetch the branch
        subprocess.run(['git', 'fetch', 'origin', branch], check=True)
        
        # Try to merge
        result = subprocess.run(
            ['git', 'merge', f'origin/{branch}', '--no-edit', '-m', f'Merge {branch}'],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            print(f"Successfully merged {branch}")
            merged += 1
        else:
            # Check if there are conflicts
            if 'CONFLICT' in result.stdout or 'CONFLICT' in result.stderr:
                print(f"Conflicts detected, resolving with theirs strategy...")
                
                # Accept theirs for all conflicts
                subprocess.run(['git', 'checkout', '--theirs', '.'], check=True)
                subprocess.run(['git', 'add', '.'], check=True)
                subprocess.run(['git', 'commit', '-m', f'Merge {branch} (resolved conflicts)'], check=True)
                
                print(f"Merged {branch} with conflict resolution")
                merged += 1
            else:
                print(f"Failed to merge {branch}: {result.stderr}")
                # Abort merge
                subprocess.run(['git', 'merge', '--abort'], capture_output=True)
                failed += 1
                
    except Exception as e:
        print(f"Error merging {branch}: {e}")
        subprocess.run(['git', 'merge', '--abort'], capture_output=True)
        failed += 1

print(f"\n{'='*60}")
print(f"Merge Summary:")
print(f"  Successfully merged: {merged}")
print(f"  Failed: {failed}")
print(f"  Total: {len(enhancement_branches)}")
print(f"{'='*60}")

# Push changes
if merged > 0:
    print("\nPushing changes to main...")
    result = subprocess.run(['git', 'push', 'origin', 'main'], capture_output=True, text=True)
    if result.returncode == 0:
        print("Successfully pushed all changes!")
    else:
        print(f"Failed to push: {result.stderr}")
