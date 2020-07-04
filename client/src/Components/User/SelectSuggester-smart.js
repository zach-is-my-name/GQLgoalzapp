/* eslint-disable */
import React, {Component} from 'react';
import {graphql, compose, withApollo} from 'react-apollo'
import gql from 'graphql-tag';
import SelectSuggester from './SelectSuggester'

const suggesterQuery1 = gql `
query suggesterQuery ($goalDocId: ID) {
  GoalDoc(id: $goalDocId) {
    id
   clonedSteps(orderBy:positionIndex_ASC) {
     suggester {
       userName
       id
     }
   }
  }
}
`
const suggesterQuery = gql `
query suggesterQuery($goalDocId: ID) {
  goalDoc(id: $goalDocId) {
    id
    clonedSteps(orderBy: positionIndex_ASC) {
      items {
        positionIndex
        suggester {
          suggesterOfClonedStep {
            items {
              id
              suggester {
                userName
                id
              }
            }
          }
        }
      }
    }
  }
}`

class SelectSuggesterSmart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate(prevProps) {
    if (!this.props.suggesterQuery.loading && prevProps.suggesterQuery.loading) {
      // console.log('this.props.suggesterQuery', this.props.suggesterQuery)
      // console.log('prevProps.suggesterQuery', prevProps.suggesterQuery)
      let arrGoalDocSuggesters = []
      this.props.suggesterQuery.GoalDoc ? arrGoalDocSuggesters = this.props.suggesterQuery.GoalDoc.clonedSteps.map(
          obj => ({userName: obj.suggester ? obj.suggester.userName : null, id: obj.suggester ? obj.suggester.id : null}))
          .filter(
            (obj, index, self) => self.findIndex((findObj) => {
            return (obj.userName === findObj.userName && obj.id === findObj.id)
          }) === index).filter(obj => obj.userName && obj.id) || [] : []

    this.props.setSuggesters(arrGoalDocSuggesters.pop())
    }
  }

  render() {
    // const {loading, error, GoalDoc} = this.props.suggesterQuery
    let arrGoalDocSuggesters = []
    // console.log(this.props.suggesterQuery)
    // if (!loading) {
    // console.log(this.props.suggesterQuery)

    // arrGoalDocSuggesters.length ? this.props.setSuggesters(arrGoalDocSuggesters) : null
    // console.log(arrGoalDocSuggesters)

    // }

    return (<SelectSuggester setSelf={this.props.setSelf} suggesters={this.props.suggesters || []} nextSuggester={this.props.nextSuggester} prevSuggester={this.props.prevSuggester}/>)
  }

}

const withQuery = compose(graphql(suggesterQuery, {
  name: 'suggesterQuery',
  options: ownProps => {
    return ({
      variables: {
        goalDocId: ownProps.goalDocId
      }
    })
  }
}))(SelectSuggesterSmart)

export default withQuery
