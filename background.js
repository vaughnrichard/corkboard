/**
 * This file contains code necessary to open up a new tab once the button is
 * pressed. This code runs in the background and waits for a message to be sent
 * to the browser. Once this is detected, it opens up the collage.html page.
 */

/**
 * Add a listener to listen for new messages, and once a open page message is
 * sent in open collage.html.
 */
browser.runtime.onMessage.addListener((message) => {
  if (message && message.openNewPage) {
    browser.tabs.create({ url: browser.runtime.getURL("collage.html") });
  }

  if (message && message.clearLocalStorage) {
    browser.storage.local.clear();
  }
});

