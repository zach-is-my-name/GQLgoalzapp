import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';


import CurrentGoal from './CurrentGoal'
import GoalSelectForm from '../Form/GoalSelectForm'

class GoalSelector extends React.Component {
  constructor(props) {
    super(props)
    this.selectGoal = this.selectGoal.bind(this);
    }

  selectGoal = (values) => {
    event.preventDefault();
    // console.log('this was triggered');
    this.props.dispatch(actions.setGoal(values.goalSelector))
  }


//Find out how to give the dropdown an initial default option value, along with the options data being fetched
//Find out why you can not console.log and event

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


      return (
        <div>
          <GoalSelectForm currentGoal={this.props.currentGoal} goalDocs={this.props.data.goalDocs} onChange={this.selectGoal}/>
          <CurrentGoal selectedGoal={this.props.currentGoal} />
        </div>
      )

    }
  }}


const GoalQuery = gql `
            query root {
              goalDocs {
                goal
              }
            }
            `;

const mapStateToProps = (state, props) => {
  // console.log(state)
  return {
    currentGoal: state.goals.currentGoal,
  }
}

const ComponentWithData = graphql(GoalQuery)(GoalSelector);

export default connect(mapStateToProps)(ComponentWithData)
