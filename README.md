# Project Title

## 1. Project Description
Due to the prevalence of avoidable household food waste, we are creating the mobile-first web based app "Stock-O-Clock" that combines the functionality of a grocery list with food storage tracking to notify users of upcoming food expiry dates.

## 2. Names of Contributors
List team members and/or short bio's here... 
* Ryan - the RompingRhyno
* Hi, My name is Logan. I'm super excited to make this cool new app.
* Hello, my name is Alex. I'm interested in the challenges that will come with developing this project.
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Font-Awesome 4.7.0 (Font icons)

## 4. Complete setup/installion/usage
The current version 1.0 of the app is hosted here: https://stockoclock-cf594.web.app/
* Sign-up and login to get started.
* Follow the tips on the placeholder cards to learn how to use our app.

## 5. Known Bugs and Limitations
Here are some known bugs:
* Shopping List is not yet implemented
* Sharing 'fridges' is almost fully implemented, just needs some javascript to write current fridge selection to Firestore
* Toggle to turn delete confirmations back on is not functional yet.

## 6. Features for Future
What we'd like to build in the future:
* Shopping list integration
* Recipe Generator
* Grocery List Maker
* Sharing specific foods to friends

	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── login.html               # sign-up and login page
├── main.html                # food stock page, where users can add, remove, and edit food list
├── shopping.html            # placeholder for shopping list integration
├── settings.html            # settings page, where users can share 'fridges' and toggle delete confirmations (see known bugs)
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
|   /app.jpg                 # Photo by <a href="https://unsplash.com/@kellysikkema?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Kelly Sikkema</a> on <a href="https://unsplash.com/photos/person-writing-on-white-paper-v9FQR4tbIq8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
|   /fridge.jpg              # Photo by <a href="https://unsplash.com/@alexacea?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Alexandru Acea</a> on <a href="https://unsplash.com/photos/gray-sneaker-cVTC0gEOx8E?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
|   /clock.ico               # Icon by <a href="https://www.flaticon.com/authors/pixel-buddha">Pixel Buddha</a> on flaticon.com
|   /logo.svg                # Logo by Safia Dorae (Ryan's girfriend)
|   /mainbanner.jpg          # Photo by <a href="https://unsplash.com/@jimmydean?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Jimmy Dean</a> on <a href="https://unsplash.com/photos/assorted-fruits-on-brown-wooden-bowls-Yn0l7uwBrpw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
|   /mouldy.jpg              # Photo by <a href="https://unsplash.com/@sandym10?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sandy Millar</a> on <a href="https://unsplash.com/photos/white-and-orange-ice-cream-jDRd_WHGFAI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
|   /sprout.jpg              # Photo by <a href="https://unsplash.com/@rainierridao?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Rainier Ridao</a> on <a href="https://unsplash.com/photos/a-small-green-plant-sprouting-from-the-ground-Gj6w4IasZY0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
├── scripts                  # Folder for scripts
|   /main.js                 # Javascript functions for the main.html page
|   /authentication.js       # Functions for when user is authenticated from login
|   /firebaseAPI_Team33      # Firebase config and references
|   /fridge.js               # Looks like functions that belong in settings to me, but Alex wrote them here
|   /script.js               # Logout function that should be put in settings but we don't have a logout button there yet
|   /shoppingList            # Placeholder for shopping list integration
├── styles                   # Folder for styles
|   /style.css               # Styles for index.html and login.html
|   /style-stock.css         # Styles for stock.html
|   /style-settings.css      # Styles for settings.html
|   /style-shop.css          # Placeholder for shopList.html
├── fonts
|   /louis_george_cafe_*     # Several font weights by <a href="https://www.dafont.com/chen-yining.d6681">Chen Yining</a> on <a href="https://www.dafont.com/">dafont</a>
```


