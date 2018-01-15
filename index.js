let clickedArray = [];
let interval;
let started = false;
let time = 0;
let ready = true;
let numCompleted = 0;

const keyMap = {
  1: 7,
  2: 8,
  3: 9,
  4: 4,
  5: 5,
  6: 6,
  7: 1,
  8: 2,
  9: 3,
};

function randomAnswer() {
  const answers = [1,1,2,2,3,3,4,4,5];
  // see definition of sort method: https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  answers.sort(item => .5 - Math.random());
  return answers;
}

function hide(cell) {
  cell.style.background = "blue";
  cell.innerHTML = "";
  cell.clicked = false;
}

function complete(cell) {
  cell.style.background = "purple";
  cell.completed = true;
  numCompleted+=1;
}

function reveal(cell) {
  cell.style.background = "red";
  cell.innerHTML = cell.value;
  cell.clicked = true;
}

function startTimer() {
  if (started === false) {
    // every second, update the timer
    interval = setInterval(() => {
      time++;
      document.getElementById("timer").innerHTML = `Time elapsed: ${time}`;
    }, 1000);
    started = true;
  }
}

function setUp() {
  const grid = document.getElementsByTagName("td");
  const answers = randomAnswer();
  
  for (let i = 0; i < grid.length; ++i) {
    const cell = grid[i];
    cell.completed = false;
    cell.clicked = false;
    cell.value = answers[i];
    
    cell.addEventListener("mouseenter", function() {
      if (this.completed === false && this.clicked === false) {
        // change background to highlight "selection"
        this.style.background = "orange";
      }
    });
    
    cell.addEventListener("mouseleave", function() {
      if (this.completed === false && this.clicked === false) {
        // reset background
        this.style.background = "blue";
      }
    });
    
    cell.addEventListener("click", function() {
      if (ready === false) {
        return;
      } 
      startTimer();
      if (this.completed === false && this.clicked === false) {
        // add cell to clicked Array
        clickedArray.push(this);
        // reveal the cell
        reveal(this);
      }
      
      // try to match numbers
      if (clickedArray.length === 2) {
        if (clickedArray[0].value === clickedArray[1].value) {
          complete(clickedArray[0]);
          complete(clickedArray[1]);
          
          clickedArray = [];
          if (numCompleted === 8) {
            alert(`WON in ${time} seconds!`);
            clearInterval(interval);
          }
        } else {
          // block click events
          ready = false;
          
          // turn grid border to red
          document.getElementById("gridTable").style.border = "5px solid red";
          
          
          // let's factor in some delay (half a second)
          setTimeout(() => {
            hide(clickedArray[0]);
            hide(clickedArray[1]);
            
            clickedArray = [];
            
            // enable click events again
            ready = true;
            
            // restore grid border
            document.getElementById("gridTable").style.border = "5px solid black";
          }, 500);
        }
      }
    });
  }
  
  // add support for numpads
  document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (key > 0 && key < 10) {
      // using the keyMap in order to provide the correct index
      grid[keyMap[key] - 1].click();
    }
  });
  
  
  // add restart event handler
  document.getElementById("restart").addEventListener("click", function() {
    location.reload();
  });
}

setUp();