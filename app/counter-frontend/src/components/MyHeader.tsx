import * as React from "react";
import { Box, Grid } from "@mui/material";
import { CounterValue } from "./CounterValue";
import { Initialize } from "./Initialize";
import { Update } from "./Update";
import { Decrement } from "./Decrement";
import { Increment } from "./Increment";
import { SendSOLToRandomAddress } from "./SendSOLToRandomAddress";

const MyHeader: React.FC = () => {
  const [account, setAccount] = React.useState(null);
  const [counter, setCounter] = React.useState(0);
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CounterValue counter={counter} setCounter={setCounter} />
        </Grid>
        <Grid item xs={6}>
          <Initialize
            counter={counter}
            setCounter={setCounter}
            account={account}
            setAccount={setAccount}
          />
        </Grid>
        <Grid item xs={6}>
          <Update
            counter={counter}
            setCounter={setCounter}
            account={account}
            setAccount={setAccount}
          />
        </Grid>
        <Grid item xs={6}>
          <Increment
            counter={counter}
            setCounter={setCounter}
            account={account}
            setAccount={setAccount}
          />
        </Grid>
        <Grid item xs={6}>
          <Decrement
            counter={counter}
            setCounter={setCounter}
            account={account}
            setAccount={setAccount}
          />
        </Grid>
        <Grid item xs={12}>
          <SendSOLToRandomAddress />
        </Grid>
      </Grid>
    </Box>
  );
};

export { MyHeader };
