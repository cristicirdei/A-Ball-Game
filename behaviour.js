var ball = document.getElementById("ball");
var score = 0;
var scoreCalculator, mover;
var pozX = 0, pozY = 0;
var scores = new Array(0);

function move(x_pos, y_pos) {
    var d = document.getElementById('ball');
    d.style.position = "absolute";
    d.style.left = x_pos+'px';
    d.style.top = y_pos+'px';
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
}

function endGame() {
    clearInterval(scoreCalculator);
    clearInterval(mover);
    document.getElementById("ball").style.backgroundColor = "red";

    let max = Math.max.apply(null, scores);
    let message;
    if(score > max)
        message = "high score: " + score;
    else
        message = "score: " + score;

    document.getElementById("score").textContent = message;
    scores.push(score);
    console.log(scores + " - " + max);
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
