const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');



function getanyRandom(a,b){
    
   return (a+Math.random()*b);
}

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

var colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'pink',
    'white'
];

function Circle(x,y,radius,dx,dy,color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  this.draw = function(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.strokeStyle = color;
    c.stroke();
    c.closePath();
  }

  this.update = function(){
      if(this.x+this.radius > innerWidth|| this.x+this.radius<0){
          this.dx = -this.dx;
      }
      if(this.y+this.radius > innerHeight|| this.y+this.radius<0){
        this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

var circleArray = [];

function init(){
    circleArray = [];
    for(var i=0;i<600;i++){
    
        var x = getanyRandom(0,innerWidth);
        var y = getanyRandom(0,innerHeight);
       var radius = getanyRandom(1,30);
       var dx = (Math.random() - 0.5)*2;
       var dy = (getanyRandom(1,3) - 0.5)*2;
       var color = colors[Math.floor(getanyRandom(0,5))];
       circleArray.push(new Circle(x,y,radius,dx,dy,color));
     }
   
}



function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  for(var i=0;i<circleArray.length;i++){
      
    circleArray[i].update();
    
  }
  
}
init();
animate();