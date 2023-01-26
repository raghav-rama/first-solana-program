import * as React from "react";

import { Box, AppBar, Toolbar, Typography, Grid } from "@mui/material";
import { Initialize } from "./components/Initialize";
import { Update } from "./components/Update";
import { Increment } from "./components/Increment";
import { Decrement } from "./components/Decrement"
import { WalletMultiButton, } from "@solana/wallet-adapter-react-ui";

import logo from "./logo.svg";
import "./App.css";
import { SendSOLToRandomAddress } from "./components/SendSOLToRandomAddress";

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
        <Box sx={{ display: "flex", gap: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Initialize />
            </Grid>
            <Grid item xs={6}>
              <Update />
            </Grid>
            <Grid item xs={6}>
              <Increment />
            </Grid>
            <Grid item xs={6}>
              <Decrement />
            </Grid>
            <Grid item xs={12}>
              <SendSOLToRandomAddress />
            </Grid>
          </Grid>
        </Box>
      </header>
    </div>
  );
}

export default App;
