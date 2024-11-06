import * as _page from "./page.js";
import * as _slideshow from "../slideshow.js";

window.addEventListener("load", () => { initIndexPage(); });

function initIndexPage() {
    _page.initPage();
    _page.scrollHandler.handlePageScrolling();

    initProject(getProjectName());

    _slideshow.initSlides();

    window["slideshowMainImage"] = document.getElementById("slideshow").querySelector(".main-image");
}

function getProjectName() {
    return new URLSearchParams(window.location.search).get("p");
}

async function initProject(project_name) {
    try
    {
        let json = await initProjectsJson();
        for (let entry of json.projects) {
            if (entry.id == project_name) {
                document.querySelector("title").innerHTML = entry.name.concat(" | Corax Inženjering");
                document.getElementById("main-info").querySelector(".heading").querySelector("h1").innerHTML = entry.name;
                await fetch(("../assets/projects/").concat(project_name).concat("/description.txt"))
                .then((res) => res.text())
                .then((text) => {
                    document.getElementById("main-info").querySelector(".text").querySelector("p").innerHTML = text;
                }).catch(console.log("error"));
                await fetch(("../assets/projects/").concat(project_name).concat("/items.txt"))
                .then((res) => res.text())
                .then((text) => {
                    let items = text.split("\n");
                    let container = document.getElementById("main-info").querySelector(".text").querySelector("ul");
                    for (let item of items) {
                        let li = document.createElement("li");
                        li.innerHTML = item;
                        container.append(li);
                    }
                }).catch(console.log("error"));
                return;
            }
        }
        tools.showElement(body.querySelector("main"), false);
        tools.showElement(document.getElementById("error"), true);
        tools.showElement(footer, false);
    }
    catch(e) {
        console.error(e);
    }
}

async function initProjectsJson() {
    let response = await fetch("../assets/projects.json");
        if (!response.ok) {
            alert("Error loading project.");
        }
        return await response.json();
}