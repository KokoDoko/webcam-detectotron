# Webcam Detectotron

Using a machine learning alogrithm to recognise webcam images.
Click the 'associate' button to associate specific webcam output with each of the three 'Adventure Time' images.

*For example, take a few shots where you sit really close to the webcam, and associate this with the close-up of Finn. Do this a couple of times with different variations of sitting close to the camera.*

When all three images have associated webcam output, you can click start. The machine will start analysing the webcam and decide for itself which of the three images it should show.

Test it out at

## Building

To build the project you can install [Parcel](https://parceljs.org) and then run the build command. It should also work with Webpack but then you need one of those pesky config files, and who wants that?

```
npm install -g parcel-bundler
npm run build
```

## Sources

The app is inspired by [Machine Learning for Artist](https://github.com/ml4a) and uses the *K-Nearest-Neighbour* algorithm provided by [kNearJS](https://github.com/NathanEpstein/KNear)
