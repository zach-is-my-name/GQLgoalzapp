import React, {Component} from 'react'

function StepsInput(props) {

  // submitStep = (event) => {
  //   event.preventDefault()
  //   const {varStep} = this.state;
  //   const mutateArg =  {varGoaldoc: {steps: varStep}}
  //      this.props.mutate({variables: mutateArg})
  //     .then(({data}) => {
  //       console.log('GOT DATA', data);
  //     }).catch((error) => {
  //       console.log('there was an error sending the query', error);
  //     });
  //     }

        const input = <form className="step-input" onSubmit={this.submitStep}>
          <input type="text" id="form-text" placeholder="Enter Step"
            onChange={(e)=> this.setState({varGoal: e.target.value})}/>
          <input type="submit" name="submit step" value="ZappIt"/>
        </form>

export default graphql (gql`
    mutation ($varGoaldoc: GoalDocInput) {
  createGoalDoc(input: $varGoaldoc) {
    steps
  }
}
`)(StepsInput);
}
