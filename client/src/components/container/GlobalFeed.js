import React from 'react';

import FeedEntry from '../Feed/FeedEntry'

 const GlobalFeed = ({entries = []})  => {
  if (entries && entries.length) {
    return (
      <div> {
        entries.map(entry => (
          entry ? <FeedEntry
            key={entry.goal}
            entry={entry}
                  />
          : null
        ))
      }
      </div>
  );
  }
  return <div />;
};
export default GlobalFeed
