/* eslint-disable */
import React from 'react';
import {BrowserRouter as Router, Route, Link, withRouter, Switch} from 'react-router-dom';
import FeedEntry from '../Feed/FeedEntry'
import UserFeedPage from '../../Routes/UserFeedPage-smart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import '../../style/GlobalFeed.css'

 const GlobalFeed = ({entries = []}  )  => {
  if (entries && entries.length) {
    return (
      <div className="globalfeed-container">
        <div> {
          entries.map(entry => (
            entry ? <FeedEntry
              key={entry.goal}
              entry={entry}
                    />
            : null
          ))
        }</div>
        <div className="globalfeed-user-icon">
          {/* <Switch>
            <Route  path={`/userfeed/:userid`} component={UserFeedPage} />
          </Switch> */}

          <Link to={`/userfeed/cjl5mkgkd0ypx0157l9c1zrxk`}>
            <span className="far faUser fa-lg"> <FontAwesomeIcon icon={ faUser } /> </span>
          </Link>
        </div>
      </div>
        );
      }
        return <div />;
        };

export default GlobalFeed
