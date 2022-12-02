import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTranscript } from "../store/watson";
import fetch from "isomorphic-fetch";

function Results(props) {
  /// Probably just get transcript through props
  // const [transcript, setTranscript] = useState(null);
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const func = async () => {
      const usableTranscript = props.location.state.transcript.join(" ");
      const { data } = await axios.get("/auth/twinwords");
      console.log("Printing response: ", data);
      const options = {
        method: "GET",
        url: "https://twinword-text-similarity-v1.p.rapidapi.com/similarity/",
        params: {
          text1: usableTranscript,
          text2: props.location.state.key,
        },
        headers: data,
      };
      axios
        .request(options)
        .then(function (response) {
          setResult(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      dispatch(setTranscript([]));
    };
    func();
  }, []);

  /////////// Grab the actual transcript probably passed as props from translate page component
  // useEffect(() => {
  //   async function getTranscript() {
  //     let watsonTranscript = await axios.get("/api/watson");
  //     let transcriptData = watsonTranscript.data;
  //     setTranscript(transcriptData.results[0].alternatives[0].transcript);
  //   }
  //   getTranscript();
  // }, []);

  return (
    <div>
      <h1>Results:</h1>
      <div>{result ? result.similarity * 100 + "%" : null}</div>
    </div>
  );
}

export default Results;
