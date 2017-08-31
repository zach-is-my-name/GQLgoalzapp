
/* eslint-disable */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import '../../style/CurrentSteps.css'
// import plus from '../../style/images/plus_websize.png'
// import minus from '../../style/images/minus.jpg'
import * as actions from '../../Actions/actions.js'
import SuggestStep from './SuggestStep.js'
import ForeignCurrentSteps from './ForeignCurrentSteps.js'
// import YesNoPrompt from './YesNoPrompt.js'

class CurrentSteps extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     activeIndex: null,
  //     toggleOnYesNoPrompt: false,
  //     indexToRemove: null
  //   }
  //   this.clickHandlerYes = this.clickHandlerYes.bind(this)
  //   this.clickHandlerNo = this.clickHandlerNo.bind(this)
  // }
  //
  // clickHandlerYes(event) {
  //   console.log('yes clicked')
  //   this.props.dispatch(actions.suggestRemoveStep(this.state.indexToRemove))
  //   this.setState(prevState => ({
  //     toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt
  //   }))
  // }
  //
  // clickHandlerNo(event) {
  //   console.log('no clicked')
  //   this.setState(prevState => ({
  //     toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt,
  //     indexToRemove: null
  //   }))
  // }
  //
  // clickHandlerSuggestAdd(event, index) {
  //   this.setState({activeIndex: index})
  // }
  //
  // clickHandlerSuggestRemove(event, index) {
  //   console.log('index to remove', index)
  //   this.setState(prevState => ({
  //     toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt
  //   }))
  //   this.setState({indexToRemove: index})
  // }
  render() {
let steps = <ForeignCurrentSteps currentGoalSteps={this.props.currentGoalSteps} />
// let  steps = this.props.currentGoalSteps.map((step, index) => {
//       return (
//         <div key={`divKey${index}`} className="currentstep-wrapper">
//           <li className="minus-image"><img key={`imagekey-minus${index}`} onClick={e => this.clickHandlerSuggestRemove(e, index)} alt="" src={minus}/></li>
//           <li className="plus-image"><img key={`imageKey-plus${index}`} onClick={e => this.clickHandlerSuggestAdd(e, index)} alt="" src={plus}/></li>
//           <li className="current-step" key={index}>{step}</li>
//           {this.state.activeIndex === index
//             ? <SuggestStep/>
//           : null}
//           {this.state.toggleOnYesNoPrompt && this.state.indexToRemove === index
//             ? <div className="prompt">
//               <p>Remove Step?</p>
//               <YesNoPrompt clickEventYes={this.clickHandlerYes} clickEventNo={this.clickHandlerNo}/></div>
//           : null}
//         </div>
//       )
//     });

    return (
      <div className="steps-container">
        <p className="currentsteps-label">
          Steps:
        </p>
        {steps}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {currentGoalSteps: state.goals.currentGoalSteps}
}

export default connect(mapStateToProps)(CurrentSteps);