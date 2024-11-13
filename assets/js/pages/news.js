import * as _page from "./page.js";

window.addEventListener("load", () => { initProjectsPage(); });

function initProjectsPage() {
    _page.scrollHandler.handlePageScrolling();

    loadNews();
}

async function loadNews() {
    try {
        let template = await initItemTemplate();
        await initNews(template);
    }
    catch (e) {
        console.error(e);
    }
}

async function initItemTemplate() {
    return fetch("../assets/page-parts/news-item.html")
        .then((response) => response.text())
        .then((html) => {
            const parser = new DOMParser();
            return parser.parseFromString(html, "text/html").querySelector("body").querySelector("article");
        });
}

async function initNews(template) {

    let allNews = document.getElementById("all-news");
    let json = await initNewsJson();

    for (let i = 0; i < json.news.length; i++) {
        let newItem = createNewItem(template, allNews);
        setupItem(newItem, json.news[i]);
    }
}

function createNewItem(template, parent) {
    let newItem = template.cloneNode(true);
    parent.appendChild(newItem);
    return newItem;
}

function setupItem(item, entry) {
    let link = item.querySelector("a");
    link.setAttribute("href", entry.link);
    let image = link.querySelector("img");
    image.addEventListener("error", () => { image.setAttribute("src", "../assets/images/noimage.jpg"); });
    image.setAttribute("src", entry.image);
    item.querySelector(".date").innerHTML = entry.date;
    item.querySelector(".title").innerHTML = entry.title;
    return item;
}

async function initNewsJson() {
    let response = await fetch("../assets/data/news.json");
    if (!response.ok) {
        alert("Error loading project.");
    }
    return await response.json();
}