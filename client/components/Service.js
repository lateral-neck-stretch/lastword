import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import recognizeFile from "watson-speech/speech-to-text/recognize-file";
import recognizeMicrophone from "watson-speech/speech-to-text/recognize-microphone";
import ControlContainer from "./ControlContainer";
import OutputContainer from "./OutputContainer";

const FILE_UPLOAD_ERROR_TITLE = "File upload error";
const FILE_UPLOAD_ERROR_DESCRIPTION =
  "There was a problem trying to read the file.";
const NO_MICROPHONE_TITLE = "No microphone detected";
const NO_MICROPHONE_DESCRIPTION = "Cannot transcribe from microphone.";
const AUDIO_TRANSCRIPTION_ERROR_TITLE = "Audio transcription error";
const AUDIO_TRANSCRIPTION_ERROR_DESCRIPTION =
  "There was an error trying to read the audio data. Please try again.";

export const ServiceContainer = () => {
  const audioWaveContainerRef = useRef(null);
  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const audioAnalyzer = audioContext.createAnalyser();
    this.props.setAnalyzer(audioAnalyzer);
    console.log("Printing state.audioAnalyzer: ", state.audioAnalyzer);
    this.props.setContext(audioContext);
  }, []);

  const parseResults = (data) => {
    if (data.speaker_labels) {
      this.props.setSpeakerLabels(data.speaker_labels);
    } else {
      const { transcript, keywordInfo, resultIndex } = formatStreamData(data);
      this.props.updateResults(keywordInfo, resultIndex, transcript);
    }
  };
  const handleStreamEnd = () => {
    if (state.audioStream) {
      state.audioStream.stop();
    }
    this.props.setTranscribe(false);
    this.props.uploadPlay(false);
    this.props.samplePlay(false);
    this.props.setRecord(false);
  };
  const readAudioFileForVisualization = async (filename) => {
    let containerClientWidth = null;
    if (
      audioWaveContainerRef &&
      audioWaveContainerRef.current &&
      audioWaveContainerRef.current.clientWidth
    ) {
      containerClientWidth = audioWaveContainerRef.current.clientWidth;
    }
    const audioVisualizationWidth = containerClientWidth || 300;

    const isFileType = filename instanceof File;
    try {
      let audioBlob = null;

      if (isFileType) {
        audioBlob = filename;
      } else {
        const audioRequest = await fetch(filename);
        audioBlob = await audioRequest.blob();
      }
      const { reducedFloatArray, duration } =
        await convertAudioBlobToVisualizationData(
          audioBlob,
          state.audioContext,
          audioVisualizationWidth
        );
      this.props.setAudioVisualData(arr, dur);
    } catch (err) {
      console.error(err);
      this.props.setError(
        FILE_UPLOAD_ERROR_TITLE,
        FILE_UPLOAD_ERROR_DESCRIPTION
      );
    }
  };
  const captureAudioFromMicrophone = async (recognizeOptions) => {
    let mediaStream = null;
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
    } catch (err) {
      console.error(err);
      this.props.setError(NO_MICROPHONE_TITLE, NO_MICROPHONE_DESCRIPTION);
    }
    const recognizeMicrophoneStream = recognizeMicrophone({
      ...recognizeOptions,
      mediaStream,
      keepMic: true,
    });
    if (mediaStream) {
      const updatedAudioAnalyzer = state.audioAnalyzer;
      updatedAudioAnalyzer.fttSize = 2048;
      this.props.setAnalyzer(updatedAudioAnalyzer);
      const mediaStreamSource =
        await state.audioContext.createMediaStreamSource(mediaStream);
      await mediaStreamSource.connect(state.audioAnalyzer);
    }
    return recognizeMicrophoneStream;
  };
  const onSubmit = (stream) => {
    stream
      .on("data", (data) => {
        parseResults(data);
      })
      .on("end", () => {
        handleStreamEnd();
      })
      .on("error", () => {
        this.props.setError(
          AUDIO_TRANSCRIPTION_ERROR_TITLE,
          AUDIO_TRANSCRIPTION_ERROR_DESCRIPTION
        );
        handleStreamEnd();
      });

    this.props.setTranscribe(true);
  };
};

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {
  return {
    setAnalyzer: (audioAnalyzer) => {
      dispatch({ audioAnalyzer, type: actionTypes.setAudioAnalyzer });
    },
    setContext: (audioContext) => {
      dispatch({ audioContext, type: actionTypes.setAudioContext });
    },
    setSpeakerLabels: (speaker_labels) => {
      dispatch({
        speakerLabels: speaker_labels,
        type: actionTypes.setSpeakerLabels,
      });
    },
    updateResults: (keywordInfo, resultIndex, transcript) => {
      dispatch({
        keywordInfo,
        resultIndex,
        transcript,
        type: actionTypes.updateResults,
      });
    },
    samplePlay: (bol) => {
      dispatch({
        isSamplePlaying: bol,
        type: actionTypes.setIsSamplePlaying,
      });
    },
    setRecord: (bol) => {
      dispatch({
        isRecording: bol,
        type: actionTypes.setIsRecording,
      });
    },
    setTranscribe: (bol) => {
      dispatch({
        isTranscribing: bol,
        type: actionTypes.setIsTranscribing,
      });
    },
    uploadPlay: (bol) => {
      dispatch({
        isUploadPlaying: bol,
        type: actionTypes.setIsUploadPlaying,
      });
    },
    setAudioVisualData: (arr, dur) => {
      dispatch({
        audioDataArray: arr,
        audioDurationInMs: dur * 1000,
        type: actionTypes.setAudioVisualizationData,
      });
    },
    setError: (title, description) => {
      dispatch({
        error: createError(title, description),
        type: actionTypes.setError,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceContainer);
