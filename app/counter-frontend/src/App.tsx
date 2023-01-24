import * as React from 'react';

import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Wallet } from './components/SolanaMultiWallet';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Box component="nav" sx={{ flexGrow: 1 }}>
        <AppBar position="absolute" sx={{ backgroundColor: "purple" }}>
          <Toolbar>
            <img className="Navbar-app-logo" src={require("./img/logo192.png")} alt="logo" height={30} width={30} />
            <Typography variant="h4" component="h1" sx={{ flexGrow: 1, textAlign: "left", ml: 2 }}>
              Counter Frontend
            </Typography>
            <Button variant="contained">
              Connect
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Wallet />
      </header>
    </div>
  );
}

export default App;
