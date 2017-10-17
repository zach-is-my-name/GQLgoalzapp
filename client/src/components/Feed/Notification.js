import React, {Component} from 'react'

 const Notification = (props) => {
  return (
    <li key={props.id}>{props.user} suggested {props.step}</li>
  )
}

export default Notification
