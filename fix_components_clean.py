#!/usr/bin/env python3
"""
PROPERLY remove generated code - cut everything after export default
"""
import os
import glob

def fix_component(filepath):
    """Remove everything after export default"""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Find export default line
    export_idx = None
    for i, line in enumerate(lines):
        if line.strip().startswith('export default ') and line.strip().endswith(';'):
            export_idx = i
            break
    
    if export_idx is not None:
        # Keep everything up to and including export line
        clean_lines = lines[:export_idx + 1]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(clean_lines)
        return True
    return False

def main():
    components_dir = r'd:\portfolio\src\components'
    
    # Get all .js files except test files
    pattern = os.path.join(components_dir, '*.js')
    files = [f for f in glob.glob(pattern) if not f.endswith('.test.js')]
    
    print(f"Fixing {len(files)} component files...")
    
    for filepath in files:
        filename = os.path.basename(filepath)
        if fix_component(filepath):
            # Count lines after fix
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    lines = len(f.readlines())
                print(f"  ✅ {filename} ({lines} lines)")
            except:
                print(f"  ✅ {filename}")
        else:
            print(f"  ⚠️  {filename} - no export found")
    
    print(f"\n✅ Done! Run: npm run build")

if __name__ == '__main__':
    main()
