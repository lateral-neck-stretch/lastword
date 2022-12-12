import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Routes from './Routes';
import UserTranslatePage from './components/UserTranslatePage/UserTranslatePage';
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
