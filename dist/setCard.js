"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardDetail = void 0;
var loadImage_1 = require("./loadImage");
function cardDetail(container, template, data) {
    data.map(function (d, i) {
        var _a;
        var card = (_a = template.content.cloneNode(true)) === null || _a === void 0 ? void 0 : _a.children[0];
        // const urlMusic=card.querySelector("[data-music]");
        var title = card.querySelector("[data-title]");
        var artist = card.querySelector("[data-artist]");
        var image = card.querySelector("[data-image]");
        card === null || card === void 0 ? void 0 : card.setAttribute("data-index", "".concat(i));
        card === null || card === void 0 ? void 0 : card.setAttribute("data-url", d.url);
        title.textContent = d.title;
        artist.textContent = d.artist;
        (0, loadImage_1.loadImage)(d.artwork, image);
        container.appendChild(card);
    });
}
exports.cardDetail = cardDetail;
