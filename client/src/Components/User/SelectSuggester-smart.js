/* eslint-disable */
import React, {Component} from 'react';
import {graphql, compose, withApollo} from 'react-apollo'
import gql from 'graphql-tag';
import SelectSuggester from './SelectSuggester'

const suggesterQuery = gql `
query suggesterQuery($goalDocId: ID!) {
  goalDoc(id: $goalDocId) {
    id
    clonedSteps(filter: {suggestedStep: {equals: true}}) {
      items {
      id
        suggester {
          id
          userName
        }
      }
    }
  }
}
`
class SelectSuggesterSmart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
      await this.props.goalDocId
      // const {loggedInU}
      const suggesterQueryResult = await this.props.client.query({query: suggesterQuery, fetchPolicy: 'network-only',
      variables: {
      goalDocId: this.props.goalDocId
    }
  })

      console.log(suggesterQueryResult)
      if (suggesterQueryResult.data.goalDoc)  {
      const { data: { goalDoc: { clonedSteps: { items: clonedSteps } } } }  = suggesterQueryResult
      // let arrGoalDocSuggesters = []
      // console.log('clonedSteps', clonedSteps)
      // return array of step objects, take out intermediate 'suggester' property
      const arrGoalDocSuggesters = () => {
        return (clonedSteps.map(
          stepObj => ({userName: stepObj.suggester ? stepObj.suggester.userName : null, id: stepObj.suggester ? stepObj.suggester.id : null}))
          // return array of objects where there is a userName and id
            .filter((stepObj, index, self) =>
              self.findIndex((findObj) =>
                (stepObj.userName === findObj.userName && stepObj.id === findObj.id)) === index)
                  .filter(stepObj => stepObj.userName && stepObj.id)
                  .filter(stepObj => stepObj.userName !== this.props.loggedInUserName && stepObj.id !== this.props.loggedInUserId) || []
                )
        }
      // console.log('arrGoalDocSuggesters', arrGoalDocSuggesters())

    this.props.setSuggesters(arrGoalDocSuggesters())
    }
  }


  render() {
    return (
      <SelectSuggester
        gotoSelf={this.props.gotoSelf}
        loggedInUserId={this.props.loggedInUserId}
        targetUserId={this.props.targetUserId}
        suggesters={this.props.suggesters || []}
        nextSuggester={this.props.nextSuggester}
        prevSuggester={this.props.prevSuggester}
        targetUserName={this.props.targetUserName}
        renderTargetUserStepsState={this.props.renderTargetUserStepsState}
        renderTargetUserSteps={this.props.renderTargetUserSteps}
      />
  )
  }

}

const withQueries = withApollo(SelectSuggesterSmart)
export default withQueries
