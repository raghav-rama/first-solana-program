import * as React from "react";
import { FC, useCallback } from "react";
import { Program, AnchorProvider, Wallet } from "@project-serum/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Button } from "@mui/material";
import IDL from "../idl/basic_1.json";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { baseAccount } from "./Initialize";

interface DecrementProps {
  account: any;
  setAccount: React.Dispatch<React.SetStateAction<null>>;
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const Decrement: FC<DecrementProps> = (props) => {
  const { account, setCounter } = props;
  const wallet = useAnchorWallet() as Wallet;
  const decrement = useCallback(async () => {
    const network = clusterApiUrl("devnet");
    const connection = new Connection(network, "processed");
    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });

    const JSON_IDL = JSON.parse(JSON.stringify(IDL));
    const program = new Program(JSON_IDL, IDL.metadata.address, provider);

    try {
      program.methods
        .decrement()
        .accounts({
          myAccount: baseAccount.publicKey,
        })
        .rpc()
        .then(async () => {
          const account: any = await program.account.myAccount.fetch(
            baseAccount.publicKey
          );
          console.log("Counter : ", account.data.toString());
          setCounter(parseInt(account.data.toString()));
        });
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }, [baseAccount, wallet]);

  return (
    <Button
      variant="contained"
      onClick={decrement}
      sx={{ width: "90%" }}
      disabled={!account}
    >
      Decrement
    </Button>
  );
};

export { Decrement };
