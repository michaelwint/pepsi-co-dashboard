import React, { useContext } from 'react';
import HomePage from './Pages/HomePage/HomePage'
import LoginPage from './Pages/LoginPage/LoginPage'
import WintNavbar from './Components/WintNavbar/WintNavbar'
import { store } from './Store/store'
import { Route, Switch } from 'react-router-dom'
import './App.css';

function App() {
  const userId = useContext(store).state.userId;

  return (
    <div className="App">
      {/* { userId !== null && <WintNavbar></WintNavbar> } */}
      <WintNavbar></WintNavbar>
      <br />
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/login' component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
