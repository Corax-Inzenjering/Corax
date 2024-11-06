import * as _page from "./page.js";

window.addEventListener("load", () => { initDefault(); });

function initDefault() {
    _page.initPage();
    _page.scrollHandler.handlePageScrolling();
}