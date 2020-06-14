import React from 'react'

export const TimerDisplay = (props) => {
  return (
    <div id='display'>
      <h3 id="timer-label">{props.display}</h3>
      <p id="time-left">{props.display === 'timer' ? props.runTime : props.breakTime}</p>
    </div>
  )
}
