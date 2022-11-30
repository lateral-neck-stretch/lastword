import React from "react";
import { useSelector } from "react-redux";
import ServiceContainer from "./components/Watson/ServiceContainer";
import { getAns } from "./store/watson";

/**
 * Watson template github: https://github.com/IBM/speech-to-text-code-pattern/tree/fbb5a38731f8b16e4f88a880a19694f81a35712b
 */
const Watson = () => {
  const { transcript } = useSelector((state) => state);
  const transcribed = transcript.map((elem) => {
    return elem.text;
  });

  return (
    <div>
      {transcribed ? transcribed : "Test your skills"}
      <h2>Placeholder for Watson</h2>
      <ServiceContainer />
    </div>
  );
};

export default Watson;
