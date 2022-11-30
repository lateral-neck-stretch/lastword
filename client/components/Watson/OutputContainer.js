import React from "react";
import PropTypes from "prop-types";
import { Button, FormGroup, Tile } from "@carbon/react";
import fetch from "isomorphic-fetch";
import AudioWave from "./AudioWave";
import TranscriptBox from "./TranscriptBox";

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
  const submitTranscript = async () => {
    console.log("Printing transcript: ", transcriptArray);
    if (transcriptArray.length > 0) {
      await fetch("/api/prompts", {
        method: "POST",
        body: JSON.stringify(transcriptArray[0]),
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          if (response) {
            return response.json();
          }
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  };
  return (
    <Tile className="output-container">
      <h3 className="container-title">Output</h3>
      <FormGroup legendText="Audio">
        <AudioWave
          audioWaveContainerRef={audioWaveContainerRef}
          data={audioDataArray}
          duration={audioDuration}
          isTranscribing={isTranscribing}
          audioSource={audioSource}
          audioAnalyzer={audioAnalyzer}
        />
      </FormGroup>
      <FormGroup legendText="Transcript">
        <TranscriptBox
          keywordInfo={keywordInfo}
          transcriptArray={transcriptArray}
        />
      </FormGroup>
      <Button
        className="submit-transcript"
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
