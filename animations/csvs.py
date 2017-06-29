import sys, os
import csv
from PIL import Image

def make_csvs(dirname, debug):
    # make sure the dirname ends with '/' to make it easier to combine with filename
    # TODO would be cleaner to use os.path.join for combining dir + filename
    if dirname[-1] != '/':
        dirname += '/'

    # list of all png image files in the directory
    pngs = [dirname+f for f in os.listdir(dirname) if f.endswith('.png') and 'debug' not in f]

    for filename in pngs:
        im = Image.open(filename)
        print 'processing image', filename, 'size', im.size, 'mode', im.mode
        w, h = im.size
        # TODO check im.mode before unpacking to support RGB and RGBA, right now this assumes RGBA mode with the 4 parts r, g, b, a

        coords = []

        if debug:
            drawpix = im.load()

        with open(dirname + 'grid.csv', 'rb') as gridlines:
            for line in csv.reader(gridlines):
                x,y = int(line[0]), int(line[1])
                r,g,b,a = im.getpixel((x,y))

                if r == 255 and g == 255 and b == 255:
                    coords.append([x,y,1])
                elif r == 0 and g == 0 and b == 0:
                    # no need to record unlit pixels
                    pass
                else:
                    print 'warning: found a pixel that is neither black or white', 'r', r, 'g', g, 'b', b, 'a', a
                    
                if debug:
                    drawpix[x,y] = (255, 0, 0, 255)

        if debug:
            im.save(filename.strip('.png') + '_debug' + '.png')

        output_csv_name = filename.strip('png') + 'csv'
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
