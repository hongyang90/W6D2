class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
    
  }

  bindEvents() {
    console.log(this.game.isOver());
    this.$el.on('click', '.black', ( event => {
      const $square = $(event.target);
      console.log($square);
      this.makeMove($square);
    }));
  }

  makeMove($square) {
    if (this.game.isOver() === false) {
      if (this.game.currentPlayer === 'x') {
        $square.removeClass('black');
        $square.addClass('x');
      } else {
        $square.removeClass('black');
        $square.addClass('o');
      }
      $square.html(`${this.game.currentPlayer}`);
      
      let pos = JSON.parse($square.attr('id'));
      this.game.playMove(pos);


      if (this.game.isOver()) {
        if (this.game.winner()) {
          alert(`GAME OVER ${this.game.winner()} WINS!!!!!`);
          
        } else {
          alert('No One Wins!');
        }
      }
    }
  }

  setupBoard() {
    const $board = $('<ul>');
    console.log($board);
    $board.addClass('squares');

    for (let i = 0; i < 9; i++) {
      let $square = $("<li>");
      $square.addClass('black');
      $square.attr('id', `[${Math.floor(i/3)},${i%3}]`)
      $board.append($square);
    }
    this.$el.append($board);
  }
}

module.exports = View;
