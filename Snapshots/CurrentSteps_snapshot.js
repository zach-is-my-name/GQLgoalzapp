
/*Orginal attempt based on StackOverflow
https://stackoverflow.com/questions/42197834/how-to-hide-and-show-list-items-in-render-method/42197948#42197948
Current Component is based on StackOverflow https://stackoverflow.com/questions/45536283/render-component-only-once-in-a-div-below-an-li-when-in-line-button-is-clicked/45536784#45536784 */

/* eslint-disable */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import '../../style/CurrentSteps.css'
import plus from '../../style/images/plus_websize.png'
import * as actions from '../../Actions/actions.js'
import SuggestStep from './SuggestStep.js'

class CurrentSteps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleOnSuggestInput: false,
      showItems: []
    }
    this.clickHandler = this.clickHandler.bind(this)
    // this.toggleOff = this.toggleOff.bind(this)
  }

  // componentDidMount() {
  //   document.addEventListener('click', this.handleClickOutside.bind(this), true)
  // }

  // conmponentWillUnmount() {
  //   document.removeEventListener('click', this.handleClickOutside.bind(this), true)
  // }

  // handleClickOutside(event) {
  //   const domNode = ReactDOM.findDOMNode(this)
  //
  //   if((!domNode || !domNode.contains(event.target))) {
  //     this.setState({
  //       toggleOnSuggestInput: false
  //     })
  //   }
  // }

clickHandler(index){
  let showItems = this.state.showItems.slice();
  // [false,true,false,fales]
  showItems[index] = !showItems[index]
  this.setState({showItems});
  let indexOpen
  for(let i = 0; i<= showItems.length-1; i++) {
    if (showItems[i] === true) {
      indexOpen = i
      console.log(indexOpen)
    }
}
  this.setState(prevState => ({
    toggleOnSuggestInput: !prevState.toggleOnSuggestInput
  }))
}

reset () {
  this.setState(
    {
      showItems: []
    }
  )
  console.log(this.state.showItems)
}

// toggleOff() {
//   if (this.state.toggleOnSuggestInput === true) {
//   this.setState( {
//     toggleOnSuggestInput: false
//   })}
//   console.log(this.state.toggleOnSuggestInput)
// }
// _alert() {
//   alert(yes);
// }
  render() {

  let steps = this.props.currentGoalSteps.map((step, index) => {
      return (
        <div key={`divKey${index}`} className="currentstep-wrapper">
          <li className="current-step" key={index}>{step}</li>
          <img  key={`imageKey${index}`} onClick={this.clickHandler.bind(this,index)} className="plus-image" alt="" src={plus}/>
          {this.state.showItems[index] ? <SuggestStep /> : null}
        </div>
            )
        });

      return (
        <div className="steps-container">
          <p className="currentsteps-label">
            Steps:
          </p>
          <ul>{steps}</ul>
          <button  onClick={this.reset.bind(this)}>
            reset
          </button>
          {/* {this.state.toggleOnSuggestInput ? <SuggestStep /> : null} */}
            </div>)}}

            const mapStateToProps = (state, props) => {
              return {currentGoalSteps: state.goals.currentGoalSteps}
            }

            export default connect(mapStateToProps)(CurrentSteps);
