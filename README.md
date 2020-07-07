# Minube Travel App

## Description
At the International Train Lovers Association, we want to create a website that allows us to save the train stations we visit. The association's members haver compiled 1098 train stations around the world, and a software developer friend has created a small interface that allows us to search stations and indicate the ones we've visited with a heart symbol.

Given the sheer amount of stations, they are grouped by cities so that it they are easier to search. And, if you only want to focus on one country, you also have the option to view cities by country.

Although our developer friend used Avenir font, us train lovers prefer Merriweather and we'd like you to use this font.

Next, we'll explain how we'd like our website.

### Requisites
- It uses a CSS preprocessor
- It has a templating system
- It should be SEO-friendly
- The design is responsive between 320px and 768px (it’s not necessary to appear correctly in desktop).
- It takes into account a stack for PHP

### Mockups
![mockup](https://imgs-akamai.mnstatic.com/tools/tests/frontend/mockup.png)

- Upon entering, the principal destinations with train stations are shown.
- These destinations can be filtered by country using a menu available in the filter button in the top right corner.
- When a city is clicked, a map is shown.

![mockup2](https://imgs-akamai.mnstatic.com/tools/tests/frontend/mockup2.png)

- Upon entering a city, all stations in that city are shown.
- In the upper right corner there is an icon that opens a menu with the stations in that city.
- The user can mark a station as visited with a heart.
- The marked stations should be maintained during various browsing sessions from the same device, without using server databases.
- The marked stations should be shown on the map in a different color.
- The user should be able to unmark a station.
- If a station has been previously marked, it should appear marked in red when the user enters that city.

### Url for API request for list of all stations:
``https://gist.githubusercontent.com/inakivb/943ed6b3a8bcc667c1e1147b7591e32f/raw/355b2d67aaea30fd322c7d1e1a8660480609d67a/stations.json``

### Graphic resources
``https://www.dropbox.com/sh/b84svb4ewk7yufw/AACwE2CO7KYcUB3kAurM8w1Ha?dl=0``

### Structure of image URLs:
`https://imgs-akamai.mnstatic.com/{chars 0-1}/{chars 1-2}/{hashcode}.jpg?output-quality=75&output-format=progressive-jpeg&interpolation=lanczos-none&fit=around%7C{WIDTH}%3A{HEIGHT}&crop={WIDHT}%3A{HEIGHT}%3B*%2C*`

Given the image hashcode **88380e61d8cc9ba87a107bebe60fc6df** , to get a 183x90px crop, the URL should be structured in the following way:
```
88   38  0e61d8cc9ba87a107bebe60fc6df
 |   |
 L{chars 0-1}
     |
     L{chars 1-2}
```

``https://imgs-akamai.mnstatic.com/88/38/88380e61d8cc9ba87a107bebe60fc6df.jpg?output-quality=75&output-format=progressive-jpeg&interpolation=lanczos-none&fit=around%7C183%3A90&crop=183%3A90%3B*%2C*``

![image](https://imgs-akamai.mnstatic.com/88/38/88380e61d8cc9ba87a107bebe60fc6df.jpg?output-quality=75&output-format=progressive-jpeg&interpolation=lanczos-none&fit=around%7C183%3A90&crop=183%3A90%3B*%2C*
)


## How to run

### Installing

First, you have to install npm packages used in the project. So, you have to run the next command in the root of directory

```
npm install
```

You have to specify an Api Key of Google Maps in /app/env.js to run the maps.


```
module.exports = {
  apiKey: 'AIz*************************A'
}
```

Now the app is ready to run with the command

```
npm start
```

This command runs [Gulp](https://gulpjs.com/) generating the files into the folder /dist/. To run the application you have to open /dist/index.html

### Running the tests

Several unit test have been done for this project. The tests are running under [Jasmine](https://jasmine.github.io/index.html) and you have to run the next command to execute them

```
npm test
```
