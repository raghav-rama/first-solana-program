import * as React from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Box, Paper, Typography } from "@mui/material";
import { Program, AnchorProvider, Wallet } from "@project-serum/anchor";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { baseAccount } from "./Initialize";
import IDL from "../idl/basic_1.json";

let counter: number = 0;
let account: any;

const CounterValue: React.FC = () => {
  const wallet = useAnchorWallet() as Wallet;
  const network = clusterApiUrl("devnet");
  const connection = new Connection(network, "processed");
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  const JSON_IDL = JSON.parse(JSON.stringify(IDL));
  const program = new Program(JSON_IDL, IDL.metadata.address, provider);

  const [counterValue, setCounterValue] = React.useState<number>(0);

  try {
    const fetchCounterValue = async () => {
      account = await program.account.myAccount.fetch(
        baseAccount.publicKey
      );
      counter = parseInt(account.data);
      console.log(counter);
      setCounterValue(counter);
    };
    React.useEffect(() => {
      const intervalId = setInterval(fetchCounterValue, 1000);
      return () => clearInterval(intervalId);
    }, []);
  } catch (err) {
    console.log("Error: ", err);
  }

  return (
    <Box sx={{ mr: 5, ml: 5 }}>
      <Paper elevation={4} sx={{ bgcolor: "#282c34" }}>
        <Typography
          variant="h4"
          component="p"
          sx={{ fontFamily: "Poppins, sans-serif" }}
        >
          Counter Value: {counter}
        </Typography>
      </Paper>
    </Box>
  );
};

export { CounterValue, counter, account };
