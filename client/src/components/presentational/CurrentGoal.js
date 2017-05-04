import React,{Component} from 'react';

export default function CurrentGoal(props) {
    console.log(props.currentGoal);
    return <p>Current Goal: {props.selectedGoal}</p>

}
