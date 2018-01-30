'use strict';

// these functions use bit shifting to generate one decimal number for a R G B value

export default class Util {
    static rgbToDecimal(red, green, blue) {
        var r = red & 0xFF;
        var g = green & 0xFF;
        var b = blue & 0xFF;
        return (r << 24) + (g << 16) + (b << 8) + (1); // alpha = 1
    }

    static decimalToRgb(decNumber) {
        var red = decNumber >> 24 & 0xFF;
        var green = decNumber >> 16 & 0xFF;
        var blue = decNumber >> 8 & 0xFF;
        var alpha = decNumber & 0xFF;
        console.log("rvs is " + red + "," + green + "," + blue)
    }

    static rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }
}