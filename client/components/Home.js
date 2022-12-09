import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
const Home = () => {
  const { auth } = useSelector((state) => state);
  const { username } = auth;

  return (
    <div className='home-div'>
      <h3 className='home-header'>Welcome, {username}</h3>
      <p className='home-p'>
        Hi {username || ''}, start working on your translating skills with
        LastWord's simple and intuitive learning method.
      </p>
      <Link to={'/prompts'} className='home-links'>
        View prompts
      </Link>
    </div>
  );
};
export default Home;
