import * as _page from "./page.js";

window.addEventListener("load", () => { initProjectsPage(); });

function initProjectsPage() {
    _page.scrollHandler.handlePageScrolling();

    loadProjects();
}

async function loadProjects() {
    try {
        let template = await initItemTemplate();
        await initProjects(template);
    }
    catch (e) {
        console.error(e);
    }
}

async function initItemTemplate() {
    return fetch("../assets/page-parts/projects-item.html")
        .then((response) => response.text())
        .then((html) => {
            const parser = new DOMParser();
            return parser.parseFromString(html, "text/html").querySelector("body").querySelector(".item");
        });
}

async function initProjects(template) {
    let topProjects = document.getElementById("top-projects");
    let moreTopProjecs = topProjects.querySelector(".more-top-projects");
    let otherProjects = document.getElementById("other-projects");
    let json = await initProjectsJson();

    setupItem(topProjects.querySelector(".top-project"), json.projects[0]);

    for (let i = 1; i < json.projects.length; i++) {
        let newItem
        if (i <= 3) {
            newItem = createNewItem(template, moreTopProjecs);
        } else {
            newItem = createNewItem(template, otherProjects);
        }
        setupItem(newItem, json.projects[i]);
    }
}

function createNewItem(template, parent) {
    let newItem = template.cloneNode(true);
    parent.appendChild(newItem);
    return newItem;
}

function setupItem(item, entry) {
    item.setAttribute("href", ("../project?p=").concat(entry.id));
    item.querySelector("h2").innerHTML = entry.name;
    let itemImage = item.querySelector("img");
    itemImage.addEventListener("error", () => { itemImage.setAttribute("src", "../assets/images/noimage.jpg"); });
    itemImage.setAttribute("src", ("../assets/projects/").concat(entry.id).concat("/images/").concat(entry.images[0]));
    return item;
}

async function initProjectsJson() {
    let response = await fetch("../assets/data/projects.json");
    if (!response.ok) {
        alert("Error loading project.");
    }
    return await response.json();
}