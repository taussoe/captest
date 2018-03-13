'use strict';
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const imageminGm = require('imagemin-gm');

optimizeImages(1200).then(() => optimizeImages(750).then(() => optimizeImages(200)))

function optimizeImages(width) {
  return new Promise((resolve, reject) => {
    imagemin(['static/img/*.{jpg,png,jpeg}'], `static/img/cms/${width}`, {
      use: [
        imageminGm.resize({ width: width, gravity: 'Center' }),
        imageminGm.convert('jpg')
      ]
    }).then(() => {
      imagemin([`static/img/cms/${width}/*.{jpg,png,jpeg}`], `static/img/cms/${width}`, {
        plugins: [
          imageminJpegtran(),
          imageminPngquant({ quality: '65-80' })
        ]
      }).then(files => {
        //console.log(files);
        //=> [{data: <Buffer 89 50 4e …>, path: 'static/img/foo.jpg'}, …]
        console.log(`Image width ${width} created...`);
      }).then(() => {
        imagemin([`static/img/cms/${width}/*.{jpg,png,jpeg}`], `static/img/cms/${width}`, {
          use: [
            imageminWebp({ quality: 50 })
          ]
        }).then(() => {
          console.log('webp files created...');
        })
      })
        .then(() => {
          return resolve('done')
        });
    })
  })
}