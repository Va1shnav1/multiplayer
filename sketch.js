var ball;
var db;
var Sman
function preload(){
    Sman = loadImage("sman.png");
}
function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball.addImage(Sman);
    ball.scale=0.25
    db = firebase.database();
    var dbref = db.ref('BallPosition');
    dbref.on("value", read);
}

function draw(){
    background("gray");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    db.ref('BallPosition').set({
        x:ball.x + x,
        y:ball.y + y
    });
    

    //ball.x = ball.x + x;
    //ball.y = ball.y + y;
}
function read(data){
    ball.x = data.val().x;
    ball.y = data.val().y;
}
