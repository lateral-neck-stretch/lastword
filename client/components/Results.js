import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, connect } from "react-redux";
import { setTranscript } from "../store/watson";
import { postResult } from "../store/result"

function Results(props) {
  /// Probably just get transcript through props
  // const [transcript, setTranscript] = useState(null);
  const [result, setResult] = useState(null);
  const [vocab, setVocab] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // const usableTranscript = props.location.state.transcript.join(" ");

    const func = async () => {
        const { data } = await axios.get("/auth/twinwords");
        let resultsArray = await Promise.all(props.location.state.transcript.map(async (sentence, index) => {
          const options = {
            method: "GET",
            url: "https://twinword-text-similarity-v1.p.rapidapi.com/similarity/",
            params: {
              text1: sentence,
              text2: props.location.state.key[index],
            },
            headers: data,
          };
          let response = await axios.request(options)
          console.log(response.data)
          return response.data;
        }))
        // console.log(resultsArray)
        setResult(resultsArray)
        // const average = (resultsArray.reduce((previous, current) => { return previous + current.similarity}, 0) / resultsArray.length)
        // console.log(average)
        // setResult(average)
      }
      func()
      dispatch(setTranscript([]));
    }, []);

    // console.log(resultsArray)

    /////////// Grab the actual transcript probably passed as props from translate page component
    // useEffect(() => {
  //   async function getTranscript() {
  //     let watsonTranscript = await axios.get("/api/watson");
  //     let transcriptData = watsonTranscript.data;
  //     setTranscript(transcriptData.results[0].alternatives[0].transcript);
  //   }
  //   getTranscript();
  // }, []);
  useEffect(() => {
    let vocabObject = JSON.parse(props.location.state.vocabulary)
    let joinedTranscript = props.location.state.transcript.join("").toLowerCase()
    let vocabWords = Object.keys(vocabObject)
    let vocabScores = vocabWords.map((word) => {
      let translationArray = vocabObject[word]
      translationArray.forEach((translatedWord) => {
        if(joinedTranscript.includes(translatedWord.toLowerCase())) {
          return true
        }
      }
      )})
    let finalScores = vocabScores.map((binary) => {
      if (binary === true) {
        return 1
      } else {
        return 0
      }
    })
      setVocab(finalScores)
    }, [])

  useEffect(() => {
    if (result && vocab) {
      const token = window.localStorage.getItem("token");
      let apiScore = Math.floor(result.reduce((previous, current) => { return previous + current.similarity}, 0) / result.length * 100)
      let vocabScore = Math.floor(vocab.reduce((previous, current) => { return previous + current }, 0) / vocab.length * 100)
      let overallScore = Math.floor((apiScore + vocabScore) / 2)
      props.postResult(overallScore, vocabScore, apiScore, 1, props.location.state.id, token)
    }
  }, [result, vocab])
  console.log(props.result)

  return (
    <div>
      <h1>Results:</h1>
      <div>{(result) ? ("Translation score: " + (result.reduce((previous, current) => { return previous + current.similarity}, 0) / result.length) * 100 + "%") : (null)}</div>
      <div>{(vocab) ? ("Vocabulary score: " + (vocab.reduce((previous, current) => { return previous + current }, 0) / vocab.length) * 100 + "%") : (null)}</div>
      <p>
        {props.location.state.transcript}
      </p>
    </div>
  );
}

const mapState = (state) => {
  return {
    result: state.result
  }
}

const mapDispatch = (dispatch) => {
  return {
    postResult: (overallScore, vocabScore, similarityScore, timerScore, id, token) => {dispatch(postResult(overallScore, vocabScore, similarityScore, timerScore, id, token))}
  }
}

export default connect(mapState, mapDispatch)(Results);
