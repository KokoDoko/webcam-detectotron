export default class KNear {
  constructor(k) {
    this.k = k
    this.training = []
  }
  //
  // PUBLIC METHODS : LEARN AND CLASSIFY
  //
  learn(vector, label) {
    let obj = { v: vector, lab: label }
    this.training.push(obj)
  }
  classify(v) {
    let voteBloc = []
    let maxD = 0
    this.training.forEach((obj) => {  // todo for of
      let o = { d: this.dist(v, obj.v), vote: obj.lab }
      if (voteBloc.length < this.k) {
        voteBloc.push(o)
        maxD = this.updateMax(maxD, voteBloc)
      }
      else {
        if (o.d < maxD) {
          let bool = true
          let count = 0
          while (bool) {
            if (Number(voteBloc[count].d) === maxD) {
              voteBloc.splice(count, 1, o)
              maxD = this.updateMax(maxD, voteBloc)
              bool = false
            }
            else {
              if (count < voteBloc.length - 1) {
                count++
              }
              else {
                bool = false
              }
            }
          }
        }
      }

    })
    let votes = []

    for(let el of voteBloc) {
      votes.push(el.vote)
    }

    return this.mode(votes)
  }
  //
  // TODO MAKE PRIVATE - UTILITY METHODS
  //
  dist(v1, v2) {
    let sum = 0
    v1.forEach((val, index) => {
      sum += Math.pow(val - v2[index], 2)
    })
    return Math.sqrt(sum)
  }
  updateMax(val, arr) {
    let max = 0

    for(let obj of arr) {
      max = Math.max(max, obj.d)
    }

    return max
  }
  mode(store) {
    let frequency = {}  // array of frequency.
    let max = 0  // holds the max frequency.
    let result   // holds the max frequency element.
    for (let v in store) {
      frequency[store[v]] = (frequency[store[v]] || 0) + 1 // increment frequency.
      if (frequency[store[v]] > max) { // is this frequency > max so far ?
        max = frequency[store[v]]  // update max.
        result = store[v]          // update result.
      }
    }
    return result
  }
}

/* MODIFIED FROM https://github.com/NathanEpstein/KNear

Copyright(c) 2014 Nathan Epstein

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files(the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and / or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/