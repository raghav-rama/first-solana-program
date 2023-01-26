import * as React from "react";

import { Box, AppBar, Toolbar, Typography, } from "@mui/material";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { MyHeader } from "./components/MyHeader";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Box component="nav" sx={{ flexGrow: 1 }}>
        <AppBar position="absolute" sx={{ backgroundColor: "purple" }}>
          <Toolbar>
            <img
              className="Navbar-app-logo"
              src={require("./img/logo192.png")}
              alt="logo"
              height={30}
              width={30}
            />
            <Typography
              variant="h4"
              component="h1"
              sx={{
                flexGrow: 1,
                textAlign: "left",
                ml: 2,
                fontFamily: "Roboto, sans-serif",
                "@media (max-width: 600px)": {
                  fontSize: "1rem",
                },
              }}
            >
              Counter Frontend
            </Typography>
            <WalletMultiButton />
          </Toolbar>
        </AppBar>
      </Box>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MyHeader />
      </header>
    </div>
  );
}

export default App;
