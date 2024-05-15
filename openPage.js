/**
 * This code is necessary for the pop up to be able to open the collage.html file
 * from the web extension pop-up. I tried including it in a script tag in the html
 * but this seemed to be against the rules.
 */

/* Get the button to open the collage page */
const goToCollageBtn = document.getElementById('openCollage');

/* Add the event listener to open it */
goToCollageBtn.addEventListener( "click", function() {
  browser.runtime.sendMessage({ openNewPage: true });
} );

const resetBtn = document.getElementById('reset');

resetBtn.addEventListener('click', function() {

  browser.runtime.sendMessage({ clearLocalStorage: true });

});
