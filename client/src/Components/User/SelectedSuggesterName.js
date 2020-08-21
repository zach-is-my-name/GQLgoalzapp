import React from 'react'
import '../../style/SelectedSuggesterName.css'

const SelectedSuggesterName = ({loggedInUserId, selectedSuggesterId, targetUserId, suggesters, suggestersIndex}) => {

  if (loggedInUserId) {
    if (loggedInUserId === targetUserId && selectedSuggesterId !== loggedInUserId && suggesters.length) {
      return <div className="selected-suggester-name"> <h4> {suggesters[suggestersIndex].userName}'s suggestions </h4> </div>
    } else {
      return <div className="selected-suggester-name"><h4>steps</h4> </div>
  }
} else {
  return null
}
}

export default SelectedSuggesterName
