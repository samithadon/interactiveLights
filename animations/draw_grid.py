from PIL import Image, ImageDraw
import math
import csv

n_rows = 30
n_cols = 30
dot_r = 10
x_spacing = 24
y_spacing = 24
width = int(n_cols*2*dot_r + (n_cols-1)*x_spacing + math.ceil(x_spacing/2.) + 2*dot_r)
height = n_rows*2*dot_r + (n_rows-1)*y_spacing


img = Image.new('RGBA', (width, height))
draw = ImageDraw.Draw(img)

coords = []

# background
draw.rectangle([0,0,width,height], fill=(55,55,55))

for i in range(n_cols):
    for j in range(n_rows):
        x = i*(x_spacing + 2*dot_r) + (j%2)*(x_spacing/2+dot_r)
        y = j*(y_spacing + 2*dot_r)
        if x < 0 or y < 0:
            print 'x=', x, 'y=', y, 'i=', i, 'j=', j
        coords.append([x+dot_r, y+dot_r]) # centerpoint
        draw.ellipse((x, y, x + 2*dot_r, y + 2*dot_r), fill=(0,0,0))

img.save('grid.png', 'PNG')

writer = csv.writer(open('grid.csv', 'wb'))
writer.writerows(coords)
