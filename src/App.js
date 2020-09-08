import React, { useEffect, useReducer } from 'react';
import HomePage from './Pages/HomePage/HomePage';
import WintNavbar from './Components/WintNavbar/WintNavbar'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import AboutPage from './Pages/AboutPage/AboutPage';

function App() {
  return (
    <div className="App">
      <WintNavbar></WintNavbar>
      <br />
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/About' component={AboutPage} />
      </Switch>
    </div>
  );
}

export default App;
