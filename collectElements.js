/**
 * This file is the code that contains the code the collects the HTML
 * elements on a page and stores them to the brower's storage API.
 */

/* Imports */
// import { cssStyleDeclarationToObject } from "./utils.js";

/* Get the element! */
captureAndStoreHTMLDiv();

/**
 * 
 */
function captureAndStoreHTMLDiv() {

  /* Get the divs currenty on a page. */
  const allDivsOnPage = document.getElementsByTagName("div");

  /* Randomly select a div and get its styling */
  const randDivIndex = Math.round( Math.random() * allDivsOnPage.length);
  const selectedDiv = allDivsOnPage[randDivIndex];

  /**
   * If the div is too small or set to hidden don't save it
   */
  if (selectedDiv.clientWidth < 20 ||
    selectedDiv.clientHeight < 20 || 
    !selectedDiv.checkVisibility() ||
    selectedDiv.clientWidth * selectedDiv.clientHeight < 2000) {
      return;
  }

  /**
   * Get the style, date accessed, and url of the page the element was collected
   * from.
   */
  const style = cssStyleDeclarationToObject( getComputedStyle(selectedDiv) );
  const dateAccessed = Date.now();
  const url = document.URL;

  /* Create an object with the above information */ 
  htmlObject = {}
  htmlObject[dateAccessed] = {
    url: url,
    element: selectedDiv.outerHTML, // outer HTML b/c actual element can't be stored
    style:  style
  };

  /* Add the object to storage */
  browser.storage.local.set(htmlObject);
}

/* Helper Functions */
function cssStyleDeclarationToObject(styleDeclaration) {
  const styleObject = {};
  for (let i = 0; i < styleDeclaration.length; i++) {
    const propertyName = styleDeclaration[i];
    const propertyValue = styleDeclaration.getPropertyValue(propertyName);
    styleObject[propertyName] = propertyValue;
  }
  return styleObject;
}