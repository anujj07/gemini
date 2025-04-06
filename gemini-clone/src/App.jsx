import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';

const App = () => {
  return (
    <>
      <Sidebar />
      <Main /> {/* Ensure Main is imported or defined */}
    </>
  );
};

export default App;
