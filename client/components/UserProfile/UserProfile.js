import * as React from "react";
import Button from "@mui/material/Button";
import { fetchSingleUser } from "../../store/users";
import { connect, useSelector, useEffect } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function UserProfile(props) {
  // const singleUser = useSelector((state) => state.user);
  const token = window.localStorage.getItem("token");
  const { username, id, userAvatar } = props;

  React.useEffect(() => {
    console.log("props", props);
    const user = props.fetchSingleUser(token);
    console.log("user", user);
  }, []);

  return (
    <div>
      <h1>Welcome, {username}</h1>

      {/* ///USER AVATAR/// */}
      <Avatar
        alt='user_avatar'
        src={userAvatar}
        sx={{ width: 100, height: 100 }}
      />
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
    fetchSingleUser: (id, token) => {
      dispatch(fetchSingleUser(id, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
