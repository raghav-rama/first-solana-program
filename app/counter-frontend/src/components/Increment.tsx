import { FC, useCallback } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Button } from "@mui/material";
import { baseAccount } from "./Initialize";
import IDL from "../idl/basic_1.json";

interface IncrementProps {
  account: any;
  setAccount: React.Dispatch<React.SetStateAction<null>>;
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const Increment: FC<IncrementProps> = (props) => {
  const { account, setCounter } = props;
  const wallet = useAnchorWallet() as Wallet;
  const increment = useCallback(async () => {
    const network = clusterApiUrl("devnet");
    const connection = new Connection(network, "processed");
    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });

    const IDL_JSON = JSON.parse(JSON.stringify(IDL));
    const program = new Program(IDL_JSON, IDL.metadata.address, provider);

    try {
      program.methods
        .increment()
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
      console.log("Transaction err: ", err);
    }
  }, [baseAccount, wallet]);

  return (
    <Button
      variant="contained"
      onClick={increment}
      sx={{ width: "90%" }}
      disabled={!account}
    >
      Increment
    </Button>
  );
};

export { Increment };
