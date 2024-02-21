
/* Global Declarations */
var canvas; 
var context; 
//var button = document.getElementById('button');

var angle1 = 0;
var angle2 = 0;

var fps, fpsInterval, startTime, now, then, elapsed;

var color1, color2, color3, color4

var t1 = 0;
var t2 = 0;
var t3 = 0;
var t4 = 0;


function draw(color1, color2, color3, color4, angle1, angle2) {
    canvas.width = canvas.width;
    
    
    /* function variables*/
    //home matrix (0, 0)
    var home;

    //transform vectors
    var res1;
    var res2;

    //shapes
    var s1;
    var s2;
    var s3;
    var s4;

    //shape links
    var link1;
    var link2; 
    var link3;
    var link4;

    //utilizing demo functions to set moving/line to actions
    //use res1 for matMove
    function matMove(x, y, shape) {
        res1 = vec2.create();
        
        vec2.transformMat3(res1, [x,y], shape);

        context.moveTo(res1[0], res1[1]);
        
    }

    //use res2 for matLine (mirror of matMove)
    function matLine(x, y, shape) {
        res2 = vec2.create();
        
        vec2.transformMat3(res2, [x,y], shape);

        context.lineTo(res2[0], res2[1]);
        
    }

    //triangle shape
    function tri(color, shape){
        context.beginPath();
        context.fillStyle = color;
        matMove(0, 0, shape);
        matLine(75, 0, shape);
        matLine(0, -75, shape);
        matLine(0, 0, shape);
        context.closePath();

        context.fill();
        
        
    }

    //square shape
    function sq(color, shape) {
        context.beginPath();
        context.fillStyle = color;
        matMove(0, 0, shape);
        matLine(0, 50, shape);
        matLine(50, 50, shape);
        matLine(50, 0, shape);
        matLine(0, 0, shape);
        context.closePath();

        context.fill();
        
    }


    /* Save the canvas origin for use */
    home = mat3.create();
    mat3.fromTranslation(home, [0, 0]);
    
    
    link1 = mat3.create();
    mat3.fromTranslation(link1, [((Math.random(2) * .75) + 350), ((Math.random(2) * .75) + 300)]);
    
    /* Each element first goes back to origin, then translates to shape origin*/
    s1 = mat3.create();
    mat3.multiply(s1, home, link1);
    mat3.rotate(s1, s1, angle1);
    tri(color1, s1);

    
    link2 = mat3.create();
    mat3.fromTranslation(link2, [((Math.random(2) * .75) + 150), ((Math.random(2) * .75) + 270)]);

    s2 = mat3.create();
    mat3.multiply(s2, home, link2);
    mat3.rotate(s2, s2, angle2)
    sq(color2, s2);

    link3 = mat3.create();
    mat3.fromTranslation(link3, [((Math.random(2) * .75) + 150), ((Math.random(2) * .75) + 120)]);

    s3 = mat3.create();
    mat3.multiply(s3, home, link3);
    mat3.rotate(s3, s3, angle2);
    tri(color3, s3);

    link4 = mat3.create();
    mat3.fromTranslation(link4, [((Math.random(2) * .75) + 350), ((Math.random(2) * .75) + 100)]);

    s4 = mat3.create();
    mat3.multiply(s4, home, link4);
    mat3.rotate(s4, s4, angle1);
    sq(color4, s4);


}

function generateRandColor() {
    return Math.floor(Math.random()* 16777215).toString(16);
}

function startAnim(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;

    
    animate();
}

/* NOTE -> Attempted to try a generate new color upon refresh but couldn't get it right. Something to do with animate
button.onclick = updateColor();
function updateColor(){
    color1 = ("#" + generateRandColor());
    color2 = ("#" + generateRandColor());
    color3 = ("#" + generateRandColor());
    color4 = ("#" + generateRandColor());
    console.log("clicked");
}*/

function animate() {
    requestAnimationFrame(animate);

    
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        angle1 += 1 * Math.PI / 180;
        angle2 += -1 * Math.PI / 180;

        draw(color1, color2, color3, color4, angle1, angle2);
        
    }

    
}

function main() {
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    
    startAnim(5);

    //colors go here
    color1 = ("#" + generateRandColor());
    color2 = ("#" + generateRandColor());
    color3 = ("#" + generateRandColor());
    color4 = ("#" + generateRandColor());

    startAnim(24);
    
}  

main();

window.onload = main;