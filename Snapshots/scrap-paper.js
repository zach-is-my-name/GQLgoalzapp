




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
