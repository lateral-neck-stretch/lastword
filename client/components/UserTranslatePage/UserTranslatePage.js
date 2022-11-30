import React, { useEffect, useState } from 'react'
import styles from "./UserTranslatePage.module.css";
import { connect } from 'react-redux'
import { getPrompt } from '../../store/prompt';

function UserTranslatePage(props) {
    useEffect(() => {
        props.getPrompt(props.match.params.id)
    }, [])
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
                <span className={styles.prompt_div_title}>Read</span>
                <p className={styles.prompt_div_prompt}>
                    {(props.prompt) ? (props.prompt.content) : (null)}
                </p>
                </div>
                <div className={`${styles.prompt_div} , ${styles.prompt_interaction}`}>
                    <span className={styles.user_score}>97/100</span>
                    <p className={styles.record_audio_button}>{">"}</p>
                    <p className={styles.test_result}>Try Again</p>
                </div>
                <div className={styles.speech_div}>
                <span className={styles.speech_div_title}>Response</span>
                <p className={styles.speech_div_response}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium expedita consequuntur molestias, iste pariatur quo corrupti, minima at sapiente soluta suscipit? A dolorum consequatur odio aperiam asperiores eius quod modi.
                </p>
                </div>
            </section>
    )
}

const mapStateToProps = (state) => {
    return {
        prompt: state.prompt
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPrompt: (id) => {
            dispatch(getPrompt(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTranslatePage)
