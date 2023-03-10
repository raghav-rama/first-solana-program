import { FC, useCallback } from "react";
import * as React from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { BN, Program, AnchorProvider, Wallet } from "@project-serum/anchor";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import IDL from "../idl/basic_1.json";
import { Button } from "@mui/material";
import { baseAccount } from "./Initialize";
import { UpdateModal } from "./UpdateModal";

interface UpdateProps {
  account: any;
  setAccount: React.Dispatch<React.SetStateAction<null>>;
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const Update: FC<UpdateProps> = (props) => {
  const { account, setCounter } = props;
  const [modalState, setModalState] = React.useState(false);
  const handleModalOpen = () => setModalState(true);
  const handleModalClose = () => setModalState(false);
  const [input, setInput] = React.useState<number>();
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(parseInt(e.target.value));
  };

  const wallet = useAnchorWallet() as Wallet;
  const network = clusterApiUrl("devnet");
  const connection = new Connection(network, "processed");
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });

  const IDL_JSON = JSON.parse(JSON.stringify(IDL));
  const program = new Program(IDL_JSON, IDL.metadata.address, provider);

  const handleUpdate = (num: number) => {
    update(num)
      .then(() => {
        setInput(undefined);
      }); 
  };

  const update = useCallback(
    async (num: number) => {
      try {
        program.methods
          .update(new BN(num))
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
        console.log("Transaction error", err);
      }
    },
    [baseAccount, wallet]
  );

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleModalOpen}
        sx={{ width: "90%" }}
        disabled={!account}
      >
        Update
      </Button>
      <UpdateModal
        modalState={modalState}
        handleModalClose={handleModalClose}
        input={input}
        onInputChange={onInputChange}
        handleUpdate={handleUpdate}
      />
    </React.Fragment>
  );
};

export { Update };
