let avatarX = 10;
let avatarY = 10;
let avatarWidth = 50;//20
let avatarHeight = 50;
// let speed = 2;


//sprite
let n=0;
let last = 0;//should be private
let av = new Image();
//av.src = "images/dogSample.png";
av.src = "images/dogSample4.png";
// let avH = 128;
// let avW = 455;
// let avDiv = 455/4;

// let avH = 100;
// let avW = 400;
// let avDiv = 100;
let avH = 100;
let avW = av.width;
let avDiv = 100;
//controls

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let pickup = false;
let escPressed = false;
let count=0;
menu = false;
menuOpen = false;
//bg
let background = new Image();
// let bgX = 0;
// let bgY = 0;

//gameobj
// let ob = new Image();
// ob.src = "images/bed.png";


let powerOn =false;
let score = 0;
let rgb = { r: 0, g: 0, b: 0 };

let itemQueue = [];
let energy = 1000;

let tileObj = new Image();
tileObj.src = "images/floortile.png";