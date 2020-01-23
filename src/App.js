import React from 'react';
import { Grommet } from 'grommet';
import Search from './pages/Search';
import './App.css';

function App() {
  return (
    <div className="App">
      <Grommet>
        <Search />
      </Grommet>
    </div>
  );
}

export default App;
