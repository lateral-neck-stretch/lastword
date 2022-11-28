import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPrompts } from '../store/prompts'

function PromptSelection(props) {
  useEffect(() => {
      props.getPrompts()
  }, [])

  return (
    <div>
      {props.prompts.map((prompt) => {
        return (
          <div key={prompt.id}>
            <Link to={`/prompts/${prompt.id}`} >{prompt.title}</Link>
            <div>{prompt.difficulty}</div>
            <div>{prompt.topic}</div>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    prompts: state.prompts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPrompts: () => {
      dispatch(getPrompts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PromptSelection)
