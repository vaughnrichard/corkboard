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

  let posList = [];
  posList = generateRandomAreaOrder();

  for (const key in storage) {
    const item = storage[key];
    const newDiv = generateRandomItem(item["element"], item["style"], item["url"]);
    // newDiv.appendChild(containerDiv);
    positionDivElementOnPage(posList, newDiv);

    if (posList.length == 0) {
      posList = generateRandomAreaOrder();
    }
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

  /**
   * The collage div is the div the elements are pasted onto.
   * 
   * The container div is the over arching div that contains the element
   * div as well as the close box at the top left. This was done for easier
   * styling.
   * 
   * The element div contains the actual content from the visited web page.
   */
  const collageDiv = document.getElementById('collage_div');
  const containerDiv = document.createElement('div');
  const elementDiv = document.createElement('div');
  collageDiv.appendChild(containerDiv);
  containerDiv.appendChild(elementDiv)

  /* Styling needed so the user can scroll through the content div */
  elementDiv.style['overflow'] = 'auto';

  /* style the container Div */
  styleContainerDiv(containerDiv, collageDiv, url);

  /* Create, style, append the data div */
  const dataDiv = document.createElement('div');
  styleDataDiv(element, style, dataDiv);
  elementDiv.appendChild(dataDiv);

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
    overflow: "hidden",
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
    right: "0px",
    top: "0px",
    width: "14px",
    height: "14px",
    position: "absolute",
    border: "1px solid black"
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


  const currentPos = posList.pop();

  const top_adjust = Math.floor( currentPos / 5);
  const left_adjust = currentPos % 5;

  /* find the center of the selected box, in pixels */
  const center_pos = [
    ( 25 + (top_adjust * 50) ),
    ( 10 + (left_adjust * 20) ),
  ];

  /* Add some randomness to the positioning */
  center_pos[0] += (Math.random() * 25 - 12.5);
  center_pos[1] += (Math.random() * 10 - 5);

  /* convert to pixels from viewport */
  center_pos[0] *= (window.innerHeight / 100);
  center_pos[1] *= (window.innerWidth / 100);


  /* set the center of the box to this position */
  const rect = div.getBoundingClientRect();


  const width = rect.width;
  const height = rect.height;

  const collageRect = document.getElementById('collage_div').getBoundingClientRect();
  const collageTop = collageRect.top;

  // center_pos[0] -= (height / 2) + collageTop;
  // center_pos[1] -= (width / 2);

  const style_pos = [
    center_pos[0] - (height / 2) + collageTop,
    center_pos[1] - (width / 2)
  ];

  if ( style_pos[0] < collageTop)  { style_pos[0] = collageTop };
  if (style_pos[0] + height > window.innerHeight) {
    style_pos[0] -= (style_pos[0] + height - window.innerHeight);
  }

  if ( style_pos[1] < 0)  { style_pos[1] = 0 };
  if (style_pos[1] + width > window.innerWidth) {
    style_pos[1] -= (style_pos[1] + width - window.innerWidth);
  }

  div.style['top'] = style_pos[0] + 'px';
  div.style['left'] = style_pos[1] + 'px';


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
function generateRandomAreaOrder() {

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