import React from 'react';

import FeedEntry from '../Feed/FeedEntry'

export default const GlobalFeed = ({entries}) => {
  if (entries && entries.length) {
    return (
      <div>{entries.map(entry => (entry
        ? <FeedEntry key={entry.goal} entry={entry}/>
      : null))}
      </div>
    )
  }
}
