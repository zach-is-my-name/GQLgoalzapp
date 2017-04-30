import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions'

 class GoalInput extends React.Component {
    constructor(props) {
        super(props)
    this.submitGoal = this.submitGoal.bind(this);
    this.state = {
      varGoal : ''
    }
    }

submitGoal = (event) => {
  event.preventDefault()
  const {varGoal} = this.state;
  const mutateArg =  {varGoaldoc: {goal: varGoal}}
  // Original Attempt this.props.mutate({variables: {createGoalDoc: mutateArg } })
     this.props.mutate({variables: mutateArg})
    .then(({data}) => {
      console.log('GOT DATA', data);
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    })
      .then(this.props.dispatch(actions.setGoal()))
    }

    render() {
        const input = <form className="goal-input" onSubmit={this.submitGoal}>
          <input type="text" id="form-text" placeholder="Your Goal"
            onChange={(e)=> this.setState({varGoal: e.target.value})}/>
          <input type="submit" name="submit step" value="ZappIt"/>
        </form>

        return (input);
    }}

const GoalInputWithData = graphql(gql`
    mutation ($varGoaldoc: GoalDocInput) {
  createGoalDoc(input: $varGoaldoc) {
    goal
  }
}
`)(GoalInput);


const mapStateToProps = (state, props) => {
  return {
    currentGoal: state.currentGoal
  }
}

export default connect(mapStateToProps)(GoalInputWithData)
