import React, { Fragment, useEffect, useRef } from 'react';
import logo from './kthlogo.png'
import Button from './Button';

export function AudioForm(props) {

    const [diagnosis, setDiagnosis] = React.useState('');
    const [cognition, setCognition] = React.useState('');
    const [answered, setAnswered] = React.useState(false);
    const userMedia = useRef(null);

    const sendAnswersToServer = () => {
        console.log("diagnosis", diagnosis)
        console.log("cognition", cognition)
        console.log("recorded is", props.recorded)
        setAnswered(true)
        playAudio(props.recorded)
    }

    const playAudio = (stream) => {
        console.log("usermedia is", userMedia)
        // userMedia.current.src = stream
        // userMedia.current.focus()
        // userMedia.current.play();
    }

    return (
        answered ? <div className="AudioForm-container">
            <p>Tack för att du var med i vår undersökning. Tipsa gärna flera att vara med i vår studie.</p>

            <img src={logo} width="150px" alt="logo" />

            <p>Hör av dig till bmoell@kth.se om du har några frågor kring studien.</p>
            <audio ref={userMedia} src={props.recorded} autoPlay id="user-media"></audio>

        </div> :

            <div className="AudioForm-container">

                <label for="diagnos">Har du en diagnos av en kognitiv nedsättning</label>
                <br></br>
                <select onChange={(event) => setDiagnosis(event.target.value)} name="diagnos" id="diagnos">
                    <option value="0">Ingen diagnos</option>
                    <option value="1">MCI</option>
                    <option value="2">Alzheimer</option>
                </select>

                <hr></hr>

                <label for="cognition">Anser du själv att du har kognitiva svårigheter</label>
                <select onChange={(event) => setCognition(event.target.value)} name="diagnos" id="diagnos">
                    <option value="0">Inga kognitiva svårigheter</option>
                    <option value="1">Vissa kognitiva svårigherer</option>
                    <option value="2">Allvarliga kognitiva svårigheter</option>
                    <option value="2">Mycket Allvarliga kognitiva svårigheter</option>
                </select>

                <hr></hr>

                {/* <div>Ange en mail-adress (frivilligt) om du vill bli kontaktad för en uppföljning</div>
       */}

                <Button onClick={sendAnswersToServer} text={"Skicka in dina svar"} />


            </div>



    )

}
