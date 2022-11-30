import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getPrompts } from "../store/prompts";

function PromptSelection(props) {
  useEffect(() => {});

  return <div></div>;
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(null, mapDispatchToProps)(PromptSelection);
