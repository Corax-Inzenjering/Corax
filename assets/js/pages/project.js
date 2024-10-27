import * as _page from "./page.js";

window.addEventListener("load", () => { initIndexPage(); });

function initIndexPage() {
    _page.initPage();
    _page.scrollHandler.handlePageScrolling();

    console.log(navigator.storage.getDirectory());
    /*
    let test = new URLSearchParams(window.location.search);
    let testImageLocation = ("../assets/images/projects/temporary/").concat(test.get("p")).concat(".jpg");
    document.getElementById("test-image").setAttribute("src", testImageLocation);

    loadJson();*/
}

let testJson;

async function loadJson() {
    try {
        let response = await fetch("../assets/projects.json");
        if (!response.ok) {
            alert("Error loading project.");
        }

        testJson = await response.json();
        console.log(testJson);
    } catch(e) {
        console.error(e.message);
    }
}