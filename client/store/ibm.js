/**
 * ACTION TYPES
 */
export const actionTypes = {
  setAudioAnalyzer: "SET_AUDIO_ANALYZER",
  setAudioContext: "SET_AUDIO_CONTEXT",
  setAudioSource: "SET_AUDIO_SOURCE",
  setAudioStream: "SET_AUDIO_STREAM",
  setAudioVisualizationData: "SET_AUDIO_VISUALIZATION_DATA",
  setError: "SET_ERROR",
  setSpeakerLabels: "SET_SPEAKER_LABELS",
  setIsRecording: "SET_IS_RECORDING",
  setIsSamplePlaying: "SET_IS_SAMPLE_PLAYING",
  setIsTranscribing: "SET_IS_TRANSCRIBING",
  setIsUploadPlaying: "SET_IS_UPLOAD_PLAYING",
  updateResults: "UPDATE_RESULTS",
};

/**
 * ACTION CREATORS
 */
export const setAudioAnalyzer = (audioAnalyzer) => {
  return {
    type: setAudioAnalyzer,
    audioAnalyzer,
  };
};
export const setAudioContext = (audioContext) => {
  return {
    type: setAudioContext,
    audioContext,
  };
};
export const setAudioSource = (source) => {
  return {
    type: setAudioSource,
    source,
  };
};
export const setAudioStream = (stream) => {
  return {
    type: setAudioStream,
    stream,
  };
};
export const setAudioVisualization = (audioDataArray, audioDurationInMs) => {
  return {
    type: setAudioVisualization,
    audioDataArray,
    audioDurationInMs,
  };
};
export const setError = (err) => {
  return {
    type: setError,
    err,
  };
};
export const setSpeakerLabels = (label) => {
  return {
    type: setSpeakerLabels,
    label,
  };
};
export const setIsRecording = (isRecording) => {
  return {
    type: setIsRecording,
    isRecording,
  };
};
export const setIsSamplePlaying = (isPlaying) => {
  return {
    type: setIsSamplePlaying,
    isPlaying,
  };
};
export const setIsTranscribing = (isTranscribing) => {
  return {
    type: setAudioAnalyzer,
    isTranscribing,
  };
};
export const setIsUploadPlaying = (upload) => {
  return {
    type: setIsUploadPlaying,
    upload,
  };
};
export const updateResults = (result) => {
  return {
    type: updateResults,
    result,
  };
};

/**
 * THUNK CREATORS
 */

// Initial state
export const initialState = {
  audioAnalyzer: {},
  audioContext: null,
  audioDataArray: [],
  audioDurationInMs: 0,
  audioSource: "",
  audioStream: null,
  error: null,
  isRecording: false,
  isSamplePlaying: false,
  isTranscribing: false,
  isUploadPlaying: false,
  keywordInfo: [],
  speakerLabels: [],
  transcript: [],
};

/**
 * REDUCER
 */
export const ibmReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUDIO_ANALYZER":
      return { ...state, audioAnalyzer: action.audioAnalyzer };
    case "SET_AUDIO_CONTEXT":
      return { ...state, audioContext: action.audioContext };
    case "SET_AUDIO_SOURCE":
      return { ...state, source: action.source };
    case "SET_AUDIO_STREAM":
      return { ...state, stream: action.stream };
    case "SET_AUDIO_VISUALIZATION_DATA":
      return { ...state, visual: action.visual };
    case "SET_ERROR":
      return action.err;
    case "SET_SPEAKER_LABELS":
      return action.label;
    case "SET_IS_RECORDING":
      return action.isRecording;
    case "SET_IS_SAMPLE_PLAYING":
      return action.isPlaying;
    case "SET_IS_TRANSCRIBING":
      return action.isTranscribing;
    case "SET_IS_UPLOAD_PLAYING":
      return action.upload;
    case "UPDATE_RESULTS": {
      let updatedTranscript = [...state.transcript];
      if (action.resultIndex === 0) {
        updatedTranscript = action.transcript;
      } else {
        updatedTranscript[action.resultIndex] = action.transcript[0];
      }

      return {
        ...state,
        keywordInfo: action.keywordInfo,
        transcript: updatedTranscript,
      };
    }
    default:
      return state;
  }
};
