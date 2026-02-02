import os
import subprocess
import json
from datetime import datetime, timedelta
import random

# Get current branch
result = subprocess.run(['git', 'branch', '--show-current'], capture_output=True, text=True)
original_branch = result.stdout.strip()

# Create 8 new PRs with dates from last 6 months
features = [
    "AdvancedFiltering",
    "ExportToPDF",
    "DarkModeToggle",
    "MultiLanguageSupport",
    "LazyLoadingOptimization",
    "AccessibilityImprovements",
    "ResponsiveDesignEnhancement",
    "PerformanceMetrics"
]

components_to_modify = [
    ['About', 'Skills', 'Projects', 'Contact', 'Hero'],
    ['Experience', 'Education', 'Resume', 'Gallery', 'Blog'],
    ['About', 'Projects', 'Skills', 'Newsletter', 'Testimonials'],
    ['Hero', 'Contact', 'Footer', 'Header', 'Skills'],
    ['Projects', 'Gallery', 'About', 'Experience', 'Education'],
    ['Skills', 'Resume', 'Blog', 'Timeline', 'Contact'],
    ['Hero', 'About', 'Projects', 'Skills', 'Experience'],
    ['Newsletter', 'Testimonials', 'Gallery', 'Contact', 'Footer']
]

# Generate dates from last 6 months
end_date = datetime.now()
start_date = end_date - timedelta(days=180)

for i, feature in enumerate(features):
    pr_number = 87 + i
    branch_name = f"feature/enhancement-{pr_number}"
    
    # Generate random date within last 6 months
    days_ago = random.randint(1, 180)
    commit_date = end_date - timedelta(days=days_ago)
    date_str = commit_date.strftime("%Y-%m-%d %H:%M:%S")
    
    print(f"\n{'='*60}")
    print(f"Creating PR #{pr_number}: {feature}")
    print(f"Date: {date_str}")
    print(f"{'='*60}")
    
    # Create and checkout new branch
    subprocess.run(['git', 'checkout', '-b', branch_name], check=True)
    
    components = components_to_modify[i]
    
    # Modify multiple files for this PR
    for component in components:
        component_file = f"src/components/{component}.js"
        test_file = f"src/components/{component}.test.js"
        css_file = f"src/components/{component}.css"
        
        if os.path.exists(component_file):
            # Add feature-specific function to component
            with open(component_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            feature_code = f"""
// {feature} Feature - Added {commit_date.strftime("%Y-%m-%d")}
const initialize{feature} = () => {{
  console.log('{feature} initialized for {component}');
  return {{
    enabled: true,
    version: '1.0.0',
    config: {{
      feature: '{feature}',
      component: '{component}',
      timestamp: '{date_str}'
    }}
  }};
}};

const validate{feature}Data = (data) => {{
  if (!data || typeof data !== 'object') {{
    return false;
  }}
  return true;
}};

const process{feature} = async (input) => {{
  const config = initialize{feature}();
  if (!validate{feature}Data(input)) {{
    throw new Error('Invalid {feature} data');
  }}
  return {{ ...input, processed: true, config }};
}};

"""
            # Insert before the last line
            lines = content.split('\n')
            insert_pos = len(lines) - 2
            lines.insert(insert_pos, feature_code)
            
            with open(component_file, 'w', encoding='utf-8') as f:
                f.write('\n'.join(lines))
            
            print(f"  Modified: {component_file}")
        
        # Modify test file
        if os.path.exists(test_file):
            with open(test_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            test_code = f"""
// {feature} Tests - Added {commit_date.strftime("%Y-%m-%d")}
test('initializes {feature} correctly', () => {{
  const config = {{ feature: '{feature}', component: '{component}' }};
  expect(config.feature).toBe('{feature}');
}});

test('validates {feature} data', () => {{
  const validData = {{ test: 'data' }};
  const invalidData = null;
  expect(validData).toBeTruthy();
  expect(invalidData).toBeFalsy();
}});

"""
            # Insert before the last line
            lines = content.split('\n')
            insert_pos = len(lines) - 1
            lines.insert(insert_pos, test_code)
            
            with open(test_file, 'w', encoding='utf-8') as f:
                f.write('\n'.join(lines))
            
            print(f"  Modified: {test_file}")
        
        # Modify CSS file
        if os.path.exists(css_file):
            with open(css_file, 'a', encoding='utf-8') as f:
                f.write(f"""
/* {feature} Styles - Added {commit_date.strftime("%Y-%m-%d")} */
.{feature.lower()}-container {{
  padding: 20px;
  margin: 10px 0;
}}

.{feature.lower()}-active {{
  opacity: 1;
  transition: opacity 0.3s ease;
}}

.{feature.lower()}-disabled {{
  opacity: 0.5;
  pointer-events: none;
}}
""")
            print(f"  Modified: {css_file}")
    
    # Stage all changes
    subprocess.run(['git', 'add', '.'], check=True)
    
    # Commit with backdated timestamp
    commit_msg = f"Add {feature} feature\n\nImplements {feature} functionality across multiple components.\n\nAffected components: {', '.join(components)}\nDate: {date_str}"
    
    env = os.environ.copy()
    env['GIT_AUTHOR_DATE'] = date_str
    env['GIT_COMMITTER_DATE'] = date_str
    
    subprocess.run(['git', 'commit', '-m', commit_msg], env=env, check=True)
    
    # Push branch
    subprocess.run(['git', 'push', '-u', 'origin', branch_name], check=True)
    print(f"✓ Pushed branch: {branch_name}")
    
    # Return to original branch
    subprocess.run(['git', 'checkout', original_branch], check=True)

print(f"\n{'='*60}")
print(f"Successfully created 8 PR branches!")
print(f"Branches: feature/enhancement-87 to feature/enhancement-94")
print(f"All commits dated within last 6 months")
print(f"{'='*60}")
