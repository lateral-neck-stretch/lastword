import React from 'react'

import Navbar from './components/Navbar/Navbar'
import Routes from './Routes'
import UserTranslatePage from "./components/UserTranslatePage/UserTranslatePage";
const App = () => {
  return (
    <div>
      <Navbar />
      {/* <UserTranslatePage /> */}
      <Routes />
    </div>
  )
}

export default App
