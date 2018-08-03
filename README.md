# ski-bg-map-app (Neighborhood Map React), Udacity Project

This project is part of the __Frond-End Web Developer Nanodegree__ by [Udacity](https://in.udacity.com/). The purpose of this project is to build a single page application from scrach using ReactJS and to add features provided by external APIs - [Google Maps API](https://cloud.google.com/maps-platform/) and [Foursquare API](https://developer.foursquare.com/)
The app shows map of Bulgarian mountains with the most popular ski resorts.

## Live Version
You can find a Live version of the app [here]().

## Dependencies 
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
The following resources are used for building the project:
- `Google Maps API`To provide a full screen map to the application
- `Foursquare API` The functionality using third-party APIs to provide information when a map marker or list view entry is clicked.
- [`google-maps-react`](https://www.npmjs.com/package/google-maps-react). A declarative Google Map React component using React, loading dependencies, current-location finder and a test-driven approach.

## Requirements
You can find Project Specification [here](https://review.udacity.com/#!/rubrics/1351/view)

## Installation
You can clone or download the repo as a .zip file. Once downloaded, you need to run `npm install` and then `npm start` in your console to start the local server. `create-react-app`will provide a working Service Worker. To show it in action you must run the application in production build mode. To do that, run `npm run build` to create a buil version of the app and then `serve -s build` to serve the production build in localhost.

## Directions to use
- The Markers give the users details about the specific location.
- The Info Window Gives you a `Title` of the location, an `Adress` and `Location on Foursquare` link, for more information.
- The user can search for places from the `search input field`,which filters the locations or by clicking directly on a marker on the map.

## Attribution

[Foursquare API](https://developer.foursquare.com/) - 3rd party API

