import { FC, useCallback } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  BN,
  Program,
  AnchorProvider,
  Wallet,
} from "@project-serum/anchor";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import IDL from "../idl/basic_1.json";
import { Button } from "@mui/material";
import { baseAccount } from "./Initialize";

const Update: FC = () => {
  const wallet = useAnchorWallet() as Wallet;
  const update = useCallback(async () => {
    const network = clusterApiUrl("devnet");
    const connection = new Connection(network, "processed");
    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });

    const IDL_JSON = JSON.parse(JSON.stringify(IDL));
    const program = new Program(IDL_JSON, IDL.metadata.address, provider);

    try {
      program.methods
        .update(new BN(50))
        .accounts({
          myAccount: baseAccount.publicKey,
        })
        .rpc();

      const account: any = await program.account.myAccount.fetch(
        baseAccount.publicKey
      );
      console.log("Counter: ", account.data.toString());
    } catch (err) {
      console.log("Transaction error", err);
    }
  }, [baseAccount, wallet]);
  return (
    <Button variant="contained" onClick={update} sx={{ width: "90%" }}>
      Update
    </Button>
  );
};

export { Update };