/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../style/CurrentSuggestedSteps.css'

class CurrentSuggestedSteps extends Component {
  render() {
    // console.log(this.props.suggestRemoveSteps)
    // console.log(this.props.suggestRemoveSteps.map((item) => this.props.currentSteps[item]))

    // let _suggestedStep = this.props.currentSuggestedSteps.map((suggestedStep, index) => {
    //   // console.log('suggestRemoveSteps', this.props.suggestRemoveSteps)
    //   //For each of the current suggested steps, if
    //   if (this.props.suggestRemoveSteps.length) {
    //     // console.log('yes conditional')
    //     let className = `suggested-remove-step`
    //     let stepSuggestRemoveArr =  this.props.suggestRemoveSteps.map((item) =>{
    //       return  this.props.currentSteps[item]})
    //    stepSuggestRemoveArr.map((suggestedStepToRemove) => {
    //       // console.log('suggestedStepToRemove', suggestedStepToRemove)
    //       // console.log('yes next line return <li>' )
    //   return    ( <li className={`${className}`} >{suggestedStepToRemove}</li>)
    //     })
    //   }
    //   console.log('condition bypassed')
    //   let className = `suggested-step`
    //    return <li className={`${className}`} >sudo {suggestedStep}</li>
    // })

    let suggestedStepToRemove = this.props.suggestRemoveSteps.map((index) => {
   return  this.props.currentSteps[index]
        })
    .map((_suggestedStepToRemove,index) => { return  <li key={index} className={`suggested-remove-step`} >{_suggestedStepToRemove}</li>}
            )

        console.log(suggestedStepToRemove)
// console.log(typeof suggestedStepsToRemove)
    // let _suggestedStepToRemove = <li key={index} className={`suggested-remove-step`} >{suggestedStepToRemove}</li>

    // .map((stepToRemove) => {
    //   return    <li key={index} className={`suggested-remove-step`} >{suggestedStepToRemove}</li>
    //       })


          // console.log('typeof _suggestedStepToRemove', Array.isArray(_suggestedStepToRemove))

          let _suggestedStep = this.props.currentSuggestedSteps.map((suggestedStep, index) => {
            // if (this.props.suggestRemoveSteps.length) {
            // const
            //       return  this.props.suggestRemoveSteps.map((item) =>{
            //       return  this.props.currentSteps[item]})
            //
            //      .map((suggestedStepToRemove) => {
            //       let className = `suggested-remove-step`
            //         // console.log('suggestedStepToRemove', suggestedStepToRemove)
            //      return (<li key={index} className={`${className}`} >{suggestedStepToRemove}</li>)
    //    })
    // //  }
    //
    //     console.log('condition bypassed')
    //     // let className = `suggested-step`
         return <li key={index} className={`suggested-step`} > {suggestedStep}</li>
      })
          // console.log('typeof _suggestedStep', typeof _suggestedStep)


      // ).map((step) => {
      //     // console.log('suggest remove steps: items',item)
      //     console.log('remove steps map:', step)
      // })

    ;

    let suggestedStepsList = <div>
      <p className="suggestedsteps-label">
        Suggested Steps:
      </p>
      <div className="suggestedstep-wrapper">
        <ul className="suggestedsteps">{_suggestedStep}</ul>
        <ul className="suggestedremovesteps"> {suggestedStepToRemove} </ul>
      </div>
    </div>;

    return (
      <div className="suggestedsteps-container">
        {/* {_suggestedStep} */}
        {this.props.currentSuggestedSteps.length
          ? suggestedStepsList
        : null}
      </div>
    )
  }
}
// suggestedStepsList
const mapStateToProps = (state, props) => {
  return {currentSuggestedSteps: state.goals.currentSuggestedSteps,
          suggestRemoveSteps: state.goals.currentSuggestedRemoveSteps,
          currentSteps: state.goals.currentGoalSteps,}
}

export default connect(mapStateToProps)(CurrentSuggestedSteps);
