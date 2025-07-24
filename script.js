const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const grid_size = 25;
const tail_count = 20;
canvas.width = grid_size*tail_count;
canvas.height = grid_size*tail_count;
let snake = [{x: 10,y: 10}];
let direction = {x: 0, y: 0};
let food = generate_food();
let score = 0;
let record = localStorage.getItem("snake_score") || 0;
let speed = 200;
let running = false;
let gameover = false;
const score_display = document.getElementById("score");
const record_display = document.getElementById("high-score");
const final_display = document.getElementById("final-score");
const overlay = document.getElementById("overlay");
const gameoveroverlay = document.getElementById("game-over");

function generate_food(){
    let newfood;
    do{
        newfood = {
            x: Math.floor(Math.random()*tail_count),
            y: Math.floor(Math.random()*tail_count),
        };
    }    
    while(
        snake.some((segment)=> segment.x === newfood.x && segment.y === newfood.y)
    );
    return newfood;
}

function reset_game(){
    snake = [{x: 10,y: 10}];
    direction = {x: 0, y: 0};
    food = generate_food();
    score = 0;
    speed = 200;
    running = false;
    gameover = false;
    update_score();
    overlay.classList.add("start");
    overlay.classList.remove("hidden");
    gameoveroverlay.classList.add("hidden");
}

function update_score(){
    score_display.textContent = score;
    record_display.textContent = record;
}

function game_over_screen(){
    gameoveroverlay.classList.remove("hidden");
    final_display.textContent = score;
    if (score > record){
        record = score;
        localStorage.setItem("snake_record",record);
        record_display.textContent = record;
    }
}

function draw(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    snake.forEach((segment, index)=>{
        ctx.fillStyle=index === 0 ? "#8d0097ff" : "#db00afff"; 
        ctx.fillRect(segment.x*grid_size, segment.y*grid_size, grid_size-2, grid_size-2);
        ctx.strokeStyle="#000000";
        ctx.strokeRect(segment.x*grid_size, segment.y*grid_size, grid_size-2, grid_size-2);
    });

    ctx.fillStyle="#26ed03ff";
    ctx.beginPath();
    ctx.arc(
        food.x*grid_size+grid_size/2,
        food.y*grid_size+grid_size/2,
        grid_size/2-2,
        0,
        2*Math.PI
    );
    ctx.fill();
    ctx.strokeStyle="#687a69";
    for(let i = 0; i<tail_count; i++){
        ctx.beginPath();
        ctx.moveTo(i*grid_size,0);
        ctx.lineTo(i*grid_size,canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0,i*grid_size);
        ctx.lineTo(canvas.width,i*grid_size);
        ctx.stroke();
    }
}
function game_loop(){
    if(gameover || !running)return;
    const head={...snake[0]};
    head.x+=direction.x;
    head.y+=direction.y;
    if(
        head.x<0 ||
        head.x>= tail_count || 
        head.y<0 || 
        head.y>= tail_count || 
        snake.slice(1).some((segment)=>segment.x===head.x && segment.y=== head.y) 
    ){
        gameover = true;
        game_over_screen();
        return;
    }
    snake.unshift(head);
    if(head.x===food.x && head.y===food.y){
        score++;
        update_score();
        food = generate_food();
        if(score%5===0){
            speed=Math.max(50,speed-10);
        }
    }
    else{
        snake.pop();
    }
    draw();
}
document.addEventListener("keydown",(e)=>{
    if(!running && ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)){
        switch(e.key){
            case"ArrowUp":
            direction={x:0,y:-1};
            break;
            case"ArrowDown":
            direction={x:0,y:1};
            break;
            case"ArrowLeft":
            direction={x:-1,y:0};
            break;
            case"ArrowRight":
            direction={x:1,y:0};
            break;
        }
        running = true;
        overlay.classList.add("hidden");
    }
     switch(e.key){
            case"ArrowUp":
            if(direction.y !== 1) direction={x:0,y:-1};
            break;
            case"ArrowDown":
            if(direction.y !== -1) direction={x:0,y:1};
            break;
            case"ArrowLeft":
            if(direction.x !== 1) direction={x:-1,y:0};
            break;
            case"ArrowRight":
            if(direction.x !== -1) direction={x:1,y:0};
            break;
        }
});
document.getElementById("restart-button").addEventListener("click",()=>{
    reset_game();
});
update_score();
reset_game();
setInterval(game_loop, speed);
