$(document).ready(function () {
  class ticTacToe {
    constructor() {
      this.player = 3;
      this.computer = -2;
      this.hasWinner = false;
      this.playerString = "<h1>X</h1>";
      this.computerString = "<h1>O</h1>";
      this.gameState = 1;
      this.table = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.winners = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    }

    emptyIndices() {
      let empty = [];
      for (let i = 0; i < this.table.length; i++) {
        if (this.table[i] === 0) {
          empty.push(i);
        }
      }
      return empty;
    }

    scoring() {
      let result = {};
      result["scores"] = [];
      result["empties"] = [];
      for (let i = 0; i < this.winners.length; i++) {
        let score = 0;
        let empty = [];
        for (let j = 0; j < this.winners[i].length; j++) {
          score = score + this.table[this.winners[i][j]];
          if (this.table[this.winners[i][j]] === 0) {
            empty.push(this.winners[i][j]);
          }
        }
        result["scores"].push(score);
        result["empties"].push(empty);
      }
      return result;
    }

    beginGame() {
      $('.player').on("click", e => {
        if ($(e.currentTarget).hasClass("choose_x")) {
          this.player = 3;
          this.computer = -2;
          this.playerString = "<h1>X</h1>";
          this.computerString = "<h1>O</h1>";
          this.playerMove(1);
        } else {
          this.player = -2;
          this.computer = 3;
          this.playerString = "<h1>O</h1>";
          this.computerString = "<h1>X</h1>";
          this.computerMove();
        }
        $('.popup').addClass('hideEl');
        $('.back').addClass('showEl');
      });
    }

    hasWon() {
      if (this.gameState) {
        let scores = this.scoring()["scores"];
        for (let i = 0; i < scores.length; i++) {
          let win = $('.end');

          let currentScore = scores[i];

          if (currentScore === this.player * 3) {
            win.html("<h4>Player won the Game!</h4>");
            this.hasWinner = true;
            this.hasWonEnd();
            this.gameState = 0;
            break;
          } else if (currentScore === this.computer * 3) {
            win.html("<h4>Computer won the Game!</h4>");
            this.hasWinner = true;
            this.hasWonEnd();
            this.gameState = 0;
            break;
          } else if (this.emptyIndices().length === 0 && i === scores.length - 1) {
            win.html("<h4>It's a draw!</h4>");
            this.hasWinner = true;
            this.hasWonEnd();
            this.gameState = 0;
          }
        }
      }
    }

    hasWonEnd(win) {
      $('.back').removeClass('showEl');
      setTimeout(() => {$('.end').removeClass("hideEl");}, 440);
      this.transition();
    }

    transition() {
      $('.popup.end').on("click", e => {
        $(e.currentTarget).addClass('hideEl');
        this.reset();
      });
    }

    decideBestMove() {
      let emptySpaces = this.emptyIndices();
      let scores = this.scoring();
      let comp2 = scores["scores"].indexOf(this.computer * 2);
      if (comp2 >= 0) {
        if (scores["empties"][comp2][0] >= 0) {
          return scores["empties"][comp2][0];
        }
      }
      let play2 = scores["scores"].indexOf(this.player * 2);
      if (play2 >= 0) {
        if (scores["empties"][play2][0] >= 0) {
          return scores["empties"][play2][0];
        }
      }
      if (emptySpaces.indexOf(4) >= 0) {return 4;}
      let emptyCorners = emptySpaces.filter(val => {
        if (val === 0 || val % 2 === 0) {return true;} else
        {return false;}
      });
      if (emptyCorners.length > 0) {
        return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
      }
      let emptyMiddles = emptySpaces.filter(val => {
        if (val % 2 === 1) {return true;} else
        {return false;}
      });
      if (emptyMiddles.length > 0) {
        return emptyMiddles[Math.floor(Math.random() * emptyMiddles.length)];
      }
    }

    computerMove() {
      this.playerMove();
      let bestMove = this.decideBestMove();
      let comp = "#" + bestMove;
      $(comp).html(this.computerString);
      this.table[bestMove] = this.computer;
      $(comp).removeClass("empt");
      this.hasWon();
      this.playerMove(1);
    }

    playerMove(turn = 0) {
      if (turn) {
        $(".box").on("click", e => {
          let square = $(e.currentTarget);
          if (square.text() === '') {
            square.html(this.playerString);
            this.table[square.attr('id')] = this.player;
            square.removeClass("empt");
            this.hasWon();
            if(!this.hasWinner){
              this.computerMove();
            }
          }
        });
      }
    }

    reset() {
      this.hasWinner = false;
      $('.popup.who').removeClass('hideEl');
      this.table = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < 9; i++) {
        $("#" + i).addClass("empt").html("");
      }
      this.gameState = 1;
    }}


  let Game = new ticTacToe();
  Game.beginGame();

});