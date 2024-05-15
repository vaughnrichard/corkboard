/**
 * 
 */

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


  let blocked_urls = 0;

  for (const key in storage) {
    const item = storage[key];

    // console.log(storage[key]);

    // try {
    //   generateRandomIframe(url);
    // } catch (err) {
    //   blocked_urls += 1;
    // }
    generateRandomItem(item["element"], item["style"], item["url"]);
  }

  console.log( String(blocked_urls) + " blocked urls." );
}




/**
 * 
 */
function generateRandomIframe(url) {
  const collageDiv = document.getElementById('collage_div');

  const allowedWidth = collageDiv.clientWidth - iframeWidth;
  const allowedHeight = collageDiv.clientHeight - iframeHeight;

  console.log("a&a", allowedHeight, allowedWidth);


  const left = Math.random() * allowedWidth;
  const top = Math.random() * allowedHeight;

  console.log("left, top", left, top);

  const newIframe = document.createElement('iframe');

  newIframe.setAttribute("src", url)
;
  const iframeStyling = {
    position: "absolute",
    left: String(left)+'px',
    top: String(top)+'px',
    width: String(iframeWidth)+'px',
    height: String(iframeHeight)+'px'
  }

  for (const key in iframeStyling) {

    newIframe.style[key] = iframeStyling[key];

  }

  collageDiv.appendChild(newIframe);

}

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

  // console.log("aw ah", containerDiv.clientWidth, containerDiv.clientHeight);

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
}