var mouseX_c,mouseY_c,grid,sandCount
var ww = 600
var wh = 900
var grainSize = 5





function createGrid(g){
  let xgrid = new Array()
  for(let x = -g; x<ww-g; x = x + g){
    let ygrid = new Array()
    for(let y = -g; y<wh-g; y = y + g){
      ygrid.push(0)
    }
    xgrid.push(ygrid)
  }
  return xgrid
}
function calculateNextFrame(){
  let oldgrid = grid 
  newgrid = createGrid(grainSize)
  for(var x = 0; x<oldgrid.length ; x++){
    for(var y = oldgrid[x].length-1; y>=0;y--){
      if(oldgrid[x][y] == 1){
        if(oldgrid[x][y+1] == 0 && y != oldgrid[0][0].length-1 && newgrid[x][y+1] == 0){
          newgrid[x][y+1] = 1
        }else{
          if(x != 0 && x != oldgrid.length -1 && oldgrid[x-1][y+1] == 0 && oldgrid[x+1][y+1] == 0 && newgrid[x-1][y+1] ==0 && newgrid[x+1][y+1] == 0){
            if(Math.random()<0.5){newgrid[x-1][y+1] = 1}else{newgrid[x+1][y+1] = 1}
          }else if(x != 0 && oldgrid[x-1][y+1] == 0 &&newgrid[x-1][y+1] == 0){newgrid[x-1][y+1] = 1}
          else if(x != oldgrid.length -1 &&oldgrid[x+1][y+1] == 0 && newgrid[x+1][y+1] == 0){newgrid[x+1][y+1] = 1}
          else{newgrid[x][y] = 1}
        }

      }
    }}
  grid = newgrid
}
function drawGrid(grd){
  sandCount = 0
  for(var key in grd){
    x = key
    for(var key in grd[x]){
      y=key
      if(grd[x][y] == 1){rect(x*grainSize,y*grainSize,grainSize*4/5);sandCount++}
    }
  }
}
function recalculateMouseCoordinates(){
  cssscale = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('--zoomscale'));
  document.documentElement.style.setProperty('--zoomscale', zoomslider.value());
  mouseX_c = mouseX / cssscale
  mouseY_c = mouseY / cssscale
}
function brush(x,y,s){
  x_c = Math.floor(x/grainSize)
  y_c = Math.floor(y/grainSize)
  val = s
  for(let i = 0; i < val; i++){ 
    for(let j = 0; j < val; j++){
      if(Math.random() < (0.25*(4/val))){
      grid[x_c + i - val/2 - 0.5][y_c + j - val/2 - 0.5] = 1
    }
  }}
  // grid[x_c][y_c] = 1
}
function drawUtilInfo(){
  push()
  fill(0)
  text(Math.floor(frameRate()),ww/2,10)
  text(sandCount,ww/2,50)
  pop()
}
function reset(){
  grid = createGrid(grainSize)
}



function setup() {
  createCanvas(ww, wh);
  cssscale = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('--zoomscale'));
  zoomslider = createSlider(0.01,1,cssscale,0.01)
  brushsize = createSlider(1,20,1,2)
  button = createButton('reset');
  button.mousePressed(reset);
  fill(0)
  strokeWeight(0)
  grid = createGrid(grainSize)


}


function draw() {
  background(220);
  if(mouseIsPressed && mouseX_c < ww && mouseX_c > 0 && mouseY_c < wh && mouseY_c > 0){
    brush(mouseX_c,mouseY_c,brushsize.value())
  }
  recalculateMouseCoordinates()
  calculateNextFrame()
  drawGrid(grid)
  drawUtilInfo()

}
