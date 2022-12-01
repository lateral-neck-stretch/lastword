import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Results(props) {
  /// Probably just get transcript through props
  const [transcript, setTranscript] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (transcript) {
      const options = {
        method: 'GET',
        url: 'https://twinword-text-similarity-v1.p.rapidapi.com/similarity/',
        params: {
          text1: transcript,
          text2: props.location.state.key
        },
        headers: {
          'X-RapidAPI-Key': '94baee0b74msh5483fc0d1226f97p173cc9jsncf067149596a',
          'X-RapidAPI-Host': 'twinword-text-similarity-v1.p.rapidapi.com'
        }
      };
        axios.request(options).then(function (response) {
        setResult(response.data);
        }).catch(function (error) {
          console.error(error);
        });
    }
  }, [transcript])

/////////// Grab the actual transcript probably passed as props from translate page component
  useEffect(() => {
    async function getTranscript() {
      let watsonTranscript = await axios.get('/api/watson')
      let transcriptData = watsonTranscript.data
      setTranscript(transcriptData.results[0].alternatives[0].transcript)
    }
    getTranscript()

  }, [])

  return (
    <div>
      <h1>Results:</h1>
      <div>{(result)?((result.similarity)*100 + "%"):(null)}</div>
    </div>
  )
}



export default Results
