// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({21:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class KNear {
  constructor(k) {
    this.k = k;
    this.training = [];
  }
  //
  // PUBLIC METHODS : LEARN AND CLASSIFY
  //
  learn(vector, label) {
    let obj = { v: vector, lab: label };
    this.training.push(obj);
  }
  classify(v) {
    let voteBloc = [];
    let maxD = 0;
    this.training.forEach(obj => {
      // todo for of
      let o = { d: this.dist(v, obj.v), vote: obj.lab };
      if (voteBloc.length < this.k) {
        voteBloc.push(o);
        maxD = this.updateMax(maxD, voteBloc);
      } else {
        if (o.d < maxD) {
          let bool = true;
          let count = 0;
          while (bool) {
            if (Number(voteBloc[count].d) === maxD) {
              voteBloc.splice(count, 1, o);
              maxD = this.updateMax(maxD, voteBloc);
              bool = false;
            } else {
              if (count < voteBloc.length - 1) {
                count++;
              } else {
                bool = false;
              }
            }
          }
        }
      }
    });
    let votes = [];

    for (let el of voteBloc) {
      votes.push(el.vote);
    }

    //voteBloc.forEach((el) => {
    //  votes.push(el.vote)
    //})
    return this.mode(votes);
  }
  //
  // TODO PRIVATE UTILITY METHODS
  //
  dist(v1, v2) {
    let sum = 0;
    v1.forEach((val, index) => {
      sum += Math.pow(val - v2[index], 2);
    });
    return Math.sqrt(sum);
  }
  updateMax(val, arr) {
    let max = 0;

    for (let obj of arr) {
      max = Math.max(max, obj.d);
    }

    //arr.forEach((obj) => {
    //  max = Math.max(max, obj.d)
    //})
    return max;
  }
  mode(store) {
    let frequency = {}; // array of frequency.
    let max = 0; // holds the max frequency.
    let result; // holds the max frequency element.
    for (let v in store) {
      frequency[store[v]] = (frequency[store[v]] || 0) + 1; // increment frequency.
      if (frequency[store[v]] > max) {
        // is this frequency > max so far ?
        max = frequency[store[v]]; // update max.
        result = store[v]; // update result.
      }
    }
    return result;
  }
}

exports.default = KNear; /* MODIFIED FROM https://github.com/NathanEpstein/KNear
                         
                         Copyright(c) 2014 Nathan Epstein
                         
                         Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files(the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and / or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
                         The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                         THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                         */
},{}],22:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Util {
    static rgbToDecimal(red, green, blue) {
        var r = red & 0xFF;
        var g = green & 0xFF;
        var b = blue & 0xFF;
        return (r << 24) + (g << 16) + (b << 8) + 1; // alpha = 1
    }

    static decimalToRgb(decNumber) {
        var red = decNumber >> 24 & 0xFF;
        var green = decNumber >> 16 & 0xFF;
        var blue = decNumber >> 8 & 0xFF;
        var alpha = decNumber & 0xFF;
        console.log("rvs is " + red + "," + green + "," + blue);
    }

    static rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
        return (r << 16 | g << 8 | b).toString(16);
    }
}
exports.default = Util;
},{}],11:[function(require,module,exports) {
module.exports="e0f147ae0740e9ee581f746610393b18.png";
},{}],12:[function(require,module,exports) {
module.exports="944602bcc8f15f1faaad3db9eb0277d2.png";
},{}],13:[function(require,module,exports) {
module.exports="c2367dbc18aacb29f27206b34884b419.png";
},{}],14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _knear = require('./knear');

var _knear2 = _interopRequireDefault(_knear);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _image = require('../images/image0.png');

var _image2 = _interopRequireDefault(_image);

var _image3 = require('../images/image1.png');

var _image4 = _interopRequireDefault(_image3);

var _image5 = require('../images/image2.png');

