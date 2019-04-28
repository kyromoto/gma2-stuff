const fs = require("fs");
const path = require("path");

const PNGImage = require('pngjs-image');

const config = require('./config.json');

const black = {"red": 0, "green": 0, "blue": 0, "alpha": 255};

const imgSize = {
    outer : {
        x : 0,
        y : 0,
        height : config.size.height,
        width : config.size.width
    },
    inner : {
        x : 0 + config.border,
        y : 0 + config.border,
        height : config.size.height - (2*config.border),
        width : config.size.width - (2*config.border)
    }
}

const calcColorParams = function(x, y, height, width, colors, colorIndex) {
    let colorsCount = colors.length;
    let curX = x;
    let curY = y + ((height / colorsCount)*colorIndex);
    let curHeight = height / colorsCount;
    let curWidth = width;
    let curColor = colors[colorIndex];

    return {
        curX,
        curY,
        curHeight,
        curWidth,
        curColor
    }
}

fs.mkdirSync(config.output);

let image = null;

let filename = "";

let count = 0;

config.images.forEach((element) => {
    count++;

    //filled
    image = PNGImage.createImage(config.size.width, config.size.height);

    const colorCount = element.colors.length;
    let cc = 0;

    element.colors.forEach((color) => {
        let fillParams = calcColorParams(
            imgSize.outer.x,
            imgSize.outer.y,
            imgSize.outer.height,
            imgSize.outer.width,
            element.colors,
            cc
        );
        image.fillRect(
            fillParams.curX,
            fillParams.curY,
            fillParams.curWidth,
            fillParams.curHeight,
            fillParams.curColor
        );

        cc++;
    })

    //image.fillRect(imgSize.outer.x, imgSize.outer.y, imgSize.outer.width, imgSize.outer.height, element.color);

    filename = path.join(__dirname, config.output, count + "_" + element.name + '_filled.png');

    image.writeImage(filename, function (err) {
        if (err) throw err;
        console.log('Written to %s', filename);
    });

    //unfilled
    image = PNGImage.createImage(config.size.width, config.size.height);

    cc = 0;
    
    element.colors.forEach((color) => {
        let fillParams = calcColorParams(
            imgSize.outer.x,
            imgSize.outer.y,
            imgSize.outer.height,
            imgSize.outer.width,
            element.colors,
            cc
        );
        image.fillRect(
            fillParams.curX,
            fillParams.curY,
            fillParams.curWidth,
            fillParams.curHeight,
            fillParams.curColor
        );

        cc++;
    })

    image.fillRect(imgSize.inner.x, imgSize.inner.y, imgSize.inner.width, imgSize.inner.height, black);

    console.log(imgSize.inner.height)



    filename = path.join(__dirname, config.output, count + "_" + element.name + '_unfilled.png')

    image.writeImage(filename, function (err) {
        if (err) throw err;
        console.log('Written to %s', filename);
    });
});