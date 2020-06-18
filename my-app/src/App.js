import React from 'react';
import './App.css';
import { CitySelect } from './features/citySelect/citySelect.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <CitySelect />
      </header>
      <footer>
          Author: Adam Drożyński, 395133
      </footer>
    </div>
  );
}

export default App;
