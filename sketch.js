let facemesh;
let video;
let predictions = [];
const pointsToConnect1 = [
  409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291
];
const pointsToConnect2 = [
  76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184
];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", (results) => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 第一組陣列：紅色線條
    stroke(255, 0, 0); // 紅色
    strokeWeight(15); // 線條粗細
    noFill();
    beginShape();
    for (let i = 0; i < pointsToConnect1.length; i++) {
      const index = pointsToConnect1[i];
      const [x, y] = keypoints[index];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 第二組陣列：綠色線條，內部填充藍色
    stroke(0, 255, 0); // 綠色
    strokeWeight(15); // 線條粗細
    fill(0, 0, 255, 100); // 半透明藍色填充
    beginShape();
    for (let i = 0; i < pointsToConnect2.length; i++) {
      const index = pointsToConnect2[i];
      const [x, y] = keypoints[index];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
