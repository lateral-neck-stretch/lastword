import React from 'react';

export const InstructionsPage = ({ setInstructions }) => {
  const handleClick = () => {
    setInstructions(false);
  };
  return (
    <div>
      <h3>Instructions</h3>
      <div className='getting-started'>
        <h5>Getting Started</h5>
        <ul>
          <li>
            After you have signed up and logged in, you can begin learning your
            next language.
          </li>
          <li>Begin by selecting the Prompts link on the top banner.</li>
          <li>
            You will be redirected to the prompt selection page where you can
            choose a topic.
          </li>
          <li>
            Once you select a prompt you will be given a prompt in your native
            language.
          </li>
          <li>
            Your job is to read and translate the excerpt into the language you
            are learning.
          </li>
          <li>Start by pressing "Record", and begin your translated speech.</li>
          <li>
            You will be provided a live transcript of your speech. When you are
            satisfied with your recording, click "Submit Transcript"
          </li>
          <li>
            Upon submission, you will be given a score based on your ability to
            correctly read, translate, and speak.
          </li>
          <li>
            You can review a history of your results in your User profile page.
          </li>
        </ul>
        <button onClick={handleClick}>Close</button>
      </div>
    </div>
  );
};
