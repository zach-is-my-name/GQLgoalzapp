import React, {Component} from 'react'
import '../../style/Notification.css'

 const Notification = (props) => {
   console.log('Notification randomColorUserName', props.randomColorUserName)
   console.log('Notication props.randomColorStep', props.randomColorStep)
   let zappColor = {
     color: '#52b8f2'
   }
  return (
    <li key={props.id}> <span style={props.randomColorUserName} className={`user`}>{props.user}</span> <span style={zappColor}>zapped</span> <span style={props.randomColorStep}>{props.step}</span></li>
      )
}

export default Notification
