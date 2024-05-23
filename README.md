# corkboard

## About
This web extension seeks to capture a user's history in an artistic way. When
enabled, this extension will save an element from each page. Then, when prompted,
a webpage containing a collage of elements from each page will be genereated.

This extension works by using the browser storage API to store data associated
with each link visited. It captures the following data from each page:
- URL
- Time Accessed
- Element and Associated Styling

## Privacy Statement
All data is kept local to your browser. A substantial amount of information
is saved though. As mentioned above, the URL, Time Accessed, and an element
and associated styling are all saved from the page. The URL and Time Accessed
are straight forward in their data collection, but the element / styling can
contain a substantial amount of information. For example, it could save
an element containing your SSN. Although this will never leave your computer
(at least through my extension), this could pose a privacy risk. Using the
"Clear Elements" button on the Web Extension will clear all the elements from
your saved data, removing any potentially unwanted information stored.

## How to Use
1. Install
  Installation can be done by downloading the files and then loading them
  through the temporary extensions feature (go to about:debugging#/runtime/this-firefox).
  This project is only guaranteed to work on Firefox (version >=126.0) at this moment.

2. Visit Pages
  As you visit pages, this extension will collect elements in the background.

3. View Collage
  When you want to view the collage all you have to do is navigate to the
  extension pop-up and select the "View Collage" button. This will bring
  you to a new HTML page and generate the collage on it. The pop-up can
  be found on the extensions tab on the tool bar (the puzzle piece next to the
  profile button on the Firefox browser). Clicking this will display the
  `Corkboard` extension - clicking this yields the pop-up.

  While viewing the collage, the windows may be temporarily hidden by clicking
  the red boxed in the top right of their boxes.

4. Clear Elements
  When your collage is getting too cluttered, there's an element you do not
  want, or you just want a fresh start you may clear the collage. This can
  be done by accessing the pop-up and selecting the "Clear Elements" button.