import { FC, } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { web3, Program, AnchorProvider, Wallet } from "@project-serum/anchor";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import IDL from "../idl/basic_1.json";
import { Button } from "@mui/material";

const baseAccount = web3.Keypair.generate();

interface InitializeProps {
  account: any;
  setAccount: React.Dispatch<React.SetStateAction<null>>;
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const Initialize: FC<InitializeProps> = (props) => {
  const { account, setAccount, } = props;
  const wallet = useAnchorWallet() as Wallet;
  const initialize = async () => {
    const network = clusterApiUrl("devnet");
    const connection = new Connection(network, "processed");
    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });

    const IDL_JSON = JSON.parse(JSON.stringify(IDL));
    const program = new Program(IDL_JSON, IDL.metadata.address, provider);

    try {
      program.methods
        .initialize()
        .accounts({
          myAccount: baseAccount.publicKey,
          user: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .signers([baseAccount])
        .rpc()
        .then(async () => {
          const _account: any = await program.account.myAccount.fetch(
            baseAccount.publicKey
          );
          setAccount(_account);
        });
    } catch (err) {
      console.log("Transaction error", err);
    }
  };
  return (
    <Button
      variant="contained"
      onClick={initialize}
      sx={{ width: "90%" }}
      disabled={account}
    >
      Initialize
    </Button>
  );
};

export { Initialize, baseAccount };
