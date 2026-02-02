import os
import re

test_files_needing_waitfor = [
    'About.test.js',
    'Hero.test.js',
    'Skills.test.js',
    'Resume.test.js',
    'Gallery.test.js',
    'Timeline.test.js',
]

components_dir = 'd:/portfolio/src/components'

for test_file in test_files_needing_waitfor:
    filepath = os.path.join(components_dir, test_file)
    if not os.path.exists(filepath):
        print(f"Skipping {test_file} - file not found")
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if waitFor already exists in the import
    if "import { render, screen } from '@testing-library/react';" in content:
        # Replace with version that includes waitFor
        new_content = content.replace(
            "import { render, screen } from '@testing-library/react';",
            "import { render, screen, waitFor } from '@testing-library/react';"
        )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {test_file} - added waitFor")
    else:
        print(f"Skipping {test_file} - waitFor likely already present or different import structure")

print("Done!")
