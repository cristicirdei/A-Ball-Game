var ball = document.getElementById("ball");
var score = 0;
var scoreCalculator, mover;
var pozX = 0, pozY = 0;
var scores = new Array(0);

function move(x_pos, y_pos) {
    ball.style.position = "absolute";

    if(Math.abs(x_pos - ball.style.left) > Math.abs(y_pos - ball.style.top) + 20) {
        ball.style.removeProperty("transition");
        ball.style.transition = "left .5s linear, top 1s linear";
    } else {
        if(Math.abs(x_pos - ball.style.left) + 20 < Math.abs(y_pos - ball.style.top)) {
            ball.style.removeProperty("transition");
            ball.style.transition = "left 1s linear, top .5s linear";
        } else {
            ball.style.removeProperty("transition");
            ball.style.transition = "left .5s linear, top 1s linear";
        }
    }

    ball.style.left = (x_pos - 10) + 'px';
    ball.style.top = (y_pos - 10) + 'px';
  }

function startMoving() {
    move(pozX, pozY);
}

function computeScore() {
    if(ball.style.backgroundColor != "red") {
        score += 1;
    } 
    document.getElementById("score").textContent = score;
}

function startGame() {
    ball.style.backgroundColor = "greenyellow";
    ball.style.left = "750px";
    ball.style.top = "150px";
    score = 0;
    scoreCalculator = setInterval(computeScore, 250);
    mover = setInterval(startMoving, 100);
    document.getElementById("start").style.display = "none";
}

function endGame() {
    clearInterval(scoreCalculator);
    clearInterval(mover);
    ball.style.backgroundColor = "red";

    let max = Math.max.apply(null, scores);
    let message;
    if(score > max)
        message = "<span style=\" color: darkorchid; \"> new highscore: " + score + "</span>";
    else
        message = "score: " + score + " | <span style=\" color: darkorchid; \"> highscore: " + max + "</span>";

    document.getElementById("score").innerHTML = message;
    scores.push(score);
    document.getElementById("start").style.display = "block";
}

(function() {
    document.onmousemove = handleMouseMove;
    document.ontouchmove = handleMouseMove;
    function handleMouseMove(e) {
        /*var doc;

        if (event.pageX == null && event.clientX != null) {
            doc = document.documentElement;

            event.pageX = event.clientX + doc.scrollLeft  - doc.clientLeft;
            event.pageY = event.clientY + doc.scrollTop - doc.clientTop;
        }

        pozX = event.pageX;
        pozY = event.pageY;*/

        if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            pozX = touch.pageX;
            pozY = touch.pageY;
        } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
            pozX = e.clientX;
            pozY = e.clientY;
        }

    }
})();

ball.addEventListener("mouseover", endGame);
ball.addEventListener("touchstart", endGame);
document.addEventListener("click", startGame);
document.addEventListener("touchstart", startGame);
