import * as nav from "./modules/navigation.js";
nav.init();

require("./vendors/prism.js");

// Prevent firing focus event when clicking on links
const links = document.querySelectorAll("a");

function handleMouseDown (e) {
	e.preventDefault();
}

links.forEach((l) => l.addEventListener("mousedown", handleMouseDown));
