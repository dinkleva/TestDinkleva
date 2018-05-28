var canvas = document.querySelector('canvas');



//to draw we need 2d context

var c = canvas.getContext('2d');

//rectangle
/* c.fillStyle = 'rgba(100,32,23,0.7)';
c.fillRect(200,200,50,50);
 */

//Line
/* c.beginPath();
c.moveTo(20,50);
c.lineTo(500,200);
c.lineTo(500,100);
c.strokeStyle= 'red';
c.stroke(); */

//arc/circle
/* 
for(var i=0;i<100;i++){
var x = Math.random()*window.innerWidth;
var y = Math.random()*window.innerHeight;
var r = Math.floor(Math.random()*255);
var g = Math.floor(Math.random()*255);
var b = Math.floor(Math.random()*255);

c.beginPath();
c.strokeStyle = 'rgba('+r+','+g+','+b+',1)';
c.arc(x,y,50,0,Math.PI*2,false);
c.stroke();
} */


/* var x = Math.random()*window.innerWidth;
var y = Math.random()*window.innerHeight; */



var colorArray = [
    '#2231F3',
    '#0BE514',
    '#F3315B',
    '#F1D335',
    '#B5E52B',
];

//event listener

var mouse = {
    x:undefined,
    y:undefined
}

var maxRadius = 40;
var minRadius = 2;

window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    
})


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

function Circle(x,y,radius,dx,dy){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fill();
        c.fillStyle = this.color;
        c.stroke();
    }

    this.update = function(){

        if(this.x+this.radius>innerWidth || this.x < this.radius){
            this.dx = -this.dx;
        }
    
        if(this.y+this.radius>innerHeight || this.y < this.radius){
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x - this.x <50 && mouse.x - this.x > -50
            && mouse.y - this.y <50 && mouse.y -this.y > -50
        ){
            if(this.radius < maxRadius){
                this.radius += 1;
            }
        }else if(this.radius > minRadius){
            this.radius -= 1;
        }

        this.draw();
    }
}




var circleArray = [];

function init(){
    circleArray = [];
    for(var i=0;i<1000;i++){
        var x=Math.random()*innerWidth;
        var y = Math.random()*innerHeight;
        var dx = (Math.random() - 0.5)*2;
        var dy = (Math.random() - 0.5)*2;
        var radius = 30;/* (Math.random()+1)*5; */
        circleArray.push(new Circle(x,y,radius,dx,dy));
    }
}




function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    
    for(var i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }
    
    
}

animate();

