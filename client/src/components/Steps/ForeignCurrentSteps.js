import React, {Component} from 'react';
import plus from '../../style/images/plus_websize.png'
import minus from '../../style/images/minus.jpg'
import {connect} from 'react-redux';
import YesNoPrompt from './YesNoPrompt.js'
import * as actions from '../../Actions/actions.js'
import SuggestStep from './SuggestStep.js'

class ForeignCurrentSteps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: null,
      toggleOnYesNoPrompt: false,
      indexToRemove: null
    }
    this.clickHandlerYes = this.clickHandlerYes.bind(this)
    this.clickHandlerNo = this.clickHandlerNo.bind(this)
  }

  clickHandlerYes(event) {
    console.log('yes clicked')
    this.props.dispatch(actions.suggestRemoveStep(this.state.indexToRemove))
    this.setState(prevState => ({
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt
    }))
  }

  clickHandlerNo(event) {
    console.log('no clicked')
    this.setState(prevState => ({
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt,
      indexToRemove: null
    }))
  }

  clickHandlerSuggestAdd(event, index) {
    this.setState({activeIndex: index})
  }

  clickHandlerSuggestRemove(event, index) {
    console.log('index to remove', index)
    this.setState(prevState => ({
      toggleOnYesNoPrompt: !prevState.toggleOnYesNoPrompt
    }))
    this.setState({indexToRemove: index})
  }

  render() {
  const steps =  this.props.currentGoalSteps.map((step, index) => {
      return (
        <div key={`divKey${index}`} className="currentstep-wrapper">
          <li className="minus-image"><img key={`imagekey-minus${index}`} onClick={e => this.clickHandlerSuggestRemove(e, index)} alt="" src={minus}/></li>

          <li className="plus-image"><img key={`imageKey-plus${index}`} onClick={e => this.clickHandlerSuggestAdd(e, index)} alt="" src={plus}/></li>
          
          <li className="current-step" key={index}>{step}</li>

          {this.state.activeIndex === index
            ? <SuggestStep/>
          : null}
          {this.state.toggleOnYesNoPrompt && this.state.indexToRemove === index
            ? <div className="prompt">
              <p>Remove Step?</p>
              <YesNoPrompt clickEventYes={this.clickHandlerYes} clickEventNo={this.clickHandlerNo}/></div>
          : null}
        </div>
      )
    });
  return  <ul>{steps}</ul>
  }
}
export default connect()(ForeignCurrentSteps);
