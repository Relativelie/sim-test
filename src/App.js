import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Competitions } from './components/Competitions';
import { Teams } from './components/Teams';
import { Matches } from './components/Matches';
import { Breadcumps } from './components/Breadcumps';


export function App() {

  return (
    <div className="App">
      <Router>
        <Breadcumps />
        <Routes>
          <Route path="/" element={<Competitions />}></Route>
          <Route path="/:id/teams" element={<Teams />}></Route>
          <Route path="/:id/matches" element={<Matches />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
