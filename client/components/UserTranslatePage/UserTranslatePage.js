import React, { useEffect, useState } from "react";
import styles from "./UserTranslatePage.module.css";
import { connect, useSelector } from "react-redux";
import { getPrompt } from "../../store/prompt";
import { Redirect } from "react-router-dom";
import ServiceContainer from "../Watson/ServiceContainer";

function UserTranslatePage(props) {
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    props.getPrompt(props.match.params.id);
  }, []);

  const { transcript } = useSelector((state) => state);
  const transcribed = transcript.map((elem) => {
    return elem.text;
  });

  return (
    <div>
      <section className={"prompt_section"}>
        <div className={"prompt_div"}>
          <span className={"prompt_div_title"}>Read</span>
          <p className={"prompt_div_prompt"}>
            {props.prompt ? props.prompt.content : null}
          </p>
        </div>
        <div className={`prompt_div , prompt_interaction`}>
          <span className={"user_score"}>97/100</span>
          <p className={"record_audio_button"}>{">"}</p>
          <p className={"test_result"}>Try Again</p>
        </div>
        <div className={"speech_div"}>
          <span className={"speech_div_title"}>Response</span>
          <p className={"speech_div_response"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            expedita consequuntur molestias, iste pariatur quo corrupti, minima
            at sapiente soluta suscipit? A dolorum consequatur odio aperiam
            asperiores eius quod modi.
          </p>
        </div>
      </section>
      <ServiceContainer />
      {/* <button
        onClick={() => {
          setSubmit(true);
        }}
      >
        Submit
      </button> */}
      {transcribed.length ? (
        <Redirect
          to={{
            pathname: "/results",
            state: { key: props.prompt.key, transcript: transcribed, vocabulary: props.prompt.vocabulary },
          }}
        />
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    prompt: state.prompt,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPrompt: (id) => {
      dispatch(getPrompt(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTranslatePage);
