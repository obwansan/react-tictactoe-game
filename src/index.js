import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    // Get a COPY of all the played board states from the first to the current stepNumber.
    // Why plus 1 though? SHouldn't it be minus 1 to get the index number from history.length?
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // Get the current board state (an object containing a property holding the current board array)
    const current = history[history.length - 1];
    // Get a copy of the current board array
    const squares = current.squares.slice();

    // If calculateWinner returns a value (X or O, not null), i.e. if someone has won,
    // or the clicked square has a value, don't do anything.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    // Add the current board state (array as a property on an object) to the history array
    // Toggle boolean value of xIsNext so that the next time handleClick() is
    // called the square will be assigned a O if the previous go was an X and
    // vica versa.
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // Get all the played board states
    const history = this.state.history;
    // Get the board state (an object containing a property holding the
    // current board array) of the currently selected move.
    const current = history[this.state.stepNumber];
    // See if someone's won (pass the current board array)
    const winner = calculateWinner(current.squares);

    // map over history (an array of objects containing arrays)
    // I think step is the 'current element being processed in the array' i.e.
    // the object containing the array of moves. move is 'the index of the current
    // element being processed in the array'. On the first iteration there's no
    // move yet so 'Go to game start' is rendered. This has index 0, so 'Go to move #'
    // always starts from 1.
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// squares is the array of Xs and Os comprising the board at any given time
function calculateWinner(squares) {
  // Horizontal, vertical and diagonal winning lines
  const lines =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
