import React from 'react';
import '../../style/FeedEntry.css'

const FeedEntry = ({entry}) => {
  // console.log(entry)
const {goal} = entry
const owner = entry.owners === null ? 'anonymous': entry.owners.userName
// console.log(owner);
// console.log( entry.owners.userName !== null ? `username is ${entry.owners.userName}` :`no username`)
return (
<div>
  {`${goal} ........ `} <span className="feed-entry-owner">  {`${owner}`} </span>
  <span className="feed-entry-text-zapped-goal"> {`zapped goal`} </span>
  <span className="feed-entry-goal"> {`${goal}`} </span>
</div>
    )
    }

export default FeedEntry
