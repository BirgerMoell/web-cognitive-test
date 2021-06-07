import React, { Fragment, useEffect, useState } from "react";
import styled, { css } from "styled-components";

const StyledCircle = styled.div`
  border-radius: 100px;
  background-color: lightgrey;
  border: 1px solid black;
  height: 50px;
  width: 50px;
  position: relative;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

let order = [
  "1",
  "A",
  "2",
  "B",
  "3",
  "C",
  "4",
  "D",
  "5",
  "E",
  "6",
  "F",
  "7",
  "G",
];

let orderObj = [
  {
    value: "1",
    x: 100,
    y: 50,
  },
  {
    value: "A",
    x: 300,
    y: 100,
  },
  {
    value: "2",
    x: 100,
    y: 250,
  },
  {
    value: "B",
    x: 400,
    y: 275,
  },
  {
    value: "3",
    x: 300,
    y: 300,
  },
  {
    value: "C",
    x: 250,
    y: 400,
  },
  {
    value: "4",
    x: 400,
    y: 400,
  },
  {
    value: "D",
    x: 500,
    y: 500,
  },
  {
    value: "5",
    x: 500,
    y: 250,
  },
  {
    value: "E",
    x: 600,
    y: 400,
  },
  {
    value: "6",
    x: 400,
    y: 800,
  },
  {
    value: "F",
    x: 700,
    y: 600,
  },
  {
    value: "7",
    x: 650,
    y: 700,
  },
  {
    value: "G",
    x: 800,
    y: 800,
  },
];

export const TrailMaking = () => {
  const mouseMovement = [];
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    init();
  }, []);

  function init() {
    canvas = document.getElementById("can");
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

    let arr = Object.values(orderObj);

    arr.map(
      (item, i) => (
        console.log("the item is", item),
        drawCircle(ctx, item.value, item.x, item.y)
      )
    );
  }

  function drawCircle(ctx, item, left, top) {
    ctx.beginPath();
    ctx.arc(left, top, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.font = "25px Arial";
    ctx.fillText(item, left - 7, top + 10);

    ctx.stroke();
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

  function collission_detection(x, y) {
      console.log("inside collection detection with ", x)
    let arr = Object.values(orderObj);
    let offset = 50

    arr.map(
      (item, i) => (item.x > x-offset && item.x < x+offset && item.y > y-offset && item.y < y+offset
          ? mouseMovement.indexOf(item.value) === -1 ? mouseMovement.push(item.value) : console.log("This item already exists")
          : null
      )
    );

    console.log("the mouse movement is", mouseMovement)


   if (mouseMovement.length === orderObj.length) {
       console.log("we completed the task")
       setCompleted(true)
   }

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
    collission_detection(currX, currY);
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

    if (!completed) {
        return (
            <div>
              <h1>Dra ett streck från 1-A, A-2, 2-b osv.</h1>
              <canvas id="can" width="1200" height="1200"></canvas>
            </div>
          );
    } else {
        return (
            <div>
                <p>We completed the task</p>
            </div>
        )
    }


};

const randomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export const Circle = (props) => {
  console.log("the props are", props);
  const order = [];

  const hoverOnItem = (e) => {
    console.log("we are hovering on item", e);
    console.log("the value is", props.title);
  };

  const onClickItem = (e) => {
    console.log("we are clicking on item", e);
    console.log("the value is", props.title);
    order.push(props.title);
    console.log("the order is", order);
  };

  return (
    <StyledCircle
      left={props.left}
      top={props.top}
      onClick={(e) => onClickItem(e)}
      onMouseOver={(e) => hoverOnItem(e)}
      className={"circle " + props.title}
    >
      <p className="inner-circle-text">{props.title}</p>
    </StyledCircle>
  );
};
