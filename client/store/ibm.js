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
const setAudioAnalyzer = (audioAnalyzer) => ({
  type: setAudioAnalyzer,
  audioAnalyzer,
});
const setAudioContext = (audioContext) => ({
  type: setAudioContext,
  audioContext,
});
const setAudioSource = (source) => ({
  type: setAudioSource,
  source,
});
const setAudioStream = (stream) => ({
  type: setAudioStream,
  stream,
});
const setAudioVisualization = (visual) => ({
  type: setAudioVisualization,
  visual,
});
const setError = (err) => ({
  type: setError,
  err,
});
const setSpeakerLabels = (label) => ({
  type: setSpeakerLabels,
  label,
});
const setIsRecording = (isRecording) => ({
  type: setIsRecording,
  isRecording,
});
const setIsSamplePlaying = (isPlaying) => ({
  type: setIsSamplePlaying,
  isPlaying,
});
const setIsTranscribing = (isTranscribing) => ({
  type: setAudioAnalyzer,
  isTranscribing,
});
const setIsUploadPlaying = (upload) => ({
  type: setIsUploadPlaying,
  upload,
});
const updateResults = (result) => ({
  type: updateResults,
  result,
});

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
    case setAudioAnalyzer:
      return { ...state, audioAnalyzer: action.audioAnalyzer };
    case setAudioContext:
      console.log("Printing context test!!");
      return { ...state, audioContext: action.audioContext };
    case setAudioSource:
      return { ...state, source: action.source };
    case setAudioStream:
      return { ...state, stream: action.stream };
    case setAudioVisualization:
      return { ...state, visual: action.visual };
    case setError:
      return action.err;
    case setSpeakerLabels:
      return action.label;
    case setIsRecording:
      return action.isRecording;
    case setIsSamplePlaying:
      return action.isPlaying;
    case setIsTranscribing:
      return action.isTranscribing;
    case setIsUploadPlaying:
      return action.upload;
    case updateResults: {
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
