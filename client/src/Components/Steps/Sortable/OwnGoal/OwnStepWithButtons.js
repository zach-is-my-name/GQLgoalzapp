/* eslint-disable */
import React from 'react';
import YesNoPrompt from '../../YesNoPrompt.js'
import EditButton from './EditButton.js'
import PlusButton from './PlusButton.js'
import MinusButton from './MinusButton'
  const OwnStepWithButtons = (props) => {
    return (
    

        {/* <li className="minus-image"> <img key={`imagekey-minus${stepIndex}`} onClick={() => clickHandlerMinus(stepIndex, stepObj.id)} alt="" src={minus}/></li>
        */}
        <MinusButton
          {...props}
          // clickHandlerMinus={clickHandlerMinus}
          // stepObj={stepObj}
          // toggleConfirmPrompt={toggleConfirmPrompt}
          // stepIndex={stepIndex}
          // indexToRemove={indexToRemove}
          // toggleSuggestedSteps={toggleSuggestedSteps}
          // clickHandlerConfirmRemove={clickHandlerConfirmRemove}
          // clickHandlerCancel={clickHandlerCancel}
          // renderRemoveStepState={renderRemoveStepState}
          // idToRemove={idToRemove}
          // goalDocId={goalDocId}
          // unrenderRemoveStepFunction={unrenderRemoveStepFunction}
          // renderRejectStepState={renderRejectStepState}
          // unrenderRejectStepFunction={unrenderRejectStepFunction}
        />

        <EditButton
          {...props}
          // style={style}
          // clickHandlerEdit={clickHandlerEdit}
          // stepObj={stepObj}
          // stepIndex={stepIndex}
          // toggleSuggestedSteps={toggleSuggestedSteps}
          // renderEditStepState={renderEditStepState}
          // unrenderEditFunction={unrenderEditFunction}
          //
        />

        <PlusButton
          {...props}
          // stepActivated={stepActivated}
          // stepIndex={stepIndex}
          // indexClicked={indexClicked}
          // stepObj={stepObj}
          // toggleSuggestedSteps={toggleSuggestedSteps}
          // goalDocId={goalDocId}
          // renderAcceptStepState={renderAcceptStepState}
          // unrenderAcceptStepFunction={unrenderAcceptStepFunction}
          // clickHandlerPlus={clickHandlerPlus}
        />
        {/* <li className="plus-image"> <img key={`imageKey-plus${stepIndex}`} onClick={() => clickHandlerPlus(stepIndex)} alt="" src={plus}/> </li> */}
      </div>

      <div className="row-2">
        {/*remove step*/}
        {/* {(toggleConfirmPrompt && (stepIndex !== null) && (indexToRemove === stepIndex && stepObj.suggestedStep === false)) && !toggleSuggestedSteps
          ? <div className="prompt">
            <p>Remove Step?</p>
            <YesNoPrompt
          clickEventYes={clickHandlerConfirmRemove}
          clickEventNo={clickHandlerCancel}
            />
          </div>
          : null }
          {renderRemoveStepState === true  && (indexToRemove === stepIndex)  ?
          <RemoveStep
            stepObj={stepObj}
            stepIndex={stepIndex}
            idToRemove={idToRemove}
            goalDocId={goalDocId}
            unrenderRemoveStepFunction={unrenderRemoveStepFunction}
            renderRemoveStepState={renderRemoveStepState}
          />
          : null}
        */}

        {/*reject step*/}
        {/* {(toggleConfirmPrompt && (stepIndex !== null) && (indexToRemove === stepIndex && stepObj.suggestedStep === true))
          ? <div className="prompt">
            <p>Reject Step?</p>
            <YesNoPrompt clickEventYes={clickHandlerConfirmReject} clickEventNo={clickHandlerCancel}/></div>
          : null}
        */}
        {/* {renderRejectStepState === true && (indexToRemove === stepIndex) ?
          <RejectStep
            idToRemove={idToRemove}
            renderRejectStepState={renderRejectStepState}
            goalDocId={goalDocId}
            unrenderRejectStepFunction={unrenderRejectStepFunction}
          /> : null}
        */}
        {/*edit step */}
        {/* {(renderEditStepState && stepIndex != null && activeIndexEditStep === stepIndex)
          ? <EditStep handleChange={handleChangeEditForm} editedStep={editedStep} submitEditedStep={submitEditedStep} step={stepObj} index={stepIndex}/>
          : null}
        */}

        {/*add step*/}
        {/* {(stepActivated && stepIndex !== null && (indexClicked === stepIndex) && !stepObj.suggestedStep && !toggleSuggestedSteps)
          ?
            <AddStepSmart stepIndex={stepIndex} goalDocId={goalDocId}/>
          : null}
        */}
        {/*accept step */}
      </div>
    </div>
  )
  }
  export default OwnStepWithButtons
