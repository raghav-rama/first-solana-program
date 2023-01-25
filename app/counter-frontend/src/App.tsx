import * as React from "react";

import { Box, AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";
import { Wallet } from "./components/SolanaMultiWallet";
import { Connection, Transaction, Keypair, clusterApiUrl } from "@solana/web3.js"
import idl from "./idl.json";

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
              }}
            >
              Counter Frontend
            </Typography>
            <Wallet />
          </Toolbar>
        </AppBar>
      </Box>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant="contained" sx={{ width: "90%" }}>Initialize</Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" sx={{ width: "90%" }}>Update</Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" sx={{ width: "90%" }}>Decrement</Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" sx={{ width: "90%" }}>Increment</Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" sx={{ width: "90%" }} onClick={
                async () => {
                  const connection = new Connection(clusterApiUrl("devnet"));
                  const version = await connection.getVersion();
                  console.log("connection established to devnet", connection, version);
                  console.log("idl:", idl);
                }
              }>Establish Connection</Button>
            </Grid>
          </Grid>
        </Box>
      </header>
    </div>
  );
}

export default App;