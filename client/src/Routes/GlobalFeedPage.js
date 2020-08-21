/* eslint-disable */
import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag';

import GlobalFeed from '../Components/Feed/GlobalFeed'

const userQuery =  gql`
  query {
    user {
      id
      email
      lastName
      firstName
    }
  }
`;

/*const AllGoalDocs1 = gql `
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
  */
const AllGoalDocs = gql`
 query suggesterQuery {
  goalDocsList(orderBy: createdAt_DESC) {
    items {
      goal
      id
      owner {
        userName
        id
      }
    }
  }
}
`
class GlobalFeedPage extends Component {
  render() {
if (this.props.allGoalDocs && !this.props.allGoalDocs.loading) {
   /*
   if (!this.props.allGoalDocs.goalDocsList.items.length) {
     return  (
      <div>

      </div>
     )

   }
*/
    return(
      <div>
        <h4>Global Feed</h4>
        <GlobalFeed
          entries={this.props.allGoalDocs.goalDocsList.items || [] }
          loggedInUserId ={this.props.loggedInUserId}
          loggedInUserName={this.props.loggedInUserName}
        />
        {this.props.allGoalDocs.loading ? <p>loading</p>: null}
      </div>
        )
  }
  return null
}
}


const withData = compose(
graphql(AllGoalDocs, {
  name: 'allGoalDocs',
  options: () => (
    {
      fetchPolicy: 'network-only',
    })
})
)(GlobalFeedPage)

export default withData
