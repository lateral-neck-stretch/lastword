import React, { useEffect, useState } from "react";
import styles from "./UserTranslatePage.module.css";
import { connect, useSelector } from "react-redux";
import { getPrompt } from "../../store/prompt";
import { Redirect } from "react-router-dom";
import ServiceContainer from "../Watson/ServiceContainer";
import $ from 'jquery';

function UserTranslatePage(props) {
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    props.getPrompt(props.match.params.id);
  }, []);

  useEffect(() => {
    if (props.prompt.vocabulary) {
    let words = $(".prompt_div_prompt").text().split(/\s+/)
    let text = words.join("</span> <span>");
    $(".prompt_div_prompt").html("<span>" + text + "</span>");
    let htmlpromptspans = $(".prompt_div_prompt").children()
    let vocabObject = JSON.parse(props.prompt.vocabulary)
    let keywords = Object.keys(vocabObject)
    htmlpromptspans.each(function() {
      $(this).text().toLowerCase()
      keywords.forEach((vocabWord) => {
        if (vocabWord.toLowerCase() === $(this).text().toLowerCase()) {
          let vocabList = vocabObject[vocabWord].join(" ")
          $(this).hover(function(){
            $(this).append("<div id='hoveringTooltip' style='position:fixed;'></div>")
            $('#hoveringTooltip').html(`${vocabList}`)
            $('#hoveringTooltip').css({
                "border-bottom" : "1px dotted black",
                "width" : "140px",
                "background-color" : "black",
                "color" : "#fff",
                "text-align" : "center",
                "border-radius" : "5px",
                "padding" : "5px 0",
                "transition" : "opacity 1s ease-in-out",
                "position" : "fixed",
                "z-index" : "2",
            })
          }, function() {
            $('#hoveringTooltip').remove()
          })
        }
      })
    })
  }
  }, [props.prompt])

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
        <ServiceContainer />
      </section>
      {transcribed.length ? (
        <Redirect
          to={{
            pathname: "/results",
            state: { key: props.prompt.key, transcript: transcribed, vocabulary: props.prompt.vocabulary, id: props.prompt.id },
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
