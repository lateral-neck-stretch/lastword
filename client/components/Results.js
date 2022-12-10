import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTranscript } from '../store/watson';
import { postResult } from '../store/result';
import usersReducer, { updateUserScore } from '../store/user';
import { Leaderboard } from './Leaderboard';
// import $ from 'jquery';

function Results(props) {
  /// Probably just get transcript through props
  const [result, setResult] = useState(null);
  const [vocab, setVocab] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const func = async () => {
      const { data } = await axios.get('/auth/twinwords');
      let resultsArray = await Promise.all(
        props.location.state.transcript.map(async (sentence, index) => {
          const options = {
            method: 'GET',
            url: 'https://twinword-text-similarity-v1.p.rapidapi.com/similarity/',
            params: {
              text1: sentence,
              text2: props.location.state.key[index],
            },
            headers: data,
          };
          let response = await axios.request(options);
          return response.data;
        })
      );
      setResult(resultsArray);
    };
    func();
    dispatch(setTranscript([]));
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

  useEffect(() => {
    let vocabObject = JSON.parse(props.location.state.vocabulary);
    let joinedTranscript = props.location.state.transcript
      .join(' ')
      .toLowerCase();
    let vocabWords = Object.keys(vocabObject);
    let vocabScores = vocabWords.map((word) => {
      let translationArray = vocabObject[word];
      let included = false;
      translationArray.forEach((translatedWord) => {
        if (joinedTranscript.includes(translatedWord.toLowerCase())) {
          included = true;
        }
      });
      return included;
    });
    let finalScores = vocabScores.map((binary, index) => {
      // let htmlList = $("#vocab_list")
      if (binary === true) {
        return 1;
      } else {
        // let li = "<li>" + vocabWords[index] + "</li>"
        // htmlList.append(li)
        return 0;
      }
    });
    setVocab(finalScores);
  }, []);

  useEffect(() => {
    if (result && vocab) {
      async function dbUpdates() {
        const token = window.localStorage.getItem('token');
        let apiScore =
          Math.floor(
            result.reduce((previous, current) => {
              return previous + current.similarity;
            }, 0) / result.length
          ) *
          100 *
          (result.length / props.location.state.key.length);
        let vocabScore = Math.floor(
          (vocab.reduce((previous, current) => {
            return previous + current;
          }, 0) /
            vocab.length) *
            100
        );
        let overallScore = Math.floor((apiScore + vocabScore) / 2);
        await props.postResult(
          overallScore,
          vocabScore,
          apiScore,
          1,
          props.location.state.id,
          token
        );
        await props.updateUserScore(token);
      }
      dbUpdates();
    }
  }, [result, vocab]);

  // useEffect(() => {
  //   if (result) {
  //   result.forEach((apiSentenceScore, index) => {
  //     let htmlId = "#sentence_no_" + index;
  //     let htmlSentence = $(htmlId)
  //     if (apiSentenceScore.similarity < 0.5) {
  //       htmlSentence.css("color", "red")
  //     } else if (apiSentenceScore.similarity < 0.8) {
  //       htmlSentence.css("color", "yellow")
  //     } else {
  //       htmlSentence.css("color", "green")
  //     }
  //   })
  // }
  // }, [result])
  console.log(props.user);

  return (
    <div className='result-div'>
      <h1>Results:</h1>
      <div>
        {result
          ? 'Translation score: ' +
            (result.reduce((previous, current) => {
              return previous + current.similarity;
            }, 0) /
              result.length) *
              100 *
              (result.length / props.location.state.key.length) +
            '%'
          : null}
      </div>
      <div>
        {vocab
          ? 'Vocabulary score: ' +
            (vocab.reduce((previous, current) => {
              return previous + current;
            }, 0) /
              vocab.length) *
              100 +
            '%'
          : null}
      </div>
      {result
        ? props.location.state.transcript.map((sentence, index) => {
            // let divId = "sentence_no_" + index
            console.log(result[index].similarity);
            console.log(result[index]);
            if (result[index].similarity < 0.5) {
              return (
                <div key={index} className='red'>
                  {sentence}
                </div>
              );
            } else if (result[index].similarity < 0.8) {
              return (
                <div key={index} className='yellow'>
                  {sentence}
                </div>
              );
            } else {
              return (
                <div key={index} className='green'>
                  {sentence}
                </div>
              );
            }
          })
        : null}
      {vocab ? (
        vocab.reduce((previous, current) => {
          return previous + current;
        }, 0) /
          vocab.length <
        1 ? (
          <h5>Words to work on:</h5>
        ) : null
      ) : null}
      {vocab
        ? Object.keys(JSON.parse(props.location.state.vocabulary)).map(
            (vocabWord, index) => {
              if (vocab[index] === 0) {
                return <div key={index}>{vocabWord}</div>;
              }
            }
          )
        : null}
      <div>New User Proficiency: </div>
      {props.user.length ? <div>{props.user[0].proficiency}</div> : null}
      <div className='prompt_leader'>
        <Link
          to={{
            pathname: '/leaderboard',
            state: {
              id: props.location.state.id,
            },
          }}
        >
          View Leaderboard
        </Link>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.usersReducer,
    result: state.result,
  };
};

const mapDispatch = (dispatch) => {
  return {
    postResult: (
      overallScore,
      vocabScore,
      similarityScore,
      timerScore,
      id,
      token
    ) => {
      dispatch(
        postResult(
          overallScore,
          vocabScore,
          similarityScore,
          timerScore,
          id,
          token
        )
      );
    },
    updateUserScore: (token) => {
      dispatch(updateUserScore(token));
    },
  };
};

export default connect(mapState, mapDispatch)(Results);
