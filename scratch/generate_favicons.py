import os
from PIL import Image

logo_path = 'public/logo.png'
public_dir = 'public'

img = Image.open(logo_path).convert('RGBA')

# The emblem bounding box in logo.png is x: 1 to 139, y: 1 to 154
# (Width 138, Height 153)
emblem = img.crop((1, 1, 139, 154))
ew, eh = emblem.size

# Square canvas with 5% breathing margin so circular ring and leaf tip never get cut off
pad = int(max(ew, eh) * 0.05)
sq_dim = max(ew, eh) + (pad * 2)

base_square = Image.new('RGBA', (sq_dim, sq_dim), (0, 0, 0, 0))
paste_x = (sq_dim - ew) // 2
paste_y = (sq_dim - eh) // 2
base_square.paste(emblem, (paste_x, paste_y), emblem)

print(f"Base square emblem canvas created: {base_square.size}")

# Export sizes
sizes = {
    'favicon-16x16.png': (16, 16),
    'favicon-32x32.png': (32, 32),
    'favicon-48x48.png': (48, 48),
    'apple-touch-icon.png': (180, 180),
    'pujya-favicon.png': (192, 192),
    'android-chrome-192x192.png': (192, 192),
    'android-chrome-512x512.png': (512, 512),
    'pujya_favicon_512.png': (512, 512),
}

for filename, (w, h) in sizes.items():
    out_path = os.path.join(public_dir, filename)
    # High-quality Lanczos resampling
    resized = base_square.resize((w, h), Image.Resampling.LANCZOS)
    resized.save(out_path, 'PNG', optimize=True)
    print(f"Generated {filename} ({w}x{h})")

# Generate multi-size favicon.ico containing 16x16, 32x32, 48x48
ico_path = os.path.join(public_dir, 'favicon.ico')
img_16 = base_square.resize((16, 16), Image.Resampling.LANCZOS)
img_32 = base_square.resize((32, 32), Image.Resampling.LANCZOS)
img_48 = base_square.resize((48, 48), Image.Resampling.LANCZOS)
img_48.save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)], append_images=[img_32, img_16])
print("Generated multi-resolution favicon.ico (16x16, 32x32, 48x48)")
