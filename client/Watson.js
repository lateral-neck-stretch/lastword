import React, { useState, useEffect, useReducer } from "react";
import { BearerTokenAuthenticator } from "ibm-watson/auth";
import SpeechToTextV1 from "ibm-watson/speech-to-text/v1";
import axios from "axios";
import recognizeFile from "watson-speech/speech-to-text/recognize-file";
import { initialState, ibmReducer } from "./store/ibm";
import ServiceContainer from "./components/Watson/ServiceContainer";

// var recognizeMic = require('watson-speech/speech-to-text/recognize-microphone');

const Watson = () => {
  // const [state, dispatch] = useReducer(ibmReducer, initialState);
  // useEffect(() => {
  //   const audioContext = new (window.AudioContext ||
  //     window.webkitAudioContext)();
  //   const audioAnalyzer = audioContext.createAnalyser();

  //   dispatch({
  //     audioAnalyzer,
  //     type: actionTypes.setAudioAnalyzer,
  //   });
  //   dispatch({
  //     audioContext,
  //     type: actionTypes.setAudioContext,
  //   });
  // }, []);

  // const getToken = async () => {
  //   try {
  //     const auth = await axios.get("/auth/watson/token");
  //     console.log("Printing auth from client: ", auth);
  //     return auth;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const transcribe = async (credentials) => {
  //   const params = {
  //     audio: await getAudio(),
  //     contentType: "audio/flac",
  //   };
  //   const authenticator = new BearerTokenAuthenticator({
  //     bearerToken: credentials.data.accessToken,
  //   });
  //   const speechToText = new SpeechToTextV1({
  //     authenticator,
  //     serviceUrl: credentials.data.url,
  //   });

  //   console.log("Printing speechtotext: ", speechToText);
  //   try {
  //     const response = await speechToText.recognize(params);
  //     console.log("Printing response: ", response);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // // Transcribe file
  // const transcribeFile = async () => {
  //   try {
  //     const auth = await getToken();
  //     console.log("Printing auth: ", auth);
  //     return transcribe(auth);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const parseResults = (data) => {
  //   if (data.speaker_labels) {
  //     dispatch({
  //       speakerLabels: data.speaker_labels,
  //       type: actionTypes.setSpeakerLabels,
  //     });
  //   } else {
  //     const { transcript, keywordInfo, resultIndex } = formatStreamData(data);

  //     dispatch({
  //       keywordInfo,
  //       resultIndex,
  //       transcript,
  //       type: actionTypes.updateResults,
  //     });
  //   }
  // };

  // const onSubmit = (stream) => {
  //   stream
  //     .on("data", (data) => {
  //       parseResults(data);
  //     })
  //     .on("end", () => {
  //       handleStreamEnd();
  //     })
  //     .on("error", () => {
  //       dispatch({
  //         error: createError(
  //           AUDIO_TRANSCRIPTION_ERROR_TITLE,
  //           AUDIO_TRANSCRIPTION_ERROR_DESCRIPTION
  //         ),
  //         type: actionTypes.setError,
  //       });

  //       handleStreamEnd();
  //     });

  //   dispatch({
  //     isTranscribing: true,
  //     type: actionTypes.setIsTranscribing,
  //   });
  // };

  return (
    <div>
      <h2>Placeholder for Watson</h2>
      <ServiceContainer />
    </div>
  );
};

export default Watson;
