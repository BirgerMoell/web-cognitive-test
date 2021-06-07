import React, { Fragment, useEffect } from "react";

let serverUrl = "http://127.0.0.1:8000";
let mediaRecorder;
var preview = document.createElement("audio");
preview.controls = true;

export const Admin = () => {
  const [audio, setAudio] = React.useState(false);
  const chunks = [];

  const sendToServer = async () => {
    const data = {
      diagnosis: 0,
      cognition: 2,
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

  const sendAudioToServer = async () => {
    await stopMicrophone();
    console.log("the chunks are ", chunks);

    const blob = new Blob(chunks, {'type': 'audio/webm;codecs=opus'});
    console.log("the blob is", blob);


    // const data = {
    //   audio: blob,
    //   timeStamp: new Date(),
    // };

    // console.log("the data is", data);

    var fd = new FormData();
    fd.append('file', blob, 'file');

    console.log("the form is", fd)


    let response = await fetch(serverUrl + "/upload_audio/", {
      method: "POST",
      body: fd,
    });

    console.log("the response is", response);

    let responseJson = await response.json();
    console.log("the response audio is", responseJson);
  };

  const startRecording = async () => {
    console.log("we are recording");
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    mediaRecorder = new MediaRecorder(audioStream);
    mediaRecorder.start(500);
    mediaRecorder.ondataavailable = function (e) {
      console.log("the mediarecorder data is ", e.data);
      var data = e.data;
      chunks.push(data);
    };
  };

  const stopMicrophone = async () => {
    mediaRecorder.stop();
  };

  return (
    <div>
      <div onClick={() => sendToServer()}>This is the admin page</div>

      <button onClick={() => startRecording()}>Start recording</button>

      <button onClick={() => sendAudioToServer()}>Send audio to server</button>
    </div>
  );
};
