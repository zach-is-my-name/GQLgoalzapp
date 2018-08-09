/* eslint-disable */
import React, {Component} from 'react';
import { graphql, gql } from 'react-apollo'

import GlobalFeed from '../Components/Container/GlobalFeed'

class GlobalFeedPage extends Component {

  render() {
const {loading, error, allGoalDocs}  = this.props;
    // console.log(allGoalDocs)

    return(
      <div>
        <h4>Global Feed</h4>
        <GlobalFeed
          entries={allGoalDocs || []}
        />
        {loading ? <p>loading</p>: null}
      </div>
        )
  }
}

const AllGoalDocs = gql `
query {
  allGoalDocs(orderBy: createdAt_DESC)
  {
  goal
  id
  owners {
    userName
  }
  }
}
`

const withData = graphql(AllGoalDocs, {
props: ({data: {loading, error, allGoalDocs }}) => ({
  loading,
  error,
  allGoalDocs
})
})(GlobalFeedPage)

export default withData
