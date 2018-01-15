const clickedArray = [];

function randomAnswer() {
  const answers = [1,1,2,2,3,3,4,4,5];
  // see definition of sort method: https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  answers.sort(item => .5 - Math.random());
  return answers;
}

function reveal(cell) {
  cell.style.background = "red";
  cell.innerHTML = cell.value;
  cell.clicked = true;
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
      if (this.completed === false && this.clicked === false) {
        // add cell to clicked Array
        clickedArray.push(this);
        // reveal the cell
        reveal(this);
      }
    });
  }
}

setUp();