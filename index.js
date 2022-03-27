var board = {
    1: ["","",""],
    2: ["","",""],
    3: ["","",""]
};

var turn = 1;
var player1 = 1;
var player2 = 1;
var ties = 1;

function announceWinner(winner){
    document.querySelector("#end h1").textContent = winner;
    document.getElementById("end").hidden = false;
}

function checkWin (mark) {
    let win = false;
    for (let i = 1; i <= 3; i++) {
        // horizontal
        if (board[i][0] === mark && board[i][1] === mark && board[i][2] === mark){
            win = true;
        }
        // vertical
        else if (board[1][i-1] === mark && board[2][i-1] === mark && board[3][i-1] === mark){
            win = true;
        }        
    }
    // diagonal
    if (board[2][1] === mark) {
        //negative and positive slope
        if ((board[1][0] === mark && board[3][2] === mark) || (board[1][2] === mark && board[3][0] === mark))
            win = true;
    }
    setTimeout(function(){
        if (win) {
            if(mark === 'X')
            {
                document.querySelector(".player1 h1").textContent = player1++;
                announceWinner("Player 1 Wins");
            }
            else
            {
                document.querySelector(".player2 h1").textContent = player2++;
                announceWinner("Player 2 Wins");
            }
            resetGame(false);
        } 
        else if (turn === 10){ //end of turn
            announceWinner("TIE");
            document.querySelector(".ties h1").textContent = ties++;
            resetGame(false);
        }
    }, 100);
}

function resetGame(hardReset){
    turn = 1;
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 3; j++){
            board[i][j] = "";
        }
    }
    for (i = 0; i < 9; i++){
        document.querySelectorAll("div.box")[i].textContent = "";
    }
    document.querySelector(".turn-id-img").setAttribute("src", "/components/X-silver.png");
    if (hardReset){
        player1 = 1;
        player2 = 1;
        ties = 1;
        document.querySelector(".player1 h1").textContent = 0;
        document.querySelector(".player2 h1").textContent = 0;
        document.querySelector(".ties h1").textContent = 0;
        document.getElementById("end").hidden = false;
        document.querySelector("#end h1").textContent = "Start";
    }
}

// MAIN
document.querySelector("#end div").addEventListener("click", function(){
    document.getElementById("end").hidden = true;
});

for (let index = 0; index < document.querySelectorAll(".box").length; index++) {
    // document.getElementById("end").hidden = true;
    document.querySelectorAll(".box")[index].addEventListener("click", function(){
        let mark = "",
            mark2 = "";
        
        if (turn % 2 === 1){
            mark = "X";
            mark2 = "O";
        }else{
            mark = "O";
            mark2 = "X";
        }

        if (board[Math.floor(index / 3) + 1][Math.floor(index % 3)] === "") {
            document.querySelector(".turn-id-img").setAttribute("src", "/components/" + mark2 + "-silver.png");
            this.innerHTML = '<img src="/components/' + mark + '.png" alt="' + mark + '"></img>';
            board[Math.floor(index / 3) + 1][Math.floor(index % 3)] = mark;
            checkWin(mark);
            turn++;
        }
    });
}

document.querySelector(".reset-img").addEventListener("click", resetGame);