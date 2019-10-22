import React from 'react'
import '../../style/SelectedSuggesterName.css'

const SelectedSuggesterName = (props) => {
  if (props.loggedInUserId) {
    if (props.selectedSuggesterId === props.loggedInUserId) {
      return <div className="selected-suggester-name"><h4>steps</h4> </div>
      // return <p>{props.selectedSuggesterName}'s steps </p>
    } else {
  return <div className="selected-suggester-name"> <h4>  {props.selectedSuggesterName}'s suggestions </h4> </div>
  }
} else {
  return null
}
}

export default SelectedSuggesterName
