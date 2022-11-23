import React, { useState, useEffect } from "react";
// import audiofile from "../audiofile.flac";
// import axios from "axios";
// const env = require("dotenv");

const Watson = () => {
  const [audio, setAudio] = useState();
  const transcript = async () => {
    const response = fetch(
      "https://api.us-east.speech-to-text.watson.cloud.ibm.com/instances/b7ebed0e-2a27-48af-ae00-8744137f80cc/v1/recognize",
      {
        method: "POST",
        headers: {
          "Content-Type": "audio/flac",
          Authorization:
            "Basic " +
            btoa("apikey:c16Vic3zhWTcKVbnJiv3_hwn8Jw2OyVDwdra3TFk3gKs"),
        },
        body: audio + ".flac",
      }
    );
    return response;
  };
  const addFile = (e) => {
    if (e.target.files[0]) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("printing reader: ", reader);
        setAudio(reader.result);
      };
    }
  };

  return (
    <div>
      <h2>Welcome to Watson</h2>
      <input type="file" onChange={addFile} />
      <button onClick={transcript}>Submit</button>
    </div>
  );
};

export default Watson;
