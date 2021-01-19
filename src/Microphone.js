import React from 'react';
import Button from './Button';

export default class Microphone extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      audio: null
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }

    async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

    stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
      console.log("the audio is", this.state.audio)
    } else {
      this.getMicrophone();
    }
  }

//   playAudio(stream) {
//     audioSourceNode = audioContext.createMediaStreamSource(stream);
//   }

  render() {
    return (
      <div className="Microphone">
        <main>
          <div className="controls">

    
          <Button onClick={this.toggleMicrophone} text={this.state.audio ? 'Stop Recording' : 'Start Recording'}/>

          </div>
        </main>
      </div>
    );
  }
}

