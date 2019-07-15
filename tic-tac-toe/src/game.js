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
        <fieldset key={index}>
          <legend>
            Player {index + 1}
          </legend>
          <label htmlFor={'player' + index + 'name'} >
            Name:
          </label>
          <input
            name={'player' + index + 'name'}
            value={player.name}
            onChange={(event) => this.onPlayerNameChange(index, event.target.value)}
          />
          <label htmlFor={'player' + index + 'symbol'} >
            Symbol:
          </label>
          <input
            name={'player' + index + 'symbol'}
            value={player.symbol}
            onChange={(event) => this.onPlayerSymbolChange(index, event)}
          />

        </fieldset>
      )
    })
    return (
      <form className="player-name-form" onSubmit={this.savePlayers}>
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
    const winner = calculateWinner(this.state.players, current.squares);
    let currentPlayerIndex = this.state.currentTurn % this.state.players.length;
    let status;
    if (winner) {
      status = 'winner: ' + winner.name;
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

  onPlayerSymbolChange(playerIndex, event) {
    event.persist();
    console.log(event)
    const symbol = event.nativeEvent.data;
    const players = this.state.players.slice();
    players[playerIndex].symbol = symbol;
    this.setState({
      players,
    })
  }

  savePlayers = (e) =>  {
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
    if (calculateWinner(this.state.players, squares) || squares[i]) {
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

/**
 * @param  any[] players
 * @param  Array squares
 */
function calculateWinner(players, squares) {
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
      const winner = players.find((value, index) => value.symbol === squares[a])
      return winner;
    }
  }
  return null;
}