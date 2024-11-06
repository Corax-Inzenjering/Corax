let imageSelectors;
let currentImageSelector;
let currentImageIndex = 0;

let slideTimeoutId = -1;
let slideTransitioning = false;

const slideDuration = 2500;
const slideTransitionDuration = 1000;

export function initSlides() {
	initImageSelectors();
	startSlideshowLoop();

	window["jumpToSlide"] = jumpToSlide;
}

function initImageSelectors() {
	let wrapper = document.getElementById("slideshow").querySelector(".images");
	imageSelectors = [];
	for (let i = 0; i < wrapper.children.length; i++) {
		let selector = wrapper.children[i];
		selector.setAttribute("onclick", "jumpToSlide(".concat(i).concat(")"));
		tools.showElement(selector, false);
		imageSelectors.push(selector);
	}
	setActiveImageSelector(0);
}

function setActiveImageSelector(index) {
	if (currentImageSelector) {
		tools.showElement(currentImageSelector, false);
	}
	currentImageSelector = imageSelectors[index];
	tools.showElement(currentImageSelector, true);
}

function jumpToSlide(index) {
	if (slideTransitioning) {
		return;
	}
	if (currentImageIndex == index) {
		return;
	}
	if (index < 0 || index >= imageSelectors.length) {
		return;
	}
	clearTimeout(slideTimeoutId);
	transitionSlideTo(index);
}

function nextSlide() {
	if (slideTransitioning) {
		return;
	}
	clearTimeout(slideTimeoutId);
	transitionSlideTo(getIncrementedCurrentImage());
}

function previousSlide() {
	if (slideTransitioning) {
		return;
	}
	clearTimeout(slideTimeoutId);
	transitionSlideTo(getDecrementedCurrentImage());
}

//////////////////////

function scrollIntoViewHorizontally (container, child)
{
	const child_offsetRight = child.offsetLeft + child.offsetWidth;
	const container_scrollRight = container.scrollLeft + container.offsetWidth;
  
	if (container.scrollLeft > child.offsetLeft) {
	  container.scrollLeft = child.offsetLeft;
	} else if (container_scrollRight < child_offsetRight) {
	  container.scrollLeft += child_offsetRight - container_scrollRight;
	}
}

function setActiveImage(index) {
	setActiveImageSelector(index);
	tools.showElement(imageSelectors[currentImageIndex], false);
	tools.showElement(imageSelectors[index], true);
	slideshowMainImage.setAttribute("src", imageSelectors[index].getAttribute("src"));
	scrollIntoViewHorizontally(imageSelectors[index].parentElement, imageSelectors[index]);
	//imageSelectors[index].scrollIntoView({ behavior: "smooth", block: "end", inline: "center"});
    currentImageIndex = index;
}

function transitionSlideTo(index) {
	if (slideTransitioning) {
        return;
    }
	slideTransitioning = true;
	setActiveImageSelector(index);
    setTimeout(() => {
        setActiveImage(index);
		setTimeout(() => { slideTransitioning = false; startSlideshowLoop(); }, slideTransitionDuration);
    }, slideTransitionDuration);
}

function startSlideshowLoop()
{
    if (slideTransitioning) {
        return;
    }
	slideTimeoutId = setTimeout(() => { transitionSlideTo(getIncrementedCurrentImage()); }, slideDuration);
}

function getIncrementedCurrentImage() {
    if (currentImageIndex + 1 >= imageSelectors.length) {
        return 0;
    }
    return currentImageIndex + 1;
}

function getDecrementedCurrentImage() {
    if (currentImageIndex - 1 < 0) {
        return imageSelectors.length - 1;
    }
    return currentImageIndex - 1;
}