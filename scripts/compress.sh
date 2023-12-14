rm -r images/
mkdir images

compress pngs
for file in hires-images/*.png
do
    pngcrush -reduce -brute "$file" "${file//hires-/}"
done

# compress jpgs
for file in hires-images/*.jpg
do 
    sips -s format jpeg -s formatOptions low $file --out ${file//hires-/}
done