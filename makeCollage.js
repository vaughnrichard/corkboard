/**
 * This file deals with constructing the collage page.
 */

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

  const collageDiv = document.getElementById('collage_div');

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

  function objectToCSS(styleObject, targetElement) {

    for (const key in styleObject) {

      targetElement.style[key] = styleObject[key];

    }

  }

  const collageDiv = document.getElementById('collage_div');

  const containerDiv = document.createElement('div');

  collageDiv.appendChild(containerDiv);

  const dataDiv = document.createElement('div');

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

  containerDiv.appendChild(dataDiv);

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

  const linkToHomePage = document.createElement('a');
  linkToHomePage.textContent = "Origin";
  linkToHomePage.href = url;

  linkToHomePage.style['textAlign'] = 'center';

  containerDiv.append(linkToHomePage);

  containerDiv.addEventListener('click', function () {


    // document.open(url);
    browser.tabs.create({ url: url });

  });

  return containerDiv;
}

/**
 * Generate Random Item Helper Functions
 */

