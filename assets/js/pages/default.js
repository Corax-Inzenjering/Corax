import * as _page from "./page.js";

window.addEventListener("load", () => { initDefault(); });

loadDefault();

function loadDefault() {
    _page.initPage();
}

function initDefault() {
    _page.scrollHandler.handlePageScrolling();
}