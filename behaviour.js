var ball = document.getElementById("ball");
var score = 0;
var scoreCalculator, mover;
var pozX = 0, pozY = 0;
var scores = new Array(0);

function move(x_pos, y_pos) {
    ball.style.position = "absolute";
    ball.style.left = x_pos+'px';
    ball.style.top = y_pos+'px';
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
    ball.style.left = 750;
    ball.style.top = 150;
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
        message = "score: " + score + "<span style=\" color: darkorchid; \"> | highscore: " + max + "</span>";

    document.getElementById("score").innerHTML = message;
    scores.push(score);
    document.getElementById("start").style.display = "block";
}

(function() {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var doc;

        if (event.pageX == null && event.clientX != null) {
            doc = document.documentElement;

            event.pageX = event.clientX + doc.scrollLeft  - doc.clientLeft;
            event.pageY = event.clientY + doc.scrollTop - doc.clientTop;
        }

        // Use event.pageX / event.pageY here
        console.log("X: " + event.pageX + ", Y: " + event.pageY);
        pozX = event.pageX;
        pozY = event.pageY;
    }
})();

ball.addEventListener("mouseover", endGame);
document.addEventListener("click", startGame);
