import React, { Fragment, useEffect, useState } from "react";
import logo from "./kthlogo.png";
import "./App.css";
import Modal from "./Modal";
import { WordRecall } from "./components/WordRecall"
import { AudioText } from "./components/AudioText"
import { ShowCognitiveTests } from "./components/ShowCognitiveTests"



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
    header: "Räkna upp så många djur som du kan",
    text: "",
  },
];

let smallPhrase = [
  {
    header: "Säg namnet på så många djur som du kan på 60 sekunder.",
    text: "",
  },
  {
    header: "Kom ihåg orden som visas upp",
    text: "Stol, Plånbok Tång Munspel Sax",
  },
  {
    header: "Säg de fem orden som visades upp ",
    text: "",
  },
]

function Header() {
  return (
    <div className="Logo-header">
      <img src={logo} width="100px" alt="logo" />
    </div>
  );
}


var mediaRecorder;

export function Home() {

  const [open, setOpen] = React.useState(true);
  const [audio, setAudio] = React.useState(false);
  const [recorded, setRecorded] = React.useState(false);
  const [wordRecall, setWordRecall] = React.useState(false);
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
      console.log("we are getting the microphone")
      getMicrophone();
    }
  };

  const stopMicrophone = (mediaRecorder) => {
    console.log("audio is", audio)

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
    console.log("the audio in get audio is", audio)
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
      preview.play();
    };
    setAudio(audio);
  }

    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <Header />

            {/* <ShowCognitiveTests/> */}
  
            {!open && wordRecall ? (
              <WordRecall />
            ) : !open ? (
              <AudioText
                mediaRecorder={mediaRecorder}
                readingTime={process.env.READING_TIME}
                recorded={audio}
                stopMicrophone={stopMicrophone}
                phrases={smallPhrase}
              />
            ) : null}
          </header>
        </div>
  
        <Modal open={open} handleClose={() => handleClose()} handleOpen={() => handleOpen()} />
      </React.Fragment>
    );
  }