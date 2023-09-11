rm -r images/
mkdir images

for file in hires-images/*.png; 
do
    pngcrush -reduce -brute "$file" "${file//hires-/}"; 
done