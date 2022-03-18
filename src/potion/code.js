// Siguente web
var web = "ganar.html"
var looseWeb = "error.html"

var canvas = document.getElementById("game");
var div = document.getElementById("div");
var ctx = canvas.getContext("2d");
var height = div.getBoundingClientRect().height - 30
var width = div.getBoundingClientRect().width - 30;
var scale = height / 10;
canvas.style.height = height + "px";
canvas.style.width = width + "px";

canvas.setAttribute("height", height);
canvas.setAttribute("width", width);



var game = new Game(width, height);

var game_over = false;
var obstacules = []
const obstacule_spawn_rate = 60 * 3
var lastTime = obstacule_spawn_rate
var lastFrameTime = 0;
var lastX = 0
var colliderIMG = new Image();
colliderIMG.src = "./recursos/obstaculo.png"
var colliderIMG_upsidedown = new Image();
colliderIMG_upsidedown.src = "./recursos/obstaculo_upsidedown.png"
var counterIMG = new Image();
counterIMG.src = "./recursos/counter.png"
var drip = new Image();
drip.src = "./recursos/gota.png"
var game_loop = setInterval(function() {
    if(pause){
        ctx.font = "20px monospace"
        ctx.fillStyle = "white"
        ctx.fillText("Pulsa 'esc' para empezar", width/2.5, height/2)
        ctx.font = "30px monospace"
        ctx.fillStyle = "white"
        ctx.fillText("Save the potion", width/2.5, height/2.5)
        return
    } else {
        game.update();
        ctx.clearRect(0, 0, width, height)
        game.draw(ctx);
        game.player.update(ctx);
        game.player.draw(ctx)
        if(lastTime >= obstacule_spawn_rate){
            var top = Math.random() * 1.7 + 1.5
            var bottom = Math.random() * 1.7 +1.5
            obstacules.push(new obstacule(game.playerPoints + width, 0, top, 2, true))
            obstacules.push(new obstacule(game.playerPoints + width, height - bottom * scale, bottom, 2, false))
            lastTime = 0
        } else {
            lastTime += 1 
        }
        for(var i = 0; i < obstacules.length; i++){
            obstacules[i].update(ctx)
            obstacules[i].draw(ctx)
        }
        if(obstacules.length > 0){
            if(game.player.isColliding(obstacules[0]) || game.player.isColliding(obstacules[1])){
                game.gameOver()
            }
        }
        ctx.drawImage(counterIMG, width - 250, -30, 280, 200)
        ctx.font = "20px  monospace";
        ctx.fillStyle = "white";
        ctx.fillText(("Faltan:" + (10 - game.player.score)), width - 160, 78);

        if(game.player.score == 10){
            game.win()
        }
        lastX += game.velocity


    }
}, 1000/60);

function Game(width, height){
    this.playerPoints = 0
    this.lastDistance = height
    this.firstDistance = 0
    this.background = new Image();
    this.background.src = "https://c.pxhere.com/images/6a/d5/27c5dddbd4abfb9d42a8b718a175-1631152.jpg!d";
    this.width = width;
    this.height = height;
    this.player = new Player(100, height/2);
    this.velocity = 3;
    this.draw = function(ctx) {
        ctx.drawImage(this.background, 0, 0, this.width, this.height);
    }
    this.update = function(){
        this.playerPoints += this.velocity
        this.lastDistance += this.velocity
        this.firstDistance += this.velocity
    }
    this.start = function(){
        var loaded = 0
        this.background.onload = function() {
            loaded++
            if(loaded == 4){
                game_loop
            }
        }
        this.player.playerTexture.onload = function() {
            loaded++
            if(loaded == 4){
                game_loop
            }
        }
        colliderIMG.onload = function() {
            loaded++
            if(loaded == 4){
                game_loop
            }
        }
        drip.onload = function() {
            loaded++
            if(loaded == 4){
                game_loop
            }
        }
        onclick = function(){
            game.player.jump()
        }
        
    }
    this.gameOver = function(){
        game_over = true
        clearInterval(game_loop)
        if(window.location.href.endsWith("index.html")){
            window.location.href = window.location.href.replace("index.html", looseWeb)
        } else if(window.location.href.endsWith("/")){
            window.location.href += looseWeb
        } else {
            window.location.href += "/" + looseWeb
        }

    }
    this.win = function(){
        clearInterval(game_loop)

        if(window.location.href.endsWith("index.html")){
            window.location.href = window.location.href.replace("index.html", web)
        } else if(window.location.href.endsWith("/")){
            window.location.href += web
        } else {
            window.location.href += "/" + web
        }

    }
}

function Player(x, y) {
    this.playerTexture = new Image();
    this.playerTexture.src = "./recursos/player.png";
    this.offset = [50, 50];
    this.x = x;
    this.y = y;
    const ace = 6;
    var velocity = -10;
    var gravity = 0.3;
    this.score = 0;
    this.width = 2.3 / 1.5 * scale
    this.height = 3.3 / 1.5 * scale

    this.draw = function(ctx) {
        ctx.drawImage(this.playerTexture, this.x - this.offset[0], this.y - this.offset[1], this.width, this.height);
    }
    this.jump = function() {
        if(!game_over){
            velocity = -ace;
        }
    }
    this.update = function() {
        velocity += gravity;
        this.y += velocity * scale / 40
        if(this.y + this.height >= height && game.lastDistance > 10) {
            game.player.y = height - this.height
            velocity = 0;
            console.log("fall")
            game.gameOver()
        }
        if(this.y <= 0){
            this.y = 1
            velocity = -(velocity / 2)
        }
    }
    this.isColliding = function(_obstacule) {
		let offset = 0.2;
        if(this.x + this.width > _obstacule.boundingBox.x && _obstacule.boundingBox.x + _obstacule.width > this.width){
            if(this.y + this.width * offset < _obstacule.boundingBox.y + _obstacule.height &&
				this.height + this.y - this.width * offset > _obstacule.y){
                return true
            }
        } else {
            return false
        }

    }
}

class obstacule{  
    constructor(x, y, height, width, top){
        this.top = top
        this.x = x;
        this.y = y;
        this.height = height * scale
        this.width = width * scale
        this.drip = drip
        if(this.top){
            this.colliderIMG = colliderIMG_upsidedown
        } else {
            this.colliderIMG = colliderIMG
        }
        this.drip.lastDistance = 0

        this.boundingBox = {
            x: x,
            y: y
        }
        this.draw = function(ctx) {
            if(this.top){
                ctx.clearRect(x - game.playerPoints + 80, 0,40, height)
                ctx.drawImage(this.drip, x - game.playerPoints + 70, this.drip.lastDistance, 60, 60)
            } 
            ctx.drawImage(this.colliderIMG, x - game.playerPoints, y, this.width, this.height)

        }
        this.update = function(ctx){
            if(this.x + this.width >= game.playerPoints){
                this.boundingBox.x = this.x - lastX
                this.drip.lastDistance += 3
                this.draw(ctx)
            } else {
                obstacules.shift()
                console.log(game.player.score)
                if(this.top){
                    game.player.score += 1
                }
            }
        }
    }
}

var pause = true
onkeydown = function(e){
    console.log(e.keyCode)
    switch(e.keyCode){
        case 32:
            game.player.jump()
            break;
        case 38:
            game.player.jump()
            break;
        case 27:
            if(pause){
                pause = false
            } else {
                pause = true
            }
            break;
        default:
            break;
    }
}

game.start()