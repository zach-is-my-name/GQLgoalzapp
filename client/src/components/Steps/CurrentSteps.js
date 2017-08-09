/* eslint-disable */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import '../../style/CurrentSteps.css'
import plus from '../../style/images/plus_websize.png'
import minus from '../../style/images/minus.jpg'
import * as actions from '../../Actions/actions.js'
import SuggestStep from './SuggestStep.js'
import YesNoPrompt from './YesNoPrompt.js'

class CurrentSteps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: null,
      toggleOnYesNoPrompt: false,
      indexToRemove:null ,
    }
    this.clickHandlerYes = this.clickHandlerYes.bind(this)
    this.clickHandlerNo = this.clickHandlerNo.bind(this)
  }

clickHandlerYes(event) {
console.log('yes clicked')
this.props.dispatch(actions.removeStep(this.state.indexToRemove))
  this.setState(prevState => ({
    toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt
}))}

clickHandlerNo(event) {
  console.log('no clicked')
  this.setState(prevState => ({
    toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt,
    indexToRemove: null
  }))
}

clickHandlerSuggestAdd(event, index){
this.setState({ activeIndex: index})
}

clickHandlerSuggestRemove(event, index) {
  console.log('click handler activated')
  this.setState(prevState => ({
    toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt,
    indexToRemove: index,
  })

)}

  render() {

  let steps = this.props.currentGoalSteps.map((step, index) => {
      return (
        <div key={`divKey${index}`} className="currentstep-wrapper">
          <li className="minus-image"><img key={`imagekey-minus${index}`}
            onClick={e => this.clickHandlerSuggestRemove(e,index)}
            alt="" src={minus}/></li>  <li className="plus-image"><img  key={`imageKey-plus${index}`} onClick={e => this.clickHandlerSuggestAdd(e, index)}  alt="" src={plus}/></li>
          <li className="current-step" key={index}>{step}</li>
          {this.state.activeIndex === index  ? <SuggestStep /> : null}
          {this.state.toggleOnYesNoPrompt ? <div className="prompt"><p>Remove Step?</p>
            <YesNoPrompt clickEventYes={this.clickHandlerYes} clickEventNo={this.clickHandlerNo} /></div> : null }
        </div>
            )
            });

            return (
              <div className="steps-container">
                <p className="currentsteps-label">
                  Steps:
                </p>
                <ul>{steps}</ul>
              </div>)}}

            const mapStateToProps = (state, props) => {
              return {currentGoalSteps: state.goals.currentGoalSteps}
            }

            export default connect(mapStateToProps)(CurrentSteps);
