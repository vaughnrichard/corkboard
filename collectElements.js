/**
 * This file is the code that contains the code 
 */



const allDivsOnPage = document.getElementsByTagName("div");

const randDivIndex = Math.round( Math.random() * allDivsOnPage.length);

const selectedDiv = allDivsOnPage[randDivIndex];

const style = cssStyleDeclarationToObject( getComputedStyle(selectedDiv) );
console.log(style);

const dateAccessed = Date.now();

const url = document.URL;

htmlObject = {}

htmlObject[dateAccessed] = {
  url: url,
  element: selectedDiv.outerHTML,
  style: style
};

// localStorage.setItem(url, htmlObject);
browser.storage.local.set(htmlObject);

console.log( browser.storage.local.get() );


function cssStyleDeclarationToObject(styleDeclaration) {
  const styleObject = {};
  for (let i = 0; i < styleDeclaration.length; i++) {
    const propertyName = styleDeclaration[i];
    const propertyValue = styleDeclaration.getPropertyValue(propertyName);
    styleObject[propertyName] = propertyValue;
  }
  return styleObject;
}