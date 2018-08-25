const fs = require("fs");
const path = require("path");

const PNGImage = require('pngjs-image');

const config = require('./config.json');

const black = {red: 0, green: 0, blue: 0, alpha: 255};

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

fs.mkdirSync(config.output);

let image = null;

let filename = "";

let count = 0;

config.images.forEach((element) => {
    count++;

    //filled
    image = PNGImage.createImage(config.size.width, config.size.height);

    image.fillRect(imgSize.outer.x, imgSize.outer.y, imgSize.outer.width, imgSize.outer.height, element.color);

    filename = path.join(__dirname, config.output, count + "_" + element.name + '_filled.png')

    image.writeImage(filename, function (err) {
        if (err) throw err;
        console.log('Written to %s', filename);
    });

    //unfilled
    image = PNGImage.createImage(config.size.width, config.size.height);

    image.fillRect(imgSize.outer.x, imgSize.outer.y, imgSize.outer.width, imgSize.outer.height, element.color);
    image.fillRect(imgSize.inner.x, imgSize.inner.y, imgSize.inner.width, imgSize.inner.height, black);

    filename = path.join(__dirname, config.output, count + "_" + element.name + '_unfilled.png')

    image.writeImage(filename, function (err) {
        if (err) throw err;
        console.log('Written to %s', filename);
    });
});