var _image6 = _interopRequireDefault(_image5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App {
    constructor() {
        this.machine = new _knear2.default(3);

        this.images = [_image2.default, _image4.default, _image6.default];

        this.labelcam = false;

        this.learned = document.getElementById("learned");
        this.video = document.querySelector('video');
        this.canvas = document.querySelector('#mosaic');
        this.context = this.canvas.getContext('2d');
        this.numpixels = 10;

        this.width; // 340 
        this.height; // 255
        this.intervalid;
        this.webcamData;

        // start the stream
        this.initVideoStream();
    }

    initSettings() {

        this.width = this.video.offsetWidth;
        this.height = this.video.offsetHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;

        // buttons
        this.initButtons();

        // redraw the video input 60 times/second as a mosaic
        this.drawMosaic();

        // create tensor data every second
        this.intervalid = setInterval(() => this.displayPixelData(), 1000);
    }

    initButtons() {
        let btns = document.getElementsByClassName("record");
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", e => this.recordData(e, i));
        }
        document.getElementById("train").addEventListener("click", e => {
            this.labelcam = true;
        });
    }

    recordData(e, i) {
        //console.log("adding vector to " + i + "   entries:" + this.webcamData.length)
        this.machine.learn(this.webcamData, i); // use i as a label ?

        // add a nice little thumbnail to see what we trained
        let img = document.createElement('img');
        img.src = this.canvas.toDataURL();
        document.getElementsByClassName("data")[i].appendChild(img);
    }

    labelWebcam() {
        let label = this.machine.classify(this.webcamData);
        //console.log("current webcam is seen as " + label)
        this.learned.src = this.images[label]; // label i 
    }

    drawMosaic() {
        // drawing the video very small causes pixelation. then blow up the canvas image itself
        this.context.drawImage(this.video, 0, 0, this.numpixels, this.numpixels);
        this.context.drawImage(this.canvas, 0, 0, this.numpixels, this.numpixels, 0, 0, this.width, this.height);

        // als label aan staat dan meteen checken welke class dit is
        if (this.labelcam) this.labelWebcam();

        // draw 60 times / second
        // requestAnimationFrame(()=>this.drawMosaic())

        // or draw only 10 times/second
        setTimeout(() => this.drawMosaic(), 100);
    }

    //
    // get a tensor with 100 dimensions, do this every second
    //
    displayPixelData() {

        this.webcamData = [];

        for (let pos = 0; pos < this.numpixels * this.numpixels; pos++) {
            let col = pos % this.numpixels;
            let row = Math.floor(pos / this.numpixels);

            let x = col * (this.width / this.numpixels);
            let y = row * (this.height / this.numpixels);

            // sample locatie niet linksboven rect maar in het midden
            let p = this.context.getImageData(x + this.width / 20, y + this.height / 20, 1, 1).data;

            // rgb waarde bij voorkeur als 1 decimal doorgeven, anders krijgt kNear drie losse waarden binnen of hexwaarde
            // console.log("rgb is " + p[0] + "," + p[1] + "," + p[2]);
            let decimalColor = _util2.default.rgbToDecimal(p[0], p[1], p[2]);
            this.webcamData.push(decimalColor);
        }
    }

    initVideoStream() {
        // docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ video: true })
            // permission granted:
            .then(stream => {
                this.video.srcObject = stream;
                this.video.addEventListener("playing", () => this.initSettings());
                //video.addEventListener('click', takeSnapshot)
            })
            // permission denied:
            .catch(error => {
                document.body.textContent = 'Could not access the camera. Error: ' + error.name;
            });
        }
    }
}

exports.default = App; // init the app

new App();
},{"./knear":21,"./util":22,"../images/image0.png":11,"../images/image1.png":12,"../images/image2.png":13}],24:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var ws = new WebSocket('ws://' + hostname + ':' + '62555' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[24,14])
//# sourceMappingURL=ccb2f1e405b896a9b5181e2e98f65722.map