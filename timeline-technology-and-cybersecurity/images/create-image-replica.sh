

for image in $(cat list-of-images.txt); do 
    echo "image: ${image}";
    cp representation-of-major-events-in-it-v03.webp ${image};
done

