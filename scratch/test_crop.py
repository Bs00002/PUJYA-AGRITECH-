from PIL import Image

img = Image.open('public/logo.png').convert('RGBA')
# Crop exact emblem: x from 1 to 139 (exclusive), y from 1 to 154
emblem = img.crop((1, 1, 139, 154))
print("Cropped emblem bbox:", emblem.getbbox(), "size:", emblem.size)

# The emblem circle is roughly 138x153 (slightly taller because of the top leaf tip and bottom stem/curve)
ew, eh = emblem.size
dim = max(ew, eh)

# Create a square image with small padding (e.g. 4-6px on each side) so the circle and leaf tip look beautifully centered
pad = 6
square_size = dim + (pad * 2)
sq_img = Image.new('RGBA', (square_size, square_size), (0, 0, 0, 0))

# Paste centered
paste_x = (square_size - ew) // 2
paste_y = (square_size - eh) // 2
sq_img.paste(emblem, (paste_x, paste_y), emblem)

sq_img.save('scratch/emblem_centered.png')
print(f"Saved scratch/emblem_centered.png with size {sq_img.size}")
