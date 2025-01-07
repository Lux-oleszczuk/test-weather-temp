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
  

  currentMonth = currentMonth + 1;
  if (currentMonth == months.length) {
    currentMonth = 0;
    currentRow = currentRow + 1;
    if (currentRow == data.getRowCount()) {
      noLoop();
    }
  }
}
