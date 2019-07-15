import React from 'react';
import { Board } from './board';

export class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        },
      ],
      currentTurn: 0,
      players: [
        {
          name: 'Player 1',
          symbol: 'x',
        },
        {
          name: 'Player 2',
          symbol: 'o',
        },
      ],
      playersNamed: false,
    }
  }

  renderPlayerNameScreen() {
    const players = this.state.players.slice();
    const playersInputs = players.map((player, index) => {
      return (
        <input
          key={index}
          value={player.name}
          onChange={(event) => this.onPlayerNameChange(index, event.target.value)}
        />
      )
    })
    return (
      <form onSubmit={this.savePlayerNames}>
        {playersInputs}
        <button type="submit">Save</button>
      </form>
    );
  }

  render() {

    if (!this.state.playersNamed) {
      return this.renderPlayerNameScreen();
    }
    const history = this.state.history;
    const current = history[this.state.currentTurn];
    const winner = calculateWinner(current.squares);
    let currentPlayerIndex = this.state.currentTurn % this.state.players.length;
    let status;
    if (winner) {
      status = 'winner: ' + winner;
    } else {
      status = 'Next Player: ' + (this.state.players[currentPlayerIndex].name);
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move # ' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

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

  onPlayerNameChange(playerIndex, name) {
    const players = this.state.players.slice();
    players[playerIndex].name = name;
    this.setState({
      players,
    })
  }

  savePlayerNames = (e) =>  {
    console.log('saving players');
    e.preventDefault();
    this.setState({playersNamed: true})
  }

  jumpTo(step) {
    this.setState({
      currentTurn: step,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.currentTurn + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    let currentPlayerIndex = this.state.currentTurn % this.state.players.length;
    squares[i] = this.state.players[currentPlayerIndex].symbol;
    this.setState({
      history: history.concat([{
        squares,
      }]),
      currentTurn: history.length,
    });
  }
}

function calculateWinner(squares) {
  const lines = [
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