let data;

let months;

let zeroRadius = 125;
let oneRadius = 200;

let currentRow = 1;
let currentMonth = 0;

let previousAnomaly = 0;

function preload() {
  data = loadTable("giss-data-apr-11-2023.csv", "csv", "header");
}

function setup() {
  createCanvas(600, 600);
  // console.log(data.getRowCount());
  // console.log(data.getColumnCount());

  //months = data.columns.slice(1, 13);
  months = [
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
  ];

  let row = data.getRow(0);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  textAlign(CENTER, CENTER);
  textSize(16);
  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, zeroRadius * 2);
  fill(255);
  noStroke();
  text("0°", zeroRadius + 10, 0);

  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, oneRadius * 2);
  fill(255);
  noStroke();
  text("1°", oneRadius + 10, 0);

  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, 500);

  for (let i = 0; i < months.length; i++) {
    noStroke();
    fill(255);
    textSize(24);
    let angle = map(i, 0, months.length, 0, TWO_PI);
    push();
    let x = 264 * cos(angle);
    let y = 264 * sin(angle);
    translate(x, y);
    rotate(angle + PI / 2);
    text(months[i], 0, 0);
    pop();
  }

  let year = data.getRow(currentRow).get("Year");
  textSize(32);
  text(year, 0, 0);

  noFill();
  
// ...
noFill();
stroke(255);

let firstValue = true;
let previousAnomaly = 0; // Make sure previousAnomaly is reset here if needed

for (let j = 0; j < currentRow; j++) {
  let row = data.getRow(j);

  // Decide how many months to draw in the current row
  let totalMonths = months.length;
  if (j === currentRow - 1) {
    totalMonths = currentMonth;
  }

  for (let i = 0; i < totalMonths; i++) {
    let anomaly = row.get(months[i]);

    // Skip invalid data
    if (anomaly === "***") {
      continue;
    }

    anomaly = parseFloat(anomaly);

    // Convert the month index to an angle around the circle
    let angle = map(i, 0, months.length, 0, TWO_PI) - PI / 3;

    // Convert the anomaly into a radius between zeroRadius and oneRadius
    let r = map(anomaly, 0, 1, zeroRadius, oneRadius);
    let x = r * cos(angle);
    let y = r * sin(angle);

    // Calculate an "average" so your colors transition smoothly.
    // For the very first value, we can just use anomaly itself.
    let avg = anomaly;
    if (!firstValue) {
      avg = (anomaly + previousAnomaly) * 0.5;
    }

    // Determine color based on whether avg is above or below zero
    let cold = color(0, 0, 255);
    let warm = color(255, 0, 0);
    let zeroC = color(255); // Neutral white
    let dotColor = zeroC;

    if (avg < 0) {
      dotColor = lerpColor(zeroC, cold, abs(avg));
    } else {
      dotColor = lerpColor(zeroC, warm, abs(avg));
    }

    // Draw the dot
    noStroke();
    fill(dotColor);
    ellipse(x, y, 5, 5);

    // Update previous anomaly tracking
    previousAnomaly = anomaly;
    firstValue = false;
  }
}
// ...

  currentMonth = currentMonth + 1;
  if (currentMonth == months.length) {
    currentMonth = 0;
    currentRow = currentRow + 1;
    if (currentRow == data.getRowCount()) {
      noLoop();
    }
  }
}
