import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ServiceContainer from "./components/Watson/ServiceContainer";

// var recognizeMic = require('watson-speech/speech-to-text/recognize-microphone');

const Watson = () => {
  const dispatch = useDispatch();
  const { transcript } = useSelector((state) => state);

  return (
    <div>
      <h2>Placeholder for Watson</h2>
      <ServiceContainer />
      <div>
        <button onClick={compare}>Submit for Comparison</button>
      </div>
    </div>
  );
};

export default Watson;
