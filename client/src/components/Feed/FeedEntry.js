import React from 'react';

const FeedEntry = (entry) => {
  const {id, owner: {userName}, goal} = entry

return (
<div>
  <p>`$goal ........ $userName</p>
</div>
)
}
