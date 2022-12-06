import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserResults } from "../store/userResults";

export const UserResults = () => {
  const dispatch = useDispatch();
  const { userResults } = useSelector((state) => state);
  console.log("Printing userResults: >> ", userResults);
  useEffect(() => {
    dispatch(getUserResults());
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
                <p key={result.id}>
                  Topic similarity: {result.similarityScore}%
                </p>

                <p key={result.id}>
                  Vocabulary correctness: {result.vocabScore}%
                </p>
                <p key={result.id}>Time Bonus: {result.timerScore}%</p>
                <p key={result.id}>Total: {result.overallScore}</p>
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
