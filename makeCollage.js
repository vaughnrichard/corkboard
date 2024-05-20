/**
 * This file deals with constructing the collage page.
 */

/* Imports */
// import { objectToCSS } from "./utils.js";

/* Call the function to make the collage */
makeCollage();

/* Constants */
const iframeWidth = 200;
const iframeHeight = 250;
/* End constants */

/**
 * Function to draw the elements gathered 
 */
async function makeCollage() {
  // get the storage object
  const storage = await browser.storage.local.get();

  const posList = [];
  generateRandomAreaOrder(posList);

  for (const key in storage) {
    const item = storage[key];
    const newDiv = generateRandomItem(item["element"], item["style"], item["url"]);
    // newDiv.appendChild(containerDiv);
  }
}


/**
 * This function creates a div and styles it for a random item from the stored
 * elements. It returns the div that was placed on the page.
 * @param {HTMLElement} element 
 * @param {Object} style 
 * @param {string} url 
 */
function generateRandomItem(element, style, url) {

  /* Get the collage dive, create the container div */
  /* Also append the container div to the collage div */
  const collageDiv = document.getElementById('collage_div');
  const containerDiv = document.createElement('div');
  collageDiv.appendChild(containerDiv);

  /* style the container Div */
  styleContainerDiv(containerDiv, collageDiv, url);

  /* Create, style, append the data div */
  const dataDiv = document.createElement('div');
  styleDataDiv(element, style, dataDiv);
  containerDiv.appendChild(dataDiv);

  return containerDiv;
}

/**
 * generateRandomItem Helper Functions
 */

function styleDataDiv(element, style, dataDiv) {
  dataDiv.innerHTML = element;

  objectToCSS(style, dataDiv);

  const elementStyling = {
    "max-width": '250px',
    "max-height": '250px',
    border: "solid 1px black",
    overflow: "auto"
  }

  for (const key in elementStyling) {

    dataDiv.style[key] = elementStyling[key];

  }
}

/**
 * 
 * @param {*} containerDiv 
 * @param {*} collageDiv 
 * @param {*} url 
 */
function styleContainerDiv(containerDiv, collageDiv, url) {

  const allowedWidth = collageDiv.clientWidth - 250;
  const allowedHeight = collageDiv.clientHeight - 250;

  const left = Math.random() * allowedWidth;
  const top = Math.random() * allowedHeight;

  const containerStyling = {
    position: "absolute",
    left: String(left)+'px',
    top: String(top)+'px',
    display: "grid",
    "grid-template-columns": "1fr",
    "max-width": '250px',
    "max-height": '250px',
    border: "solid 1px black",
    overflow: "auto",
    "background-color": "white"
  };

  for (const key in containerStyling) {

    containerDiv.style[key] = containerStyling[key];

  }

  containerDiv.addEventListener('click', function () {

    browser.tabs.create({ url: url });

  });

  const exitDiv = document.createElement('div');

  const exitStyling = {
    "background-color": "red",
    // left: (containerDiv.offsetWidth - 15) + 'px',
    // bottom: (containerDiv.offsetHeight - 15) + 'px',
    right: "100%",
    top: "1px",
    width: "14px",
    height: "14px",
    position: "sticky",
    border: "1px black"
  }

  for (const key in exitStyling) {

    exitDiv.style[key] = exitStyling[key];

  }

  exitDiv.addEventListener("click", function removeFromCollage() {

    // containerDiv.style['visibility'] = 'hidden';
    collageDiv.removeChild( containerDiv );
    event.stopPropagation();

  });

  containerDiv.append(exitDiv);

}

function positionDivElementOnPage(posList, div) {



}


/* Other Helpers */
/**
 * 
 * @param {*} styleObject 
 * @param {*} targetElement 
 */
function objectToCSS(styleObject, targetElement) {

  for (const key in styleObject) {

    targetElement.style[key] = styleObject[key];

  }

}

/**
 * 
 * @param {*} list 
 * @returns 
 * 
 * Function adapted from ChatGPT
 */
function generateRandomAreaOrder(list) {

  list = [];

  for (let i = 0; i<10; i++) {
    list.push(i);
  }

  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]]; // Swap elements
  }
  return list;
}