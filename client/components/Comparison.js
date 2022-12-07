const axios = require("axios");
// let dandelion = require("node-dandelion");
// dandelion.configure({
//   "token":"7a036521cc394413b5363f1887c7319e",
// });

import React, { useEffect } from 'react'

function Comparison() {
  const options = {
    method: 'GET',
    url: 'https://twinword-text-similarity-v1.p.rapidapi.com/similarity/',
    params: {
      text1: 'It is a simple test.'/* It is a simple test made to demonstrate the technology. This should demonstrate how comparisons are scored.'*/,
      text2: 'It is a simple check.'/* This is a simple experiment made to demonstrate this technology. This should indicate how comparisons are scored.'*/
      // text2: 'This is a going to give a horrible score because it does not mean the same thing.'
    },
    headers: {
      'X-RapidAPI-Key': '94baee0b74msh5483fc0d1226f97p173cc9jsncf067149596a',
      'X-RapidAPI-Host': 'twinword-text-similarity-v1.p.rapidapi.com'
    }
  };

  useEffect(() => {
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, [])

    // useEffect(() => {
    //   axios.request({
    //     method: "GET",
    //     url: "https://api.dandelion.eu/datatxt/sim/v1",
    //     params: {
    //       text1: "Cameron wins the Oscar",
    //       text2: "All nominees for the Academy Awards"
    //     },
    //     headers: {
    //       AccessControlAllowOrigin: "7a036521cc394413b5363f1887c7319e"
    //     }
    //   }
    //     ).then(function(response) {
    //     console.log(response.data)
    //   })
    // })



  return (
    <div>Comparison</div>
  )
}

export default Comparison

