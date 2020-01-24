import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './pages/home';
import Search from './pages/search';

function App() {
  return (
    <div className="app">
          <Route exact path='/' component={Home} />
          <Route exact path='/search' component={Search} />
        </div>
  );
}

export default App;
