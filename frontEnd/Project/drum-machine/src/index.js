import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

const activeStyle = {
  backgroundColor: "ff8181",
  marginTop: 13,
  boxShadow: "0px 3px #ff8181",
  height: 77,
};

const inactiveStyle = {
  backgroundColor: "white",
  marginTop: 10,
  boxShadow: "3px 3px 5px black",
};

class SetPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setStyle: inactiveStyle,
    };
    this.playSound = this.playSound.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.activateSet = this.activateSet.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeypress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeypress);
  }

  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activateSet();
    setTimeout(() => this.activateSet(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, " "));
  }

  handleKeypress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  activateSet() {
    if (this.props.power) {
      if (this.state.setStyle.backgroundColor === "ff8181") {
        this.setState({
          setStyle: inactiveStyle,
        });
      } else {
        this.setState({
          setStyle: activeStyle,
        });
      }
    } else if (this.state.setStyle.marginTop === 13) {
      this.setStyle({
        setStyle: inactiveStyle,
      });
    } else {
      this.setState({
        setStyle: {
          height: 77,
          marginTop: 13,
          backgroundColor: "white",
          boxShadow: "0 3px white",
        },
      });
    }
  }

  render() {
    return (
      <div className="drum-pad" id={this.props.clipId} onClick={this.playSound} style={this.state.setStyle}>
        <audio className="clip" id={this.props.keyTrigger} src={this.props.clip} /> {this.props.keyTrigger}
      </div>
    );
  }
}

class SetBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let setBank;
    if (this.props.power) {
      setBank = this.props.currentSetBank.map((setObj, i, setBankArr) => {
        return <SetPad clip={setBankArr[i].url} clipId={setBankArr[i].id} keyCode={setBankArr[i].keyCode} keyTrigger={setBankArr[i].keyTrigger} power={this.props.power} updateDisplay={this.props.updateDisplay} />;
      });
    } else {
      setBank = this.props.currentSetBank.map((setObj, i, setBankArr) => {
        return <SetPad clip="#" clipId={setBankArr[i].id} keyCode={setBankArr[i].keyCode} keyTrigger={setBankArr[i].keyTrigger} power={this.props.power} updateDisplay={this.props.updateDisplay} />;
      });
    }
    return <div className="pad-bank">{setBank}</div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      dispay: String.fromCharCode(100),
      currentSetBank: bankOne,
      currentSetBankId: "Heater Kit",
      sliderVal: 0.3,
    };
    this.displayClipName = this.displayClipName.bind(this);
    this.selectSet = this.selectSet.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.powerControl = this.powerControl.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }

  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name,
      });
    }
  }

  selectSet() {
    if (this.state.power) {
      if (this.state.currentSetBankId === "Heater Kit") {
        this.setState({
          currentSetBank: bankTwo,
          display: "Smooth Piano Kit",
          currentSetBankId: "Smooth Piano Kit",
        });
      } else {
        this.setState({
          currentSetBank: bankOne,
          display: "Heater Kit",
          currentSetBankId: "Heater Kit",
        });
      }
    }
  }

  adjustVolume(e) {
    if (this.state.power) {
      this.setState({
        sliderVal: e.target.value,
        display: `Volume: ${Math.round(e.target.value * 100)}`,
      });
      setTimeout(() => this.clearDisplay(), 1000);
    }
  }

  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160),
    });
  }

  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160),
    });
  }

  render() {
    const powerSlider = this.state.power ? { float: "right" } : { float: "left" };
    const setSlider = this.state.currentSetBank === bankOne ? { float: "left" } : { float: "right" };
    {
      const clips = [].slice.call(document.getElementsByClassName("clip"));

      clips.forEach((clip) => {
        clip.volume = this.state.sliderVal;
      });
    }
    return (
      <div className="inner-container" id="drum-machine">
        <SetBank clipVolume={this.state.sliderVal} currentSetBank={this.state.currentSetBank} power={this.state.power} updateDisplay={this.displayClipName} />
        <div className="logo">
          <div className="inner-logo">{`AR Drum Machine ${String.fromCharCode(160)}`}</div>
        </div>

        <div className="controls-container">
          <div className="control">
            <p>Power</p>
            <div className="select" onClick={this.powerControl}>
              <div className="inner" style={powerSlider}></div>
            </div>
          </div>
          <p id="display">{this.state.display}</p>
          <div className="volume-slider">
            <input type="range" max="1" min="0" step="0.01" onChange={this.adjustVolume} value={this.state.sliderVal} />
          </div>
          <div className="control">
            <p>Set</p>
            <div className="select" onClick={this.selectSet}>
              <div className="inner" style={setSlider}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
