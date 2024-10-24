let headerHeight;
let initializedHeader = false;

let hamburger;
let hamburgerMenu;
let hamburgerMenuCloser;

export function initHeader() {
	if (initializedHeader) {
		return;
	}
	initializedHeader = true;
	headerHeight = header.querySelector(".wrapper").offsetHeight;
	header.style.setProperty("--header-height", headerHeight.toString() + "px");

    initHamburger();
}

function initHamburger() {
	hamburger = header.querySelector(".wrapper").querySelector(".hamburger");
	hamburgerMenu = header.querySelector(".hamburger-menu");
	hamburgerMenuCloser = hamburgerMenu.querySelector(".close").querySelector("img");
	hamburger.addEventListener("click", () => {
		tools.showElement(hamburger, false);
		tools.showElement(hamburgerMenu, true);
	});
	hamburgerMenuCloser.addEventListener("click", () => {
		tools.showElement(hamburger, true);
		tools.showElement(hamburgerMenu, false);
	});
}