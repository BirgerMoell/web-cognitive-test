import React, { Fragment, useEffect } from 'react';
import microphone from './microphone.svg';
import logo from './kthlogo.png'
import './App.css';
import Button from '@material-ui/core/Button';
import Modal from './Modal';
import VoiceRecorder from './VoiceRecorder';
import Microphone from './Microphone'
import { AudioForm } from './AudioForm'
 
let phrases = [{
  "header": "Läs meningen exakt som den sägs",
  "text": "Katten gömde sig alltid under soffan när det var hundar i rummet"
}, {
  "header": "Läs meningen exakt som den sägs",
  "text": "Jag vet att det är Johan som ska få hjälp idag"
},{
  "header": "Säg så många ord som du kan som börjar på F",
  "text": ""
}
]

function Header() {
  return (

    <div className="Logo-header">
      <img src={logo} width="100px" alt="logo" />
    </div>

  )
}

function IntroText() {
  return (
    <Fragment>  <h3>
      Ge oss din röst
</h3>

      <p>Var del i vårt forskningsprojekt om röst och kognition.<hr />
Studien bedrivs vid Tal Musik Hörsel på KTH <br />med målsättning är förbättra diagnostik vid Alzheimer

</p>
    </Fragment>)
}

function AudioText(props) {

  const [counter, setCounter] = React.useState(0)
  const [phrase, setPhrase] = React.useState({
    "header": "Läs meningen exakt som den sägs",
    "text": "Katten gömde sig alltid under soffan när det var hundar i rummet"
  })
  const [completed, setCompleted] = React.useState(false)
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (!completed) {
    const interval = setInterval(() => {
      console.log("counter is", counter)
      console.log("completed is", completed)
      if (counter >= props.phrases.length -1) {
        console.log("INSIDE COMPLETED")
        setCompleted(true)
        props.stopMicrophone()
      } else {
        setCounter(counter + 1)
      }
    }, 15000);
    return () => clearInterval(interval);
    }
  }, [counter, completed]);

  return (

    completed ?
      <AudioForm recorded={props.recorded}/>
     : 
      <Fragment>
        <h3>
          {props.phrases && props.phrases[counter].header}
        </h3>
        <p> {props.phrases[counter].text}
        </p>  
        </Fragment>
  )
}

function App() {

  const startRecording = () => {
    alert("Recording the voice")
  }

  const [open, setOpen] = React.useState(true);
  const [audio, setAudio] = React.useState(false);
  const [recorded, setRecorded] = React.useState(false);
  const [startTime, setStartTime] = React.useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStartTime(new Date(Date.now()))
    toggleMicrophone()
  };

  const toggleMicrophone = () => {
    console.log("toggling the microphone")
    if (audio) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  }

  const stopMicrophone =() => {
    audio.getTracks().forEach(track => track.stop());
    setRecorded(audio)
    setAudio(null)
  }

  const getMicrophone = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    setAudio(audio)
  }

  return (
    <React.Fragment>

      <div className="App">
        <header className="App-header">
          <Header />

          {!open && <AudioText recorded={recorded} stopMicrophone={stopMicrophone} phrases={phrases} />}

          {/* <Microphone /> */}
          

        </header>

      </div>

      <Modal open={open} handleClose={handleClose} handleOpen={handleOpen} />

    </React.Fragment>

  );
}

export default App;
