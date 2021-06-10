import React, { Fragment, useEffect, useState } from "react";
import useSound from "use-sound";
import mocaSpeech from "../moca_words.m4a";
import speech from "../moca_words.mp3";

const mocaWords = ["Stol", "Plånbok", "Tång", "Munspel", "Sax"];

export const WordRecall = () => {
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
  }