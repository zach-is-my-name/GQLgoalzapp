/* eslint-disable */
import React from 'react';
import {BrowserRouter as Router, Route, Link, withRouter, Switch} from 'react-router-dom';
import FeedEntry from '../Feed/FeedEntry'
import UserFeedPage from '../../Routes/UserFeedPage-smart'

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
          <Link to={`/userfeed/cjl5mkgkd0ypx0157l9c1zrxk`}>
            UserFeed
          </Link>
        </div>
      </div>
        );
      }
        return <div />;
        };

export default GlobalFeed
