import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

export const TimerControl = (props) => {
  return (
    <div id={props.title}>
      <h3>{props.heading}</h3>
      <button id={props.incBtnId} onClick={() => props.onClick('increment', props.title)}><FontAwesomeIcon icon={faArrowUp} /></button>
      <p id={props.label}>{Math.floor(props.time / 60)}</p>
      <button id={props.decBtnId} onClick={() => props.onClick('decrement', props.title)}><FontAwesomeIcon icon={faArrowDown} /></button>
    </div>
  )
}
