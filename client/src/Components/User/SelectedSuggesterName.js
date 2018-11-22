import React from 'react'
import '../../style/SelectedSuggesterName.css'

const SelectedSuggesterName = (props) => {
  if (props.loggedInUserId) {
    if (props.selectedSuggesterId === props.loggedInUserId) {
      return <h3>steps</h3>
      // return <p>{props.selectedSuggesterName}'s steps </p>
    } else {
  return <p>  {props.selectedSuggesterName}'s suggestions   </p>
  }
} else {
  return null
}
}

export default SelectedSuggesterName
