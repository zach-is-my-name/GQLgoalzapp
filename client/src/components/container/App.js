import React, { Component } from 'react';
import '../../App.css';
import GoalSelectorData from '../presentational/GoalSelector.js'
import GoalInput from '../presentational/GoalInput.js'



export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h1>GoalZapp</h1>
        </div>
        <GoalSelectorData />
        <GoalInput />
        <p className="App-intro">
        </p>
      </div>
    );
  }
}
