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
const cardTopTemplate = document.querySelector(".card-top-chart");
let listData = [];
const searchInput = document.querySelector(".search");
const ListSearch = searchInput.addEventListener("input", (e) => {
    e.preventDefault();
    console.log(searchInput.value);
});
function fetchData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const data = yield response.json();
        renderData(data);
    });
}
function renderData(data) {
    if (data !== null) {
        data.map(d => {
            console.log(cardTopTemplate);
        });
    }
}
fetchData("./data/music.json");
