import * as _page from "./page.js";

window.addEventListener("load", () => { initDefault(); });

loadDefault();

function loadDefault() {
    _page.initPage();
}

function initDefault() {
    _page.scrollHandler.handlePageScrolling();

    let iframe = document.getElementById("main-info").querySelector(".map").querySelector("iframe");
    const observer = new MutationObserver(mutations => {
        tools.showElement(iframe, true);
    });
      
    observer.observe(iframe.contentWindow.body, { childList: true, subtree: true });

    /*console.log(document.getElementById("main-info").querySelector(".map").querySelector("iframe").contentWindow.opener);
    document.getElementById("main-info").querySelector(".map").querySelector("iframe")
    .contentDocument.body.addEventListener("load", (e) => {
        console.log("yes");
        tools.showElement(e.target, true);
    });*/
}