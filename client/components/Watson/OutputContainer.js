import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Button, FormGroup, Tile } from "@carbon/react";
import fetch from "isomorphic-fetch";
import AudioWave from "./AudioWave";
import TranscriptBox from "./TranscriptBox";
import { setTranscript } from "../../store/watson";

export const OutputContainer = ({
  audioAnalyzer,
  audioDataArray,
  audioDuration,
  audioSource,
  audioWaveContainerRef,
  isTranscribing,
  keywordInfo,
  transcriptArray,
}) => {
  const dispatch = useDispatch();
  const submitTranscript = async () => {
    dispatch(setTranscript(transcriptArray));
  };
  return (
    <Tile className="output-container">
      {/* <h3 className="container-title">Output</h3>
      <FormGroup legendText="Audio">
        <AudioWave
          audioWaveContainerRef={audioWaveContainerRef}
          data={audioDataArray}
          duration={audioDuration}
          isTranscribing={isTranscribing}
          audioSource={audioSource}
          audioAnalyzer={audioAnalyzer}
        />
      </FormGroup> */}
      <FormGroup legendText="Response" className="response">
        <TranscriptBox
          keywordInfo={keywordInfo}
          transcriptArray={transcriptArray}
        />
      </FormGroup>
      <Button
        className="submit-transcript btn"
        kind="tertiary"
        onClick={submitTranscript}
      >
        Submit Transcript
      </Button>
    </Tile>
  );
};

OutputContainer.propTypes = {
  // audioAnalyzer: PropTypes.object.isRequired,
  audioDataArray: PropTypes.arrayOf(PropTypes.number),
  audioDuration: PropTypes.number,
  audioSource: PropTypes.string,
  audioWaveContainerRef: PropTypes.object.isRequired,
  isTranscribing: PropTypes.bool,
  keywordInfo: PropTypes.arrayOf(PropTypes.object),
  transcriptArray: PropTypes.arrayOf(PropTypes.object),
};

OutputContainer.defaultProps = {
  audioDataArray: [],
  audioDuration: 0,
  audioSource: "",
  isTranscribing: false,
  keywordInfo: [],
  transcriptArray: [],
};

export default OutputContainer;
