const API_KEY = "lyq6VcVj1JXhAoGDKKrjtIDORcmEuPql"; 

async function checkAIImage(imageUrl) {
    try {
        const response = await fetch("https://api.thehive.ai/api/v2/task/sync", {
            method: "POST",
            headers: {
                "Authorization": `Token ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                image: imageUrl,
                models: ["ai_art"] // Use Hive's AI art detection model
            })
        });

        const result = await response.json();
        console.log("Hive Response:", result);

        return result?.status === "complete" && result?.outputs[0]?.classes["ai_art"] > 0.8;  
        // Adjust threshold if needed (0.8 = 80% confidence)
    } catch (error) {
        console.error("Error checking image:", error);
        return false; // Assume it's not AI if API fails
    }
}

// Function to process and blur AI-generated images
async function blurAIImages() {
    const images = document.querySelectorAll("img");
    for (let img of images) {
        const isAI = await checkAIImage(img.src);
        if (isAI) {
            img.style.filter = "blur(10px)";
            img.style.transition = "filter 0.3s ease-in-out"; // Smooth effect
        }
    }
}

// Run when the page loads
blurAIImages();

// Also run when scrolling (for dynamically loaded images)
window.addEventListener("scroll", () => {
    blurAIImages();
});




// // function to blurr an image
// function blurImage(image) {
//     image.style.filter = "blur(10px)";
//     image.style.transition = "filter 0.3s ease-in-out";
// }

// //function to check whether image is ghibli or not
// function isGhibliAiImage(image) {
//     const keywords = ["ghibli", "anime-style", "studio ghibli", "ai art", "midjourney", "stable diffusion"];
//     const altText = image.alt.toLowerCase();
//     const src = image.src.toLowerCase();

//     return keywords.some(keyword => altText.includes(keyword) || src.includes(keyword));
// }

// // Function to scan all images on the page
// function scanImages() {
//     const images = document.querySelectorAll("img");

//     images.forEach(img => {
//         if (isGhibliAiImage(img)) {
//             blurImage(img);
//         }
//     });
// }

// // Run the function every time new images load (use MutationObserver)
// const observer = new MutationObserver(scanImages);
// observer.observe(document.body, { childList: true, subtree: true });

// // Initial scan
// scanImages();