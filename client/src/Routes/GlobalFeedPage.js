/* eslint-disable */
import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag';

import GlobalFeed from '../Components/Feed/GlobalFeed'

const userQuery = gql `
  query userQuery {
        user {
          id
          userName
            }
       }`

const AllGoalDocs = gql `
  query allGoalDocs {
    allGoalDocs(orderBy: createdAt_DESC)
    {
      goal
      id
      owners {
        userName
        id
      }
    }
  }
  `

class GlobalFeedPage extends Component {

  render() {
const {loading, error, allGoalDocs}  = this.props;
    // console.log(allGoalDocs)

    return(
      <div>
        <h4>Global Feed</h4>
        <GlobalFeed
          entries={allGoalDocs || []}
          loggedInUserId ={this.props.userQuery.user ? this.props.userQuery.user.id : null}
        />
        {loading ? <p>loading</p>: null}
      </div>
        )
  }
}


const withData =
compose(
graphql(AllGoalDocs, {
props: ({data: {loading, error, allGoalDocs }}) => ({
  loading,
  error,
  allGoalDocs
})
}),
graphql(userQuery, {name: 'userQuery'})
)(GlobalFeedPage)

export default withData
