import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import CurrentGoal from './CurrentGoal'

class GoalSelector extends React.Component {
  constructor(props) {
    super(props)
    this.selectGoal = this.selectGoal.bind(this);
    this.state = {
      currentGoal: ''
    };
  }
//Find out how to give the dropdown an initial default option value, along with the options data being fetched
//Find out why you can not console.log and event
  selectGoal(event) {
    console.log('this was triggered');
    console.log(event.target.value);
    this.setState({currentGoal: event.target.value});
  }

  // selectGoalSubmit(event){
  //
  // }

  render() {
    const {
      data: {
        loading,
        error,
        goalDocs
      }
    } = this.props;
    if (loading) {
      return <div>loading...</div>;
    } else if (error) {
      return <p>Error!</p>
    } else {

      let goalDocs = this.props.data.goalDocs;

      const goalSelectInputValues = this.props.data.goalDocs.map((goalDoc, index) => {
        return <option value={goalDoc.goal} key={index}>{goalDoc.goal}</option>
      });

      const goalSelectInput = <form className="goal-select" onSubmit={this.selectGoal}>
        <select value={this.state.currentGoal} onChange={this.selectGoal}>
          {goalSelectInputValues}
        </select>
      </form>

      return (
        <div>
          {goalSelectInput}
          <CurrentGoal selectedGoal={this.state.currentGoal} />
        </div>
      )

    }
  }
}

const GoalQuery = gql `
            query root {
              goalDocs {
                goal
              }
            }
            `;

export default graphql(GoalQuery)(GoalSelector);
