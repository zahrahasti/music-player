"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var cardTopTemplate = document.querySelector("[data-card-top-template]");
var musicCardTemplate = document.querySelector("[data-card-music]");
var containerTopChart = document.querySelector(".container-top-chart");
var containerMusicPlayer = document.querySelector(".container-music");
var musics = [];
var searchInput = document.querySelector(".search");
var ListSearch = searchInput.addEventListener("input", function (e) {
    e.preventDefault();
    //  if (musics.every((music) => typeof music.title === "string" && typeof music.artist === "string")) {
    renderSearchData(musics, searchInput.value.toLocaleLowerCase());
    //   }
});
function fetchData(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, cards;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    renderTopCard(data);
                    renderMusicPage(data);
                    cards = __spreadArray([], document.querySelectorAll("[data-music]"), true);
                    playMusic(cards);
                    return [2 /*return*/];
            }
        });
    });
}
function renderSearchData(musics, value) {
    musics.map(function (music) {
        var isVisible = music.title.includes(value) || music.artist.includes(value);
        console.log(isVisible);
        console.log(isVisible);
    });
}
function renderTopCard(data) {
    if (data !== null) {
        musics = data.map(function (d) {
            return { title: d.title.toLocaleLowerCase(), artist: d.artist.toLocaleLowerCase() };
        });
        var topDataCard = data.sort(function (a, b) { return Number(b.likes) - Number(a.likes); });
        var sliceTop = topDataCard.slice(0, 3);
        cardDetail(containerTopChart, cardTopTemplate, sliceTop);
    }
}
// function render
fetchData("./data/music.json");
function loadImage(url, image) {
    image.addEventListener("load", function () {
        image.src = url;
    });
    image.addEventListener("error", function () {
        image.src = "./bg-mobile.png";
        return new Error("Error to load image");
    });
}
function renderMusicPage(data) {
    if (data !== null) {
        cardDetail(containerMusicPlayer, musicCardTemplate, data);
    }
}
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
        loadImage(d.artwork, image);
        container.appendChild(card);
    });
}
function playMusic(musicEl) {
    musicEl.forEach(function (el) {
        el.addEventListener("click", function (e) {
            var _a, _b;
            e.preventDefault();
            var audio = document.querySelector("audio");
            var titleAduio = document.querySelector(".container-play-music [data-title]");
            var artistAduio = document.querySelector(".container-play-music [data-artist]");
            var title = (_a = el.querySelector("[data-title]")) === null || _a === void 0 ? void 0 : _a.textContent;
            var artist = (_b = el.querySelector("[data-artist]")) === null || _b === void 0 ? void 0 : _b.textContent;
            titleAduio.textContent = "".concat(title);
            titleAduio.textContent = "".concat(artist);
            audio.src = "".concat(el.dataset.url);
            audio.addEventListener("load", function () {
                audio.play();
            });
        });
    });
}