#!/usr/bin/env python3
"""
Remove generated enhancement code between component end and export
"""
import os
import re

components_dir = r'd:\portfolio\src\components'

files_to_fix = {
    'Blog.js': 'Blog',
    'Contact.js': 'Contact',
    'Education.js': 'Education',
    'Experience.js': 'Experience',
    'Footer.js': 'Footer',
    'Gallery.js': 'Gallery',
    'Header.js': 'Header',
    'Hero.js': 'Hero',
    'Newsletter.js': 'Newsletter',
    'Projects.js': 'Projects',
    'Resume.js': 'Resume',
    'Skills.js': 'Skills',
    'Testimonials.js': 'Testimonials',
    'Timeline.js': 'Timeline'
}

for filename, component_name in files_to_fix.items():
    filepath = os.path.join(components_dir, filename)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match everything from "// Enhanced feature" to "export default"
    pattern = r'\n\n// Enhanced feature.*?(?=\nexport default)'
    
    cleaned = re.sub(pattern, '\n', content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(cleaned)
    
    print(f"✅ Fixed {filename}")

print("\n✅ All files cleaned!")
