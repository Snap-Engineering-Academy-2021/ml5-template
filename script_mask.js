/*
 * @name Alpha Mask
 * @description Loads a "mask" for an image to specify the transparency in
 * different parts of the image. The two images are blended together using
 * the mask() method of p5.Image.
 * <p><em><span class="small"> To run this example locally, you will need two
 * image files, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">
 * local server</a>.</span></em></p>
 */
let img;
let imgMask;

function preload() {
  img = loadImage('assets/mark1.png');
  imgMask = loadImage('assets/eye.png');
}

function setup() {
    createCanvas(640, 480);
    img.mask(imgMask);
    imageMode(CENTER);    
    video = createCapture(VIDEO);
    video.size(width, height);


    facemesh = ml5.facemesh(video, () => {
        console.log("Model is ready!");
    });

    facemesh.on("predict", (results) => {
        console.log(results[0]);
        latestPrediction = results[0];
    });
  
    video.hide();
}


function draw() {
    image(video, 0, 0, width, height);


}
