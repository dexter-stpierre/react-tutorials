import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    input: 'hello'
  };

  submit = () => {
    console.log(this.text.value);
  };

  updateInput = event => {
    event.persist();
    console.log(event.target.value);
    this.setState({
      input: event.target.value.trim()
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome text="Welcome to using props" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <input
            type="text"
            value={this.state.input}
            onChange={this.updateInput}
          />
          <input type="text" ref={input => (this.text = input)} />
          <button onClick={this.submit}>Show/Hide</button>
        </header>
      </div>
    );
  }
}

class Welcome extends Component {
  render() {
    const { text } = this.props;
    return <h1>{text}</h1>;
  }
}

export default App;
