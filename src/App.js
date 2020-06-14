import React, { Component } from 'react';
import './App.css';
import { TimerDisplay } from './components/TimerDisplay';
import { TimerControl } from './components/TimerControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedo, faSync } from '@fortawesome/free-solid-svg-icons';

//declare the timer interval
let timerInterval

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'timer',
      isRunning: false,
      runInterval: 25 * 60,
      breakInterval: 5 * 60,
      currentRunTime: 25 * 60,
      currentBreakTime: 5 * 60
    }
    this.handlePlay = this.handlePlay.bind(this);
    this.decrementTime = this.decrementTime.bind(this);
  }

  toggleDisplay = () => {
    // toggles between controlling & displaying the break time and run time
    this.setState({
      display: this.state.display === 'timer' ? 'break' : 'timer'
    });
  }

  reset = () => {
    // resets the break interval
    this.setState({
      currentRunTime: 25 * 60,
      currentBreakTime: 5 * 60,
      runInterval: 25 * 60,
      breakInterval: 5 * 60,
      display: 'timer',
      isRunning: false
    })
    clearInterval(timerInterval);
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0
  }

  handleControl = (direction, control) => {
    // change interval assuming interval does not go to 0 after change
    if (control === 'session-label' 
    && (this.state.runInterval - 60 > 0 || direction === 'increment')
    && (this.state.runInterval + 60 < 3660 || direction === 'decrement')) {
      this.setState ({
        runInterval: this.state.runInterval + (direction === 'increment' ? 60 : -60),
        currentRunTime: this.state.currentRunTime + (direction === 'increment' ? 60 : -60)
      });
    }
    if (control === 'break-label' 
    && (this.state.breakInterval - 60 > 0 || direction === 'increment')
    && (this.state.breakInterval + 60 < 3660 || direction === 'decrement')) {
      this.setState({
        breakInterval: this.state.breakInterval + (direction === 'increment' ? 60 : -60),
        currentBreakTime: this.state.currentBreakTime + (direction === 'increment' ? 60 : -60)
      }); 
    }
  }

  handlePlay() {
    if (this.state.isRunning) {
      clearInterval(timerInterval);
    } else {
      timerInterval = setInterval(this.decrementTime, 1000);
      this.setState({
        display: 'timer'
      })
    }
    this.setState({
      isRunning: !this.state.isRunning
    });
  }

  decrementTime() {
    // runs the clock down when the play/pause button is pressed
    this.state.display === 'timer' ? 
    this.setState ({
      currentRunTime: this.state.currentRunTime -1
    }) : 
    this.setState({
      currentBreakTime: this.state.currentBreakTime -1
    })
    // switch between break & timer & set to the interval
    if (this.state.currentRunTime < 0) {
      this.setState({
        display: 'break',
        currentRunTime: this.state.runInterval
      });
      document.getElementById('beep').play();
    }
    if (this.state.currentBreakTime < 0) {
      this.setState({
        display: 'timer',
        currentBreakTime: this.state.breakInterval
      });
      document.getElementById('beep').play();
    }
  }

  convertToTime = (secs) => {
    //converts time in seconds to X:XX format for display
    let minutes = Math.floor(secs / 60);
    let seconds = secs % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    return `${minutes}:${seconds}`;
  }

  render() {
    return (
      <div id="timerDisplay" className="timer-display">
        <h1 id='title'>Relay Timer</h1>
        <div className="control-display">
          <TimerControl 
          heading={'session length'}
          incBtnId={'session-increment'}
          decBtnId={'session-decrement'}
          label={'session-length'}
          title={'session-label'}
          time={this.state.runInterval}
          onClick={this.handleControl} />
          <TimerControl 
          heading={'break length'}
          incBtnId={'break-increment'}
          decBtnId={'break-decrement'}
          label={'break-length'}
          title={'break-label'}
          time={this.state.breakInterval}
          onClick={this.handleControl} />
        </div>
        <TimerDisplay 
        display={this.state.display} 
        running={this.state.isRunning}
        runTime={this.convertToTime(this.state.currentRunTime)}
        breakTime={this.convertToTime(this.state.currentBreakTime)} />
        <div className="button-row">
          <button id="start_stop" onClick={this.handlePlay}><FontAwesomeIcon icon={faPlay} /> <FontAwesomeIcon icon={faPause} /></button>
          <button id="reset" onClick={this.reset}><FontAwesomeIcon icon={faRedo} /></button>
          <button onClick={this.toggleDisplay}><FontAwesomeIcon icon={faSync} /></button>
        </div>
        <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
    )
  }
}