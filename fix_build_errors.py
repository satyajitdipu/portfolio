#!/usr/bin/env python3
"""
Remove problematic generated enhancement code from components
"""

import os
import re

def fix_file(filepath):
    """Remove generated enhancement code from file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find the export statement
        export_match = re.search(r'(export default \w+;)', content)
        if not export_match:
            print(f"  ⚠️  No export found in {filepath}")
            return False
        
        # Get position of export
        export_pos = export_match.start()
        
        # Keep everything up to and including the export
        clean_content = content[:export_pos + len(export_match.group(1))] + '\n'
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(clean_content)
        
        return True
    except Exception as e:
        print(f"  ❌ Error fixing {filepath}: {e}")
        return False

def main():
    print("🔧 Fixing build errors by removing problematic generated code...")
    
    components_dir = r'd:\portfolio\src\components'
    
    # List of component files that need fixing
    files_to_fix = [
        'About.js',
        'Blog.js',
        'Contact.js',
        'Education.js',
        'Experience.js',
        'Footer.js',
        'Gallery.js',
        'Header.js',
        'Hero.js',
        'Newsletter.js',
        'Projects.js',
        'Resume.js',
        'Skills.js',
        'Testimonials.js',
        'Timeline.js'
    ]
    
    fixed = 0
    failed = 0
    
    for filename in files_to_fix:
        filepath = os.path.join(components_dir, filename)
        if os.path.exists(filepath):
            print(f"Fixing {filename}...", end=" ")
            if fix_file(filepath):
                print("✅")
                fixed += 1
            else:
                failed += 1
        else:
            print(f"  ⚠️  {filename} not found")
    
    print(f"\n{'='*60}")
    print(f"✅ Fixed: {fixed} files")
    print(f"❌ Failed: {failed} files")
    print(f"\n🎯 Build errors should now be resolved!")
    print(f"Run: npm run build")

if __name__ == '__main__':
    main()
