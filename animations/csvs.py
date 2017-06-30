import sys, os
import csv
from PIL import Image

def make_csvs(dirname, debug):
    # make sure the dirname ends with '/' to make it easier to combine with filename
    # TODO would be cleaner to use os.path.join for combining dir + filename
    if dirname[-1] != '/':
        dirname += '/'

    # list of all png image files in the directory
    pngs = [f for f in os.listdir(dirname) if f.endswith('.png') and 'debug' not in f]
    pngs = sorted(pngs, key=lambda f: int(f.strip('.png')))
    pngs = [dirname+f for f in pngs]

    coords = []
    with open(dirname + 'grid.csv', 'rb') as fgrid:
        coords = list([int(x), int(y)] for [x,y] in csv.reader(fgrid))
    coords_header = ['x', 'y']

    for filename in pngs:
        im = Image.open(filename)
        print 'processing image', filename, 'size', im.size, 'mode', im.mode
        w, h = im.size
        # TODO check im.mode before unpacking to support RGB and RGBA, right now this assumes RGBA mode with the 4 parts r, g, b, a

        if debug: # if in debug mode we will mark the pixels we check
            drawpix = im.load()

        # add a column to coords for this frame of the animation, where 0/1 encodes on/off of lights
        frame = filename.strip('.png').strip(dirname)
        coords_header.append('f' + frame)
        for i in range(len(coords)):
            coord = coords[i]
            x,y = coord[0], coord[1]
            r,g,b,a = im.getpixel((x,y))

            if r == 255 and g == 255 and b == 255:
                coords[i].append(1)
            elif r == 0 and g == 0 and b == 0:
                coords[i].append(0)
            else:
                print 'warning: found a pixel that is neither black or white', 'r', r, 'g', g, 'b', b, 'a', a
                coords[i].append(0)
                
            if debug: # mark the pixels we check
                drawpix[x,y] = (255, 0, 0, 255)

        if debug: # draw out the debug image with marks
            im.save(filename.strip('.png') + '_debug' + '.png')

    coords.insert(0, coords_header)

    output_csv_name = dirname + 'frames.csv'
    with open(output_csv_name, 'w') as fout:
        writer = csv.writer(fout)
        writer.writerows(coords)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print "Please specify the directory containing the animation files"
        quit()
    debug = False
    if len(sys.argv) >= 3 and sys.argv[2] == 'debug':
        debug = True
    make_csvs(sys.argv[1], debug)
