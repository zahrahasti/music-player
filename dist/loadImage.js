"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadImage = void 0;
function loadImage(url, image) {
    image.addEventListener("load", function () {
        image.src = url;
    });
    image.addEventListener("error", function () {
        image.src = "./bg-mobile.png";
        return new Error("Error to load image");
    });
}
exports.loadImage = loadImage;
