import React from 'react';
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';
import FeedEntry from '../Feed/FeedEntry'
import UserFeedPage from '../../Routes/UserFeedPage'

 const GlobalFeed = ({entries = [], match}  )  => {
  if (entries && entries.length) {
    return (
      <div>
        <div> {
          entries.map(entry => (
            entry ? <FeedEntry
              key={entry.goal}
              entry={entry}
                    />
            : null
          ))
        }</div>
        <div>
          <Link to="/userfeed">
            UserFeed
          </Link>
        </div>
      </div>
        );
      }
        return <div />;
        };
        export default withRouter(GlobalFeed)
        {/* <Link to={`${match.url}/userfeed`}> */}
        {/* <Route path={`${match.url}/userfeed`} component={UserFeed}/> */}
