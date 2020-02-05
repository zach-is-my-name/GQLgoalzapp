/* eslint-disable */
import React from 'react';
import { Route, Link, withRouter, Switch} from 'react-router-dom';
import FeedEntry from '../Feed/FeedEntry'
import UserFeedPage from '../../Routes/UserFeedPage-smart'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import '../../style/GlobalFeed.css'

const GlobalFeed = ({
  entries = [],
  loggedInUserId
}) => {

  if (entries && entries.length) {
    return (
      <div className="globalfeed-container">
        {
          entries.map((entry, index) => (
            entry ?
            <FeedEntry key={entry.goal + `${index}` } entry={entry}/>
              : null))
        }
        <div className="globalfeed-user-icon">
          <Link to={`/userfeed/${loggedInUserId}`}>
            <span className="far faUser fa-lg">
              <FontAwesomeIcon icon={faUser}/>
            </span>
          </Link>
        </div>
      </div>
    )} else {
        return (
      <div className="globalfeed-container">
        <div className="globalfeed-user-icon">
          <Link to={`/userfeed/${loggedInUserId}`}>
            <span className="far faUser fa-lg">
              <FontAwesomeIcon icon={faUser}/>
            </span>
          </Link>
        </div>
        </div>
      )
          }
          }
        export default GlobalFeed
