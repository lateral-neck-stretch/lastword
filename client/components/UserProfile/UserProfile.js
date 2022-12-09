import * as React from "react";
import Button from "@mui/material/Button";
import { fetchSingleUser } from "../../store/users";
import { connect, useSelector, useEffect } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import style from "./UserProfile.module.css";
import { Controller, Scene } from "react-scrollmagic";
import {
  VictoryChart,
  VictoryArea,
  VictoryAxis,
  VictoryPolarAxis,
  VictoryTheme,
} from "victory";

function UserProfile(props) {
  // const singleUser = useSelector((state) => state.user);
  const token = window.localStorage.getItem("token");
  const { username, id, userAvatar } = props;

  const sampleData = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];

  React.useEffect(() => {
    console.log("props", props);
    const user = props.fetchSingleUser(token);
    console.log("user", user);
  }, []);

  return (
    <div className={style.sidebarPage}>
      {/* ///USER AVATAR/// */}
      <div className={style.sideBar} side="right">
        <Avatar
          alt="user_avatar"
          src="/triceratops_avatar.png"
          sx={{ width: 100, height: 100, bgcolor: "white" }}
        />
        <h2>Hi, {username} </h2>
        <h4>Level 8</h4>
        <h4>User since 2022</h4>
        <h3>Languages:</h3>
        <ul>
          {/* hardcoded but can use map function for every user */}
          <li>English</li>
          <li>Spanish</li>
          <li>Portuguese</li>
        </ul>
      </div>

      <div className={style.scrollComponent}>
        <section>
          <Controller>
            <Scene
              duration={800}
              pin={{ pushFollowers: true }}
              // triggerHook={0.5}
              offset={125}
            >
              <div>
                <h4>My Stats</h4>
                <VictoryChart theme={VictoryTheme.material}>
                  <VictoryArea data={sampleData} />
                  <VictoryAxis />
                </VictoryChart>
                <VictoryChart polar theme={VictoryTheme.material}>
                  <VictoryArea data={sampleData} />
                  <VictoryPolarAxis />
                </VictoryChart>
              </div>
            </Scene>
            <Scene
              duration={800}
              pin={{ pushFollowers: true }}
              triggerHook={0.5}
              offset={125}
            >
              <div> My Past Results </div>
            </Scene>
          </Controller>
        </section>
      </div>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.id,
    username: state.auth.username,
    userAvatar: state.auth.userAvatar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleUser: (token) => {
      dispatch(fetchSingleUser(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
