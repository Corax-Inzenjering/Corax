import * as _page from "./page.js";
import * as _slideshow from "../slideshow.js";

window.addEventListener("load", () => { initIndexPage(); });

function initIndexPage() {
    _page.scrollHandler.handlePageScrolling();

    initProject(getProjectName());

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

                let noInfo = false;

                const paragraph = document.getElementById("main-info").querySelector(".text").querySelector("p");
                try {
                    const response = await fetch(("../assets/projects/").concat(project_name).concat("/description.txt"))
                    if (!response.ok) {
                        throw new Error("File 'description.txt' could not be loaded.");
                    } else {
                        response.text().then((text) => {
                            paragraph.innerHTML = text;
                            noInfo = false;
                        });
                    }
                } catch(error) {
                    console.log(error.message);
                    tools.showElement(paragraph, false);
                    noInfo = true;
                }

                const list = document.getElementById("main-info").querySelector(".text").querySelector("ul");
                try {
                    const response = await fetch(("../assets/projects/").concat(project_name).concat("/items.txt"))
                    if (!response.ok) {
                        throw new Error("File 'list.txt' could not be loaded.");
                    } else {
                        response.text().then((text) => {
                            let items = text.split("\n");
                            for (let item of items) {
                                let li = document.createElement("li");
                                li.innerHTML = item;
                                list.append(li);
                            }
                            noInfo = false;
                        });
                    }
                } catch(error) {
                    console.log(error.message);
                    tools.showElement(list, false);
                    noInfo = true;
                }

                if (noInfo) {
                    tools.showElement(document.getElementById("main-info"), false);
                }

                const slideshow = document.getElementById("slideshow");
                const mainImage = slideshow.querySelector(".main-image");
                mainImage.addEventListener("error", () => { mainImage.setAttribute("src", "../assets/images/noimage.jpg"); });
                mainImage.setAttribute("src", ("../assets/projects/").concat(entry.id).concat("/images/").concat(entry.images[0]));

                const allImages = slideshow.querySelector(".images");
                if (entry.images.length > 1) {
                    for (let i = 0; i < entry.images.length; i++) {
                        let newImage = document.createElement("img");
                        allImages.appendChild(newImage);
                        newImage.addEventListener("error", () => { newImage.remove(); });
                        newImage.setAttribute("src", ("../assets/projects/").concat(entry.id).concat("/images/").concat(entry.images[i]));
                        newImage.addEventListener("click", () => { _slideshow.setActiveImage(i); });
                    }
                }
            }
        }
        _slideshow.initSlides();
    }
    catch(e) {
        tools.showElement(body.querySelector("main"), false);
        tools.showElement(document.getElementById("error"), true);
        tools.showElement(footer, false);
        console.error(e);
    }
}

async function initProjectsJson() {
    let response = await fetch("../assets/data/projects.json");
        if (!response.ok) {
            alert("Error loading project.");
        }
        return await response.json();
}