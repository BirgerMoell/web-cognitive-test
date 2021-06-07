import React, { Fragment, useEffect, useState } from "react";
import logo from "./kthlogo.png";
import "./App.css";
import Modal from "./Modal";
import { AudioForm } from "./AudioForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Admin } from "./Admin";
import useSound from "use-sound";
import mocaSpeech from "./moca_words.m4a";
import speech from "./moca_words.mp3";
import { TrailMaking } from "./TrailMaking"

const rememberWords1 = ["Hotell", "Banan", "Mynt"];
const rememberWords2 = ["Hus", "Kanin", "Tåg"];
const rememberWords3 = ["Saft", "Tavla", "Båt"];
const rememberWords4 = ["Häst", "Tidning", "Lök"];
const rememberWords5 = ["Katt", "Äpple", "Sko"];

const mocaWords = ["Stol", "Plånbok", "Tång", "Munspel", "Sax"];

let phrases = [
  {
    header: "Läs meningen exakt som den sägs",
    text: "Katten gömde sig alltid under soffan när det var hundar i rummet",
  },
  {
    header: "Läs meningen exakt som den sägs",
    text: "Jag vet att det är Johan som ska få hjälp idag",
  },
  {
    header: "Säg så många ord som du kan som börjar på F",
    text: "",
  },
];

// things to add
// ANIMALS
// TRAIL MAKING


const WordRecall = () => {
  const [play] = useSound(mocaSpeech);
  const [startTime, setStartTime] = useState("")

  useEffect(() => {
    var audio = new Audio(speech);
    audio.play();
    let startTime = new Date().getTime()
    console.log("the startime was " + startTime)
    setStartTime(startTime);

    const interval = setInterval(() => {
      checkTime();
    }, 1000);
    return () => {
      console.log(`clearing interval`);
      clearInterval(interval);
    };
  }, []);

  function timeDiff( tstart, tend ) {
    var diff = Math.floor((tend - tstart) / 1000), units = [
      { d: 60, l: "seconds" },
      { d: 60, l: "minutes" },
      { d: 24, l: "hours" },
      { d: 7, l: "days" }
    ];
  
    var s = '';
    for (var i = 0; i < units.length; ++i) {
      s = (diff % units[i].d) + " " + units[i].l + " " + s;
      diff = Math.floor(diff / units[i].d);
    }
    return s;
  }


  const checkTime = () => {
    let currentTime = new Date().getTime();
    console.log("we are checking time at", currentTime)
    console.log("the start time was", startTime)
    let difference = timeDiff(startTime, currentTime)
    console.log("the difference was", difference)

  }

  const playSound = () => {
    console.log("playing a sound");
    // var audio = new Audio("moca_words.m4a");
    // audio.play();
  };

  return (
    <div onClick={() => playSound} className="Word-recall-header">
      {mocaWords.map((word, i) => (
        <p key={i}>{word}</p>
      ))}
      <audio controls src={speech} type="audio/mp3" controls="controls">

      </audio>
    </div>
  );
};

function Header() {
  return (
    <div className="Logo-header">
      <img src={logo} width="100px" alt="logo" />
    </div>
  );
}

function IntroText() {
  return (
    <Fragment>
      {" "}
      <h3>Ge oss din röst</h3>
      <p>
        Var del i vårt forskningsprojekt om röst och kognition.
        <hr />
        Studien bedrivs vid Tal Musik Hörsel på KTH <br />
        med målsättning är förbättra diagnostik vid Alzheimer
      </p>
    </Fragment>
  );
}

function AudioText(props) {
  const [counter, setCounter] = React.useState(0);
  const [phrase, setPhrase] = React.useState({
    header: "Läs meningen exakt som den sägs",
    text: "Katten gömde sig alltid under soffan när det var hundar i rummet",
  });
  const [completed, setCompleted] = React.useState(false);

  console.log("the audio is", props.recorded);

  useEffect(() => {
    if (!completed) {
      const interval = setInterval(() => {
        console.log("counter is", counter);
        console.log("completed is", completed);
        if (counter >= props.phrases.length - 1) {
          console.log("INSIDE COMPLETED");
          setCompleted(true);
          props.stopMicrophone(props.mediaRecorder);
        } else {
          setCounter(counter + 1);
        }
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [counter, completed]);

  return completed ? (
    <AudioForm recorded={props.recorded} />
  ) : (
    <Fragment>
      <h3>{props.phrases && props.phrases[counter].header}</h3>
      <p> {props.phrases[counter].text}</p>
    </Fragment>
  );
}

var mediaRecorder;

function Home() {
  const [open, setOpen] = React.useState(false);
  const [audio, setAudio] = React.useState(false);
  const [recorded, setRecorded] = React.useState(false);
  const [wordRecall, setWordRecall] = React.useState(true);
  const [startTime, setStartTime] = React.useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStartTime(new Date(Date.now()));
    toggleMicrophone();
  };

  const toggleMicrophone = () => {
    console.log("toggling the microphone");
    if (audio) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  };

  const stopMicrophone = (mediaRecorder) => {
    audio.getTracks().forEach((track) => track.stop());
    console.log("STOPPING THE audio", audio);
    mediaRecorder.stop();
    setAudio(audio);
  };

  const getMicrophone = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    mediaRecorder = new MediaRecorder(audio);
    mediaRecorder.start();
    mediaRecorder.ondataavailable = function (e) {
      console.log("the mediarecorder data is called with", e);
      var url = URL.createObjectURL(e.data);
      var preview = document.createElement("audio");
      preview.controls = true;
      preview.src = url;
      document.body.appendChild(preview);
      // uncomment to play the audio
      //preview.play();
    };
    setAudio(audio);
  };

  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Header />

          {!open && wordRecall ? (
            <WordRecall />
          ) : (
            <AudioText
              mediaRecorder={mediaRecorder}
              readingTime={process.env.READING_TIME}
              recorded={audio}
              stopMicrophone={stopMicrophone}
              phrases={phrases}
            />
          )}
        </header>
      </div>

      <Modal open={open} handleClose={handleClose} handleOpen={handleOpen} />
    </React.Fragment>
  );
}

const About = () => {
  return <div>This is the about page</div>;
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/wordrecall">
          <WordRecall />
        </Route>

        <Route path="/trailmaking">
          <TrailMaking />
        </Route>


        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
