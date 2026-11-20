import os
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

for name in names:
    p = os.path.join('images', name)
    if os.path.exists(p):
        im = Image.open(p)
        size_mb = os.path.getsize(p) / (1024 * 1024)
        print(f"{name}: dimensions {im.size}, file size {size_mb:.2f} MB")
