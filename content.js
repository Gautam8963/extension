// function to blurr an image
function blurImage(image) {
    image.style.filter = "blur(10px)";
    image.style.transition = "filter 0.3s ease-in-out";
}

//function to check whether image is ghibli or not
function isGhibliAiImage(image) {
    const keywords = ["ghibli", "anime-style", "studio ghibli", "ai art", "midjourney", "stable diffusion"];
    const altText = image.alt.toLowercase();
    const src = image.src.toLowercase();

    return keywords.some(keyword => altText.includes(keyword) || src.includes(keyword));
}

// Function to scan all images on the page
function scanImages() {
    const images = document.querySelectorAll("img");

    images.forEach(img => {
        if (isGhibliAiImage(img)) {
            blurImage(img);
        }
    });
}

// Run the function every time new images load (use MutationObserver)
const observer = new MutationObserver(scanImages);
observer.observe(document.body, { childList: true, subtree: true });

// Initial scan
scanImages();