import './App.css';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  const handleThemeColor = () => {
    setDarkTheme(() => !darkTheme);
  };

  const theme = createTheme({
    palette: {
      mode: darkTheme ? 'dark' : 'light',
    },
  });

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Navbar onClickIconColor={handleThemeColor} />
        <Routes>
          <Route path='/' element={<Home darkTheme={darkTheme} />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
