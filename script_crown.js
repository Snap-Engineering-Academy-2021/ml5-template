let video;
let latestPrediction = null;
let modelIsLoading = true;
let crownImage;
const LEFT_FOREHEAD = 104;
const RIGHT_FOREHEAD = 333;
const FOREHEAD_POINT = 151;
// p5 function
function preload() {
  crownImage = loadImage("assets/crown.png");
}
// p5 function
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  // ml5 function
  let facemesh = ml5.facemesh(video, () => {
    console.log("Model is ready!");
    modelIsLoading = false;
  });
  // ml5 function
  facemesh.on("predict", (results) => {
    // results is an Array
    // we care about the first object only
    // results[0]
    // console.log(results[0]);
    latestPrediction = results[0];
  });
  video.hide();
}
// p5 function
function draw() {
  // if (modelIsLoading)
  // show a loading screen
  // draw webcam video
  image(video, 0, 0, width, height);
  //-----------------------------------
  if (latestPrediction == null) return; // don't draw anything else
  // get forhead location
  let foreheadLocation = latestPrediction.scaledMesh[FOREHEAD_POINT];
  let rightForeheadLocation = latestPrediction.scaledMesh[LEFT_FOREHEAD];
  let leftForeheadLocation = latestPrediction.scaledMesh[RIGHT_FOREHEAD];

  imageMode(CORNERS);
  let w = leftForeheadLocation[0] - rightForeheadLocation[0];
  image(
    crownImage,
    leftForeheadLocation[0],
    leftForeheadLocation[1] - w,
    rightForeheadLocation[0],
    rightForeheadLocation[1]
  );

  line(leftForeheadLocation[0], leftForeheadLocation[1], rightForeheadLocation[0], rightForeheadLocation[1])
  
}