import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { getPrompts } from '../store/prompts'
import Autocomplete from '@mui/material/Autocomplete'
import { InputLabel, MenuItem, Select } from '@mui/material'
import TextField from '@mui/material/TextField'

function PromptSelection(props) {
  const [difficulty, setDifficulty] = useState('all');
  const [topic, setTopic] = useState('All');
  const [sortDifficulty, setSortDifficulty] = useState('ascending');
  // const [sortTopic, setSortTopic] = useState(null);
  const statePrompts = useSelector(state => state.prompts)
  // useEffect(() => {
  //   console.log(prompts)
  //   setPrompts(props.prompts)
  // }, [prompts])

  useEffect(() => {
    // async function prompts() {
      props.getPrompts()
    // }
    // prompts()
  }, [])

  const handleSortDifficultyChange = (event) => {
    setSortDifficulty(event.target.value)
  }

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value)
  }

  const handleTopicChange = (event, newValue) => {
    setTopic(newValue)
  }

  let prompts = statePrompts
  let mappedPromptsTopic = prompts.map((prompt) => {
    return prompt.topic
  })
  let uniquePromptTopics = ['All', ...new Set(mappedPromptsTopic)]

  let mappedPromptsDifficulty = prompts.map((prompt) => {
    return prompt.difficulty
  })

  if (difficulty === 'easy') {
    prompts = prompts.filter(prompt => +prompt.difficulty <= 100)
  } else if (difficulty === 'medium') {
    prompts = prompts.filter(prompt => +prompt.difficulty <= 200 && prompt.difficulty >= 100)
  } else if (difficulty === 'hard') {
    prompts = prompts.filter(prompt => +prompt.difficulty >= 200)
  }

  if (sortDifficulty === 'ascending') {
    prompts.sort((a, b) => (a.difficulty > b.difficulty) ? 1 : -1)
  } else if (sortDifficulty === 'descending') {
    prompts.sort((a, b) => (a.difficulty > b.difficulty) ? -1 : 1)
  }

  console.log(topic)
  if (topic !== 'All') {
    prompts = prompts.filter(prompt => prompt.topic === topic)
  }

  return (
    <div>
      <InputLabel id="difficulty-select">Sort by difficulty</InputLabel>
      <Select
        value={sortDifficulty}
        onChange={handleSortDifficultyChange}
        >
        <MenuItem value={'ascending'}>Increasing</MenuItem>
        <MenuItem value={'descending'}>Decreasing</MenuItem>
      </Select>
      <InputLabel id="difficulty-filter">Filter by difficulty</InputLabel>
      <Select
        value={difficulty}
        onChange={handleDifficultyChange}
        label="Difficulty filter"
        >
        <MenuItem value={'all'}>All</MenuItem>
        <MenuItem value={'easy'}>Easy</MenuItem>
        <MenuItem value={'medium'}>Medium</MenuItem>
        <MenuItem value={'hard'}>Hard</MenuItem>
      </Select>
      <Autocomplete
        disablePortal
        value={topic}
        id="topic-filter"
        options={uniquePromptTopics}
        sx={{ width: 300 }}
        onChange={handleTopicChange}
        renderInput={(params) => <TextField {...params} label="Topic" />}
      />
      {prompts.map((prompt) => {
        return (
          <div key={prompt.id}>
            <Link className="title" to={`/prompts/${prompt.id}`} >{prompt.title}</Link>
            <div className='difficulty'>{prompt.difficulty}</div>
            <div className='topic'>{prompt.topic}</div>
          </div>
        )
      })}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPrompts: () => {
      dispatch(getPrompts())
    }
  }
}

export default connect(null, mapDispatchToProps)(PromptSelection)
