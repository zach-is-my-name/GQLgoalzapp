import React from 'react';

const FeedEntry = ({entry}) => {
  // console.log(entry)
const {goal}  = entry
const owner = entry.owners === null ? 'anonymous': entry.owners.userName
console.log(owner);
// console.log( entry.owners.userName !== null ? `username is ${entry.owners.userName}` :`no username`)
return (
<div> {`

  ${goal} ........ ${owner} zapped goal ${goal}

`}</div>
    )
    }

export default FeedEntry

//"can do javascript inside curly brackets. Pop in variable, run a function"
// {<div>{`
//
//   ${goal} ........ ${userName ? `${userName}` : ''} zapped goal ${goal}
//
// `}</div> }
