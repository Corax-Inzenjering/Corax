import * as _page from "./page.js";

window.addEventListener("load", () => { initProjectsPage(); });

function initProjectsPage() {
    _page.initPage();
    _page.scrollHandler.handlePageScrolling();
}