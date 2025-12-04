// This component renders the binarized frame

// Parent -> VideoPreview
// children -> BinarizedFrame

// Note: AI helped generate the logic in this component.

import { useState, useEffect, useContext } from "react";
import BinarizedFrame from "./BinarizedFrame"
import { SettingsContext } from "@/context/SettingsContext";

export default function BinarizedFrameContainer(){
    // get thumbnail, color, and threshold from the Settings Context
    const { thumbnail, color, threshold } = useContext(SettingsContext)

    // set state to track binarized image, default to null
    const [binarizedImage, setBinarizedImage] = useState(null)

    // when thumbnail, color, threshold update, update binarized image
    useEffect(() => {
    const process = async () => {
        if (thumbnail && color && threshold != null) {
            try {
                // create binarized image from data
                const imageBinarized = await binarizeImage(thumbnail, color, threshold)
                // set Binarized Image state to resulting image
                setBinarizedImage(imageBinarized)
            } catch (error) {
            console.error("Error binarizing image:", error)
            }
        }
    }
    // run process() function when thumbnail, color, or threshold update
    process()
    }, [thumbnail, color, threshold]);

    function loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous"; // allows loading from different places
            img.onload = () => resolve(img); // success
            img.onerror = reject; // error
            img.src = url; // start loading
    });
    }

    const binarizeImage = async (thumbnail, color, threshold) => {
        // load and draw image on a canvas
        const img = await loadImage(thumbnail);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // imageData holds data about all the pixels
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // data is a list of numbers for all the colors
        // each pixel is represented by 4 consecutive numbers in this list: RGBa
        const data = imageData.data;

        // Convert target hex color to RGB
        const hex = color.replace("#", "");
        const targetR = parseInt(hex.substring(0, 2), 16);
        const targetG = parseInt(hex.substring(2, 4), 16);
        const targetB = parseInt(hex.substring(4, 6), 16);

        // Binarize each pixel (white if in range, else black)
        const binary = new Uint8Array(canvas.width * canvas.height); // Uint8Array is a special array that represents values 0-255
        for (let i = 0; i < data.length; i += 4) {
            // get rgb values
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            // calculate distance from color to target color
            const distance = Math.sqrt(
                (r - targetR) ** 2 + (g - targetG) ** 2 + (b - targetB) ** 2
            );
            // if close enough, set to white
            const isWhite = distance < threshold ? 1 : 0;
            // set each pixel in binary to 0 or 1
            binary[i / 4] = isWhite;
            const value = isWhite ? 255 : 0;
            // set each value in data to 0 or 255
            data[i] = value; // R
            data[i + 1] = value; // G
            data[i + 2] = value; // B
            data[i + 3] = 255; // alpha
        }

        // Find largest connected region with BFS
        const visited = new Uint8Array(binary.length); // Uint8Array is a special array that represents values 0-255
        let maxCount = 0;
        let centroidX = 0;
        let centroidY = 0;

        const width = canvas.width;
        const height = canvas.height;

        const directions = [
            [1, 0], [-1, 0], [0, 1], [0, -1]
        ];

        // loop over each pixel in binary image
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const current = y * width + x;
                if (binary[current] === 1 && !visited[current]) {
                    // New region: start BFS
                    const queue = [[x, y]];
                    visited[current] = 1; // set current to visited to avoid looping

                    let count = 0;
                    let sumX = 0;
                    let sumY = 0;

                    while (queue.length) {
                        const [currentX, currentY] = queue.pop();
                        const currentIndex = currentY * width + currentX;
                        count++;
                        sumX += currentX;
                        sumY += currentY;
                    
                        // search in four directions
                        for (const [directionX, directionY] of directions) {
                            const newX = currentX + directionX;
                            const newY = currentY + directionY;
                            // if a valid location and a "1", add to queue
                            if (
                                newX >= 0 && newX < width && newY >= 0 && newY < height &&
                                binary[newY * width + newX] === 1 && !visited[newY * width + newX]
                            ) {
                                visited[newY * width + newX] = 1;
                                queue.push([newX, newY]);
                            }
                        }
                    }
                
                    // if this area is bigger than max area, replace max area with this area
                    if (count > maxCount) {
                    maxCount = count;
                    centroidX = sumX / count;
                    centroidY = sumY / count;
                    }
                }
            }
        }

        // Put updated binarized image back
        ctx.putImageData(imageData, 0, 0);

        // Draw centroid as a pink target
        if (maxCount > 0) {
            // Small filled center dot
            ctx.beginPath();
            ctx.arc(centroidX, centroidY, 8, 0, 2 * Math.PI); // small radius
            ctx.fillStyle = "#f32f79"; // pink fill
            ctx.fill();

            // Larger hollow ring around it
            ctx.beginPath();
            ctx.arc(centroidX, centroidY, 20, 0, 2 * Math.PI); // bigger radius
            ctx.lineWidth = 4; // ring thickness
            ctx.strokeStyle = "#f32f79"; // pink stroke
            ctx.stroke();
        }

        // Return data URL
        return canvas.toDataURL();
    }

    return (
        <div>
        {/* Pass binarized image to Binarized Frame */}
        <BinarizedFrame binarizedSrc={binarizedImage} />
        </div>
    );
    }