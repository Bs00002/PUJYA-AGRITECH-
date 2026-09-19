from PIL import Image
import numpy as np

img = Image.open('public/logo.png').convert('RGBA')
print(f"Original image size: {img.size}, mode: {img.mode}")

# Find bounding box of non-transparent pixels on the left emblem side
# The emblem is roughly in the left square (width <= 160)
w, h = img.size
emblem_crop_candidate = img.crop((0, 0, 160, h))

# Bounding box of non-zero alpha in the left portion
bbox = emblem_crop_candidate.getbbox()
print(f"Emblem bbox in left 160px: {bbox}")

# Let's inspect where the letter 'P' starts (it's blue)
# In logo.png, find alpha > 0 pixels across the x axis
arr = np.array(img)
alpha = arr[:, :, 3]
column_has_alpha = (alpha > 10).any(axis=0)

# Print ranges where columns have alpha
runs = []
in_run = False
start = 0
for col, has in enumerate(column_has_alpha):
    if has and not in_run:
        in_run = True
        start = col
    elif not has and in_run:
        in_run = False
        runs.append((start, col - 1))
if in_run:
    runs.append((start, len(column_has_alpha) - 1))

print("Active column segments:", runs)
