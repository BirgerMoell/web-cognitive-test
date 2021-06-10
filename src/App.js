import React, { Fragment, useEffect, useState } from "react";
import logo from "./kthlogo.png";
import "./App.css";
import Modal from "./Modal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Admin } from "./Admin";
import { TrailMaking } from "./components/TrailMaking";
import { WordRecall } from "./components/WordRecall";
import { AudioText } from "./components/AudioText";
import { ShowCognitiveTests } from "./components/ShowCognitiveTests";
import { Home } from "./Home";

const rememberWords1 = ["Hotell", "Banan", "Mynt"];
const rememberWords2 = ["Hus", "Kanin", "Tåg"];
const rememberWords3 = ["Saft", "Tavla", "Båt"];
const rememberWords4 = ["Häst", "Tidning", "Lök"];
const rememberWords5 = ["Katt", "Äpple", "Sko"];

// things to add
// ANIMALS
// TRAIL MAKING

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

var mediaRecorder;

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
