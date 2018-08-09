/* eslint-disable */
import React from 'react';
import {BrowserRouter as Router, Route, Link, withRouter, Switch} from 'react-router-dom';
import FeedEntry from '../Feed/FeedEntry'
import UserFeedPage from '../../Routes/UserFeedPage'

 const GlobalFeed = ({entries = []}  )  => {
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
          {/* <Switch>
            <Route  path={`/userfeed/:userid`} component={UserFeedPage} />
          </Switch> */}
          <Link to={`/userfeed/cj4blh52ofkt00137q5wi7ukl`}>
            UserFeed
          </Link>
        </div>
      </div>
        );
      }
        return <div />;
        };

export default GlobalFeed
