class circle{
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = null;
        this.p = null;
        this.speed = 0.01;
        this.a = 0;
    }

    show(ctx){
        let points = [];

        for(let a = 0; a < Math.PI * 2; a += 0.01){
            let p  =  {x: (Math.cos(a) * this.r) + this.x, y: (Math.sin(a) * this.r) + this.y};
            points.push(p);
        }
        
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.map(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[0].x, points[0].y);
        ctx.stroke();
    }

}


let canvas, ctx;
let width = 1200, height = 800;
let circlesList = [];
let radiusOfCircles = 50;
let numberOfCircles = 11;
let shapePoints = [];
let n = 2;

window.onload = ()=> {
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    for(let i = 1; i <= numberOfCircles; i++){
        let c = new circle(0, 0, 0);
        if(i == 1){
            c.x = width/2;
            c.y = height/2;
            c.r = radiusOfCircles;
        } else {
            let pc = circlesList[i-2];
            c.r = pc.r / 3;
            c.x = pc.x + pc.r + c.r;
            c.y = pc.y;
            c.p = pc;
            pc.c = c;
            c.speed = Math.pow(i, i-1) / 580; 
        }
        circlesList.push(c);
    }

    update();
}

function update(){
    ctx.clearRect(0, 0, width, height);
    for(c of circlesList){
            if(c.p != null){
            c.a += c.speed;
            c.x = Math.cos(c.a) * (c.p.r + c.r) + c.p.x;
            c.y = Math.sin(c.a) * (c.p.r + c.r) + c.p.y;
            }
        if(c.c == null){
            shapePoints.push({x: c.x + c.r, y: c.y + c.r});
        }
        c.show(ctx);
    }
    ctx.beginPath();
    ctx.moveTo(shapePoints[0].x, shapePoints[0].y);
    for(p of shapePoints){
        ctx.lineTo(p.x, p.y);
    }
        ctx.stroke();
    requestAnimationFrame(update);
}


