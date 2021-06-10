import React, { Fragment, useEffect, useRef } from "react";
import logo from "../kthlogo.png";
import Button from "./Button";

let serverUrl = "http://127.0.0.1:8000";

export function AudioForm(props) {
  const [diagnosis, setDiagnosis] = React.useState("");
  const [cognition, setCognition] = React.useState("");
  const [answered, setAnswered] = React.useState(false);
  const userMedia = useRef(null);

  const sendAnswersToServer = () => {
    // console.log("diagnosis", diagnosis)
    // console.log("cognition", cognition)
    // console.log("recorded is", props.recorded)
    setAnswered(true);

    console.log("the recorded file is", props.recorded);
    //playAudio(props.recorded)

    sendToServer();
  };

  const sendAudioToServer = async () => {
    const data = {
      diagnosis: diagnosis,
      cognition: cognition,
      timeStamp: new Date(),
    };

    let response = await fetch(serverUrl + "/upload_answer/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("the response is", response);

    let responseJson = await response.json();
    console.log("the response json is", responseJson);
  };

  const sendToServer = async () => {
    const data = {
      diagnosis: diagnosis,
      cognition: cognition,
      timeStamp: new Date(),
    };

    let response = await fetch(serverUrl + "/upload_answer/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("the response is", response);

    let responseJson = await response.json();
    console.log("the response json is", responseJson);
  };

  const playAudio = (stream) => {
    console.log("stream is", stream);
    console.log("usermedia is", userMedia);
    const audioFile = document.createElement("audio");
    audioFile.src = "";
    audioFile.srcObject = stream;
    audioFile.play();
    console.log("the audiofile is", audioFile);
  };

  return answered ? (
    <div className="AudioForm-container">
      <p>
        Tack för att du var med i vår undersökning. Tipsa gärna flera att vara
        med i vår studie.
      </p>

      <img src={logo} width="150px" alt="logo" />

      <p>Hör av dig till bmoell@kth.se om du har några frågor kring studien.</p>
      {/* <audio ref={userMedia} src={props.recorded} autoPlay id="user-media"></audio> */}
    </div>
  ) : (
    <div className="AudioForm-container">
      <label for="diagnos">Har du en diagnos av en kognitiv nedsättning</label>
      <br></br>
      <select
        onChange={(event) => setDiagnosis(event.target.value)}
        name="diagnos"
        id="diagnos"
      >
        <option value={0}>Ingen diagnos</option>
        <option value={1}>MCI</option>
        <option value={2}>Alzheimer</option>
      </select>

      <hr></hr>

      <label for="cognition">
        Anser du själv att du har kognitiva svårigheter
      </label>
      <select
        onChange={(event) => setCognition(event.target.value)}
        name="diagnos"
        id="diagnos"
      >
        <option value={0}>Inga kognitiva svårigheter</option>
        <option value={1}>Vissa kognitiva svårigherer</option>
        <option value={2}>Allvarliga kognitiva svårigheter</option>
        <option value={3}>Mycket Allvarliga kognitiva svårigheter</option>
      </select>

      <hr></hr>

      <label for="cognition">
        Vad är ditt kön
      </label>
      <select
        onChange={(event) => setCognition(event.target.value)}
        name="diagnos"
        id="diagnos"
      >
        <option value={0}>Man</option>
        <option value={1}>Kvinna</option>
        <option value={2}>Icke-Binär</option>
      </select>

      <hr></hr>

      <label for="cognition">
        Vad är din ålder
      </label>
      <input></input>

      <hr></hr>

      <label for="cognition">
        Vad är din utbildning-nivå
            </label>
      <select
        onChange={(event) => setCognition(event.target.value)}
        name="diagnos"
        id="diagnos"
      >
        <option value={0}>Upp till 9 år (mindre än grundskola, årskurs 9)</option>
        <option value={1}>Upp till 12 år (mindre än gymnasium, årskurs 12)</option>
        <option value={2}>Efergymnasial utbildning, mindre än 3 år</option>
        <option value={2}>Efergymnasial utbildning, längre än 3 år</option>
      </select>

      <hr></hr>


      {/* <div>Ange en mail-adress (frivilligt) om du vill bli kontaktad för en uppföljning</div>
       */}

      <Button
        onClick={() => sendAnswersToServer()}
        text={"Skicka in dina svar"}
      />
    </div>
  );
}
