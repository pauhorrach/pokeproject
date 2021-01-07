import React from 'react';

import './App.css';
import { MainRouter } from './components/main-router/main-router';
import { MainNavbar } from './components/navbar/main-navbar';

function App() {
  return (
    <div className="App">
      <header>
        <MainNavbar></MainNavbar>
      </header>
      <main className="App-content">
        <MainRouter></MainRouter>
      </main>
    </div>
  );
}

export default App;
