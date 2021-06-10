import React, { Fragment, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import cube from "../neckercube.png"
import { AudioForm } from "./AudioForm"

export const CubeMaking = (props) => {
    const mouseMovement = [];

    const [completed, setCompleted] = useState(false)

    useEffect(() => {
      init();
    }, []);
  
    function init() {
      canvas = document.getElementById("cube")
      ctx = canvas.getContext("2d");
      let w = canvas.width;
      let h = canvas.height;
  
      canvas.addEventListener(
        "mousemove",
        function (e) {
          findxy("move", e);
        },
        false
      );
      canvas.addEventListener(
        "mousedown",
        function (e) {
          findxy("down", e);
        },
        false
      );
      canvas.addEventListener(
        "mouseup",
        function (e) {
          findxy("up", e);
        },
        false
      );
      canvas.addEventListener(
        "mouseout",
        function (e) {
          findxy("out", e);
        },
        false
      );
     
  
    }
  

  
    function draw() {
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, currY);
      ctx.strokeStyle = x;
      ctx.lineWidth = y;
      ctx.stroke();
      ctx.closePath();
    }
  

  
    function findxy(res, e) {
      if (res == "down") {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
  
        flag = true;
        dot_flag = true;
        if (dot_flag) {
          ctx.beginPath();
          ctx.fillStyle = x;
          ctx.fillRect(currX, currY, 2, 2);
          ctx.closePath();
          dot_flag = false;
        }
      }
      if (res == "up" || res == "out") {
        flag = false;
      }
      if (res == "move") {
        if (flag) {
          prevX = currX;
          prevY = currY;
          currX = e.clientX - canvas.offsetLeft;
          currY = e.clientY - canvas.offsetTop;
          draw();
        }
      }
    }
  
    const moveOn = () => {
      setCompleted(true)
      console.log("we are moving on")
    }
  
    var canvas,
      ctx,
      flag = false,
      prevX = 0,
      currX = 0,
      prevY = 0,
      currY = 0,
      dot_flag = false;
  
    var x = "black",
      y = 2;
          if (!completed)
          return (
              <div>
                  <img style={{"padding": "25px"}} width="600" height="600" src={cube}></img>
  
                  <canvas id="cube" width="600" height="600"></canvas>
                  <div style={{"display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column"}}>
                  <p style={{"text-align": "center"}} >Rita en kub lik den som du ser på vänster sida</p>
                  <button onClick={() => moveOn()}>Gå vidare</button>
                  </div>
              </div>
          )
          else {
            return <AudioForm recorded={props.recorded} />
          }
      
}
