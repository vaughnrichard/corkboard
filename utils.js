/**
 * Misc utility functions relative to the project
 */

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

/* helper function to store the CSS property b/c CSSStyleDec can't be stored */
/* This function was given by ChatGPT */
function cssStyleDeclarationToObject(styleDeclaration) {
  const styleObject = {};
  for (let i = 0; i < styleDeclaration.length; i++) {
    const propertyName = styleDeclaration[i];
    const propertyValue = styleDeclaration.getPropertyValue(propertyName);
    styleObject[propertyName] = propertyValue;
  }
  return styleObject;
}

export {
  objectToCSS,
  cssStyleDeclarationToObject
}