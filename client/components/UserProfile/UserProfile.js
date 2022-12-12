import * as React from 'react';
import { fetchSingleUser } from '../../store/user';
import { getUserResults } from '../../store/userResults';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './UserProfile.module.css';
import { UserResults } from '../UserResults';
import Chart from 'react-apexcharts';

/// MUI ///
import Grid from '@mui/material/Grid';
import Grid2 from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import GaugeChart from './GaugeChart';

function UserProfile(props) {
  const dispatch = useDispatch();
  const { userReducer } = useSelector((state) => state || []);
  const { userResults } = useSelector((state) => state);
  const { username, id, userAvatar } = userReducer;
  const languages = useSelector((state) => state.auth.userLanguages || []);
  const proficiency = useSelector((state) => state.auth.proficiency || []);
  const token = window.localStorage.getItem('token');
  // const { username, id, userAvatar } = props;

  const data = userResults.map((elem) => ({
    x: parseInt(elem.id),
    y: parseInt(elem.overallScore),
  }));

  React.useEffect(() => {
    dispatch(fetchSingleUser(token));
  }, []);
  React.useEffect(() => {
    dispatch(getUserResults(token));
  }, []);

  // GAUGE CHART

  return (
    <div className={style.sidebarPage}>
      {/* ///USER AVATAR/// */}
      <div className={style.sideBar} side='right'>
        <Avatar
          alt='user_avatar'
          src={userAvatar}
          sx={{ width: 100, height: 100, bgcolor: 'white' }}
        />
        <br />
        <h2>Hi, {username} </h2>
        {/* <h4>Level 8</h4> */}
        <h5>User since 2022</h5>
        <h3>Languages:</h3>
        <ul>
          {languages.map((language) => {
            return <li>{language}</li>;
          })}
        </ul>
      </div>

      <div className={style.scrollComponent}>
        <h2>My Stats</h2>
        <GaugeChart proficiency={proficiency} />
        <p>
          Your proficiency score reflects your average performance in your given
          language over the past week.
          <br></br>
          <br></br>
          As your overall scores improve over time, your proficiency score will
          go up. A proficiency score of 100/100 is roughly equivalent to levels
          B2 to C2 on the CEFR (Common European Framework of Reference for
          Languages) Scale.
        </p>
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

/*
 <div className={style.scrollComponent}>
        <section>
          <h4>My Stats</h4>
          <Controller>
            <Scene
              duration={800}
              pin={{ pushFollowers: true }}
              triggerHook={0.5}
              offset={50}
            >
              <div>
                <h4>My Stats</h4>
                <VictoryChart theme={VictoryTheme.material}>
                  <VictoryArea data={data} />
                </VictoryChart>
              </div>
            </Scene>
            <Scene
              duration={800}
              pin={{ pushFollowers: true }}
              triggerHook={0.5}
              offset={125}
            >
              <div><UserResults /></div>
              </Scene>
              </Controller>
            </section>
          </div>
*/
