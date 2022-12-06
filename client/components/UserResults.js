import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserResults } from "../store/userResults";

export const UserResults = () => {
  const dispatch = useDispatch();
  const { userResults } = useSelector((state) => state);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    dispatch(getUserResults(token));
  }, []);
  return (
    <div>
      <h3>UserResults</h3>
      <p>Welcome to UserResults</p>
      {userResults ? (
        <ul>
          {userResults.map((result, index) => {
            return (
              <li key={index}>
                <p>Topic similarity: {result.similarityScore}%</p>

                <p>Vocabulary correctness: {result.vocabScore}%</p>
                <p>Time Bonus: {result.timerScore}%</p>
                <p>Total: {result.overallScore}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        "Test to receive an analysis of your language proficiency"
      )}
    </div>
  );
};
