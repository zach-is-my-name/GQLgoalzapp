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
  ...props
}) => {
  if (entries && entries.length) {
    return (
      <div className="globalfeed-container">
        {
          entries.map((entry, index) => (
            entry ?
            <FeedEntry key={entry.id } entry={entry}/>
              : null))
        }
        {props.loggedInUserId ?
        <div className="globalfeed-user-icon">
          <Link to={`/userfeed/${props.loggedInUserId}`}>
            <span className="far faUser fa-lg">
              <FontAwesomeIcon icon={faUser}/>
            </span>
          </Link>
        </div>
      : null
    }
      </div>
    )}
    else {

        return (
      <div className="globalfeed-container">
        { props.loggedInUserId ?
        <div className="globalfeed-user-icon">
          <Link to={`/userfeed/${props.loggedInUserId}`}>
            <span className="far faUser fa-lg">
              <FontAwesomeIcon icon={faUser}/>
            </span>
          </Link>
        </div>
      : null
        }
        </div>
      )
          }
          }
        export default GlobalFeed
