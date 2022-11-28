import React, { useState, useEffect } from "react";
import { BearerTokenAuthenticator } from "ibm-watson/auth";
import SpeechToTextV1 from "ibm-watson/speech-to-text/v1";
import axios from "axios";
import audiofile from "../audiofile.flac";

// var recognizeMic = require('watson-speech/speech-to-text/recognize-microphone');

const Watson = () => {
  const getToken = async () => {
    try {
      const auth = await axios.get("/auth/watson/token");
      console.log("Printing auth from client: ", auth);
      return auth;
    } catch (err) {
      console.error(err);
    }
    // return await fetch("/auth/watson/token").then((resp) => resp.json());
  };

  // Transcribe file
  const transcribeFile = async () => {
    try {
      const auth = await getToken();
      return transcribe(auth);
    } catch (err) {
      console.error(err);
    }
    // return getToken().then(transcribe);
  };

  const params = {
    audio: audiofile,
    contentType: "audio/flac",
    model: "en-US_BroadbandModel",
    keywords: ["colorado", "tornado", "tornadoes"],
    keywordsThreshold: 0.5,
    maxAlternatives: 3,
    objectMode: true,
  };

  /**
   * Audio file bundled?
   */

  const transcribe = async (credentials) => {
    const speechToText = new SpeechToTextV1({
      authenticator: new BearerTokenAuthenticator({
        bearerToken: credentials.data.accessToken,
      }),
      serviceUrl: credentials.data.url,
    });
    console.log("Printing speechtotext: ", speechToText);
    try {
      const response = await speechToText.recognize(params);
      console.log("Printing response: ", response);
    } catch (err) {
      console.error(err);
    }
    // speechToText.recognize(params).then((response) => {
    //   console.log(JSON.stringify(response.result, null, 2)).catch((err) => {
    //     console.log(err);
    //   });
    // });
  };

  return (
    <div>
      <h2>Placeholder for Watson</h2>
      <div className="file-input">
        <h4>Input file</h4>
        <input type="file" />
        <button onClick={transcribeFile}>Transcribe</button>
      </div>
      <div className="browser-recorder">
        <h4>Click to record</h4>
      </div>
    </div>
  );
};

export default Watson;
