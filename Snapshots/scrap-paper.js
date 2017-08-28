




          {this.state.editStepOn && this.state.activeIndexEditStep === index
            ? <EditStep handleChange={this.handleChangeEditForm} editedStep={this.state.editedStep}   submitEditedStep={this.submitEditedStep} step={step} index={index} /> : null
          }




.currentstep-wrapper {
  display: inline-block;
  /*width: 230px;*/
  /*height: 39px;*/
  padding: 0 10px 10px;
  /*margin-left: 410px;*/
  /*border: solid 1px green;*/
}


/*.currentstep-wrapper {
  width: 400px;
  margin-left: 410px;
  cursor: default;
  /*border: solid 1px black;*/
} *//

/*.currentstep-wrapper {
  display: flex;
  flex-wrap: wrap;
}*/

    steps = this.props.currentGoalSteps.map((step, index) => {
      return (
          <li  onClick={e => this.clickHandlerEdit(e, index)} key={index}>{step}</li>
      )
    })


    <li className="minus-image"><img key={`imagekey-minus${eventIndex}`} onClick={(e,index) => this.clickHandlerRemove(event,eventIndex)} alt="" src={minus}/></li>
 -      {this.state.toggleOnYesNoPrompt && this.state.indexToRemove === eventIndex ? <div className="prompt">
 -        <p>Remove Step?</p>
 -        <YesNoPrompt clickEventYes={this.clickHandlerYes} clickEventNo={this.clickHandlerNo}/></div>
 -      : null}

//ForeignCurrentSteps.js
//   this.props.currentGoalSteps.map((step, index) => {
  //       <div key={`divKey${index}`} className="currentstep-wrapper">
  //         <li className="minus-image"><img key={`imagekey-minus${index}`} onClick={e => this.clickHandlerSuggestRemove(e, index)} alt="" src={minus}/></li>
  //
  //         <li className="plus-image"><img key={`imageKey-plus${index}`} onClick={e => this.clickHandlerSuggestAdd(e, index)} alt="" src={plus}/></li>
  //
  //         <li className="current-step" key={index}>{step}</li>
  //
  //         {this.state.activeIndex === index
  //           ? <SuggestStep/>
  //         : null}
  //         {this.state.toggleOnYesNoPrompt && this.state.indexToRemove === index
  //           ? <div className="prompt">
  //             <p>Remove Step?</p>
  //             <YesNoPrompt clickEventYes={this.clickHandlerYes} clickEventNo={this.clickHandlerNo}/></div>
  //         : null}
  //       </div>
  //     )
  //   });
  // return  <ul>{steps}</ul>
