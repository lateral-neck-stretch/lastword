import * as React from 'react';
import Button from '@mui/material/Button';
import { fetchSingleUser } from '../../store/user';
import { getUserResults } from '../../store/userResults';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import style from './UserProfile.module.css';
import { Controller, Scene } from 'react-scrollmagic';
import {
  VictoryChart,
  VictoryArea,
  VictoryAxis,
  VictoryPolarAxis,
  VictoryTheme,
} from 'victory';

import { UserResults } from '../UserResults';

function UserProfile(props) {
  const dispatch = useDispatch();
  const { userReducer } = useSelector((state) => state);
  const { userResults } = useSelector((state) => state);
  const { username, id, userAvatar } = userReducer;
  const token = window.localStorage.getItem('token');
  // const { username, id, userAvatar } = props;

  const data = userResults.map((elem, idx) => ({
    x: `${elem.createdAt}`,
    y: parseInt(elem.overallScore),
  }));

  React.useEffect(() => {
    dispatch(fetchSingleUser(token));
  }, []);
  React.useEffect(() => {
    dispatch(getUserResults(token));
  }, []);

  return (
    <div className={style.sidebarPage}>
      {/* ///USER AVATAR/// */}
      <div className={style.sideBar} side='right'>
        <Avatar
          alt='user_avatar'
          src={userAvatar}
          sx={{ width: 100, height: 100, bgcolor: 'white' }}
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
                  <VictoryArea data={data} />
                  {/* <VictoryArea data={sampleData} />
                  <VictoryAxis />
                </VictoryChart>
                <VictoryChart polar theme={VictoryTheme.material}>
                  <VictoryArea data={sampleData} />
                  <VictoryPolarAxis /> */}
                </VictoryChart>
              </div>
            </Scene>
            <Scene
              duration={800}
              pin={{ pushFollowers: true }}
              triggerHook={0.5}
              offset={125}
            >
              <div>{/* <UserResults /> */}</div>
            </Scene>
          </Controller>
        </section>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     id: state.auth.id,
//     username: state.auth.username,
//     userAvatar: state.auth.userAvatar,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchSingleUser: (token) => {
//       dispatch(fetchSingleUser(token));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
export default UserProfile;
