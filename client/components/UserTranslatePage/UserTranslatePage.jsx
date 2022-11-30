import React, { useEffect, useState } from 'react'
import styles from "./UserTranslatePage.module.css";
import { connect, useSelector } from 'react-redux'
import { getPrompt } from '../../store/prompt';
import $ from 'jquery';

function UserTranslatePage(props) {
    const statePrompt = useSelector(state => state.prompt)
    useEffect(() => {
        props.getPrompt(props.match.params.id)
    }, [])

    const handleClick = () => {
        // let words = $(".prompt").text()/*.text().split(/\s+/);*/
        console.log(words)
    }

    useEffect(() => {
        let words = $(".prompt").text().split(/\s+/)
        let text = words.join("</span> <span>");
        $(".prompt").html("<span>" + text + "</span>");
        let htmlpromptspans = $(".prompt").children()
        let keywords = $(".promptKey").text().split(/\s+/)
        let keytext = keywords.join("</span> <span>");
        $(".promptKey").html("<span>" + keytext + "</span>");
        let htmlkeypromptspans = $(".promptKey").children()

        // htmlprompt.children().eq(1).text()
        htmlpromptspans.hover(function() {
            let index = $(this).index();
            htmlkeypromptspans.eq(index).css("visibility", "visible")
        }, function() {
            let index = $(this).index();
            htmlkeypromptspans.eq(index).css("visibility", "hidden")
        });

    })
    // return (
    //         <div>
    //             <PromptDiv />
    //         </div>
    //     )
    // }
    // function PromptDiv() {

        return (
            <section className={styles.prompt_section}>
                <div className={styles.prompt_div}>
                <div className={styles.prompt_div_title}>Read</div>
                    <p className="prompt"/*className={styles.prompt_div_prompt}*/>
                        {(statePrompt) ? (statePrompt.content) : (null)}
                    </p>
                    <p className="promptKey">
                        {(statePrompt) ? (statePrompt.key) : (null)}
                    </p>
                </div>
                <div className={`${styles.prompt_div} , ${styles.prompt_interaction}`}>
                    <div className={styles.user_score}>97/100</div>
                    <p className={styles.record_audio_button}>{">"}</p>
                    <p className={styles.test_result}>Try Again</p>
                </div>
                <div className={styles.speech_div}>
                <div className={styles.speech_div_title}>Response</div>
                <p className={styles.speech_div_response}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium expedita consequuntur molestias, iste pariatur quo corrupti, minima at sapiente soluta suscipit? A dolorum consequatur odio aperiam asperiores eius quod modi.
                </p>
                <button onClick={handleClick}>Click me</button>
                </div>
            </section>
    )
}



// const mapStateToProps = (state) => {
//     return {
//         prompt: state.prompt
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        getPrompt: (id) => {
            dispatch(getPrompt(id))
        }
    }
}

export default connect(null, mapDispatchToProps)(UserTranslatePage)
