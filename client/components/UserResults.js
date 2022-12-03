import React from "react";
import { useSelector } from "react-redux";

export const UserResults = () => {
  const { userResults } = useSelector((state) => state);
  console.log("Printing userResults: ", userResults);
  return <div>UserResults</div>;
};
