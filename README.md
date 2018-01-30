# Webcam Detectotron

Using a machine learning algorithm to recognise webcam images, written entirely in Javascript.
Click the 'associate' button to associate specific webcam output with each of the three 'Adventure Time' images.

*For example, take a few shots where you sit really close to the webcam, and associate this with the close-up of Finn. Do this a couple of times with different variations of sitting close to the camera.*

When all three images have associated webcam output, you can click start. The machine will start analysing the webcam and decide for itself which of the three images it should show.

[Try it out here!](https://kokodoko.github.io/webcam-detectotron/)

![image](/src/images/webknear.png)


## K-Nearest-Neighbour

#### Supervised learning

This algorithm works by first associating data with a label. In the screenshot the large dots represent our training data, they have the label red or green.

#### Classifying

Once you have enough training data, you can provide a fresh data set to the machine, and then ask which existing label comes closest to that new set of data. 

The small dots in the screenshot are colored according to their three nearest neighbours (this is what the 'K' stands for, in this case 3). The machine uses X,Y coordinates to decide which large dots are the nearest.

![image](/src/images/knear.png)

## You can use any data

The mind-boggling thing is that this algorithm works just as well with more than two dimensions. In this repository we use webcam data that has 100 dimensions (10 x 10 rows of colors). As long as you provide arrays of numbers, the source can be anything - an excel sheet, a sound file, location data, etc. You could also use a 1000 dimensions for much more detailed analysis, but at some point your CPU might melt...

#### Javascript

The javascript kNear library provides you with these functions to apply the algorithm:

```
// a machine that looks at the three nearest neighbours for a point
let machine = new KNear(3)

// associate this data set with the label "mylabel"
machine.learn([2,3,7,12], "mylabel")

// ask the machine which label comes closest to this dataset
let label = this.machine.classify([6,2,9,4])   
```

## Getting started with your own variation

To quickly build your own demo, replace all code in `grid.js` with this example code. You don't need util.js, this is only used for color conversion.

```
import KNear from './knear'

export default class App {
    constructor() {
        this.machine = new KNear(3)
        this.machine.learn([2,3,7,12], "labelOne")
        this.machine.learn([5,9,12,16], "labelTwo")
        let label = this.machine.classify([6,2,9,4])
        console.log("the label for 6,2,9,4 is " + label)
    }
}

new App()
```

## Building

To build the project you can install [Parcel](https://parceljs.org) and then run the build command. It should also work with Webpack but then you need one of those pesky config files, and who wants that?

```
npm install -g parcel-bundler
npm run build
```

## Sources

- Inspired by [Machine Learning for Artists](https://github.com/ml4a) 
- Uses the *K-Nearest-Neighbour* javascript library [kNearJS](https://github.com/NathanEpstein/KNear)
- [K-nearest-neighbour on Wikipedia](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm)
