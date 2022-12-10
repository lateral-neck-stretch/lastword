import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../store/leaderboard';

export const Leaderboard = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const { leaderboard } = useSelector((state) => state);
  useEffect(() => {
    dispatch(fetchLeaderboard(id));
  }, []);
  return (
    <div>
      <h2>Leaderboard</h2>
      {leaderboard ? (
        <ul>
          {leaderboard.map((elem, idx) => (
            <li key={idx}>
              {elem['user.username']}: {elem['overallScore']}%
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};
