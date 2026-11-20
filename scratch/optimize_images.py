import os
import shutil
from PIL import Image

names = [
    'Road Safety Audit.jpg',
    'Traffic Engineering.jpg',
    'Transportation.jpg',
    'Rail Services.jpg',
    'Smart Mobility.jpg',
    'Land Development.jpg',
    'Surveying.jpg',
    'Book Meeting.jpg'
]

backup_dir = os.path.join('images', 'originals')
os.makedirs(backup_dir, exist_ok=True)

for name in names:
    src = os.path.join('images', name)
    if os.path.exists(src):
        dst = os.path.join(backup_dir, name)
        if not os.path.exists(dst):
            shutil.copy2(src, dst)
        
        im = Image.open(src)
        orig_size = os.path.getsize(src) / (1024 * 1024)
        orig_dim = im.size
        
        # Max dimension 1400px (crystal sharp on 4K / Retina displays, but super lightweight)
        im.thumbnail((1400, 1400), Image.Resampling.LANCZOS)
        
        # Convert RGBA to RGB if needed
        if im.mode in ('RGBA', 'P'):
            im = im.convert('RGB')
            
        im.save(src, 'JPEG', quality=85, optimize=True)
        new_size = os.path.getsize(src) / 1024
        print(f"Optimized {name}: {orig_dim} ({orig_size:.2f} MB) -> {im.size} ({new_size:.1f} KB)")
