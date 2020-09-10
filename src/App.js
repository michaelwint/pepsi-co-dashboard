import React, { useEffect, useReducer } from 'react';
import HomePage from './Pages/HomePage/HomePage';
import WintNavbar from './Components/WintNavbar/WintNavbar'
import { Route, Switch } from 'react-router-dom';
import FlowratesPage from './Pages/FlowratesPage/FlowratesPage';
import './App.css';
import { FlowratesPageStateProvider } from './Store/flowratesPageStore';

function App() {
  return (
    <div className="App">
      <WintNavbar></WintNavbar>
      <br />
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/Flowrates' component={FlowratesPage} />
      </Switch>
    </div>
  );
}

export default App;
