import os
import re

test_files = [
    'About.test.js',
    'Hero.test.js',
    'Skills.test.js',
    'Resume.test.js',
    'Gallery.test.js',
    'Newsletter.test.js',
    'Timeline.test.js',
    'Projects.test.js',
]

components_dir = 'd:/portfolio/src/components'

import_line = "import { ComponentUnderTest, calculatePerformanceMetrics, applyCache, validateDataStructure, createTestStore, fetchDataAsync, Provider } from './testHelpers';\n"

for test_file in test_files:
    filepath = os.path.join(components_dir, test_file)
    if not os.path.exists(filepath):
        print(f"Skipping {test_file} - file not found")
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if import already exists
    if 'testHelpers' in content:
        print(f"Skipping {test_file} - import already exists")
        continue
    
    # Find the last import statement
    import_matches = list(re.finditer(r'^import .+;$', content, re.MULTILINE))
    if import_matches:
        last_import = import_matches[-1]
        insert_pos = last_import.end()
        # Insert after the last import
        new_content = content[:insert_pos] + '\n' + import_line + content[insert_pos:]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {test_file}")
    else:
        print(f"Skipping {test_file} - no imports found")

print("Done!")
