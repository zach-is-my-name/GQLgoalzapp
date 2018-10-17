/* eslint-disable */
import React, {Component} from 'react';
import ForeignStepWithButtons from './ForeignStepWithButtons.js'
import {SortableElement} from 'react-sortable-hoc';

const ForeignStep = SortableElement((props) => {
    return (
      <div>
        <ForeignStepWithButtons {...props} />
      </div>
        )
    })

export default ForeignStep
