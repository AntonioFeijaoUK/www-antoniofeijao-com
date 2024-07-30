#!/bin/bash

# Ensure the thumbnails directory exists
#mkdir -p ../images-thumbnails

# create the placeholder thumbnail
##convert representation-of-major-events-in-it-v03.webp -thumbnail 200x200 thumbnail.jpg

# create a list of images

cat ../events/event-* | jq -r '.events[].image' | cut -f 3 -d '/' > list-of-images.txt

# Iterate over each line in the list-of-images.txt file
for image in $(cat list-of-images.txt); do
    # Print the name of the image being processed
    echo "Processing image: ${image}"
    
    # Copy the placeholder thumbnail to the destination directory with the name of the current image
    #cp thumbnail.jpg ../images-thumbnails/${image}

    convert ${image} -thumbnail 200x200 ../images-thumbnails/${image}

done

