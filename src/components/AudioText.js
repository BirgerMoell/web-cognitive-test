import React, { Fragment, useEffect, useState } from "react";
import { AudioForm } from "./AudioForm";
import { TrailMaking } from "./TrailMaking"

export function AudioText(props) {

    const [counter, setCounter] = React.useState(0);
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
        }, 5000);
        return () => clearInterval(interval);
      }
    }, [counter, completed]);
  
    return completed ? (
      <TrailMaking recorded={props.recorded} />
    ) : (
      <Fragment>
        <h3>{props.phrases && props.phrases[counter].header}</h3>
        <p> {props.phrases[counter].text}</p>
      </Fragment>
    );
  }