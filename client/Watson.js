import React, { useState, useEffect } from "react";
import ServiceContainer from "./components/Watson/ServiceContainer";
import { getAns } from "./store/watson";

/**
 * Watson template github: https://github.com/IBM/speech-to-text-code-pattern/tree/fbb5a38731f8b16e4f88a880a19694f81a35712b
 */
const Watson = () => {
  return (
    <div>
      <h2>Placeholder for Watson</h2>
      <div>
        <button onClick={revealAnswer}>Answer</button>
      </div>
      <ServiceContainer />
    </div>
  );
};

export default Watson;
