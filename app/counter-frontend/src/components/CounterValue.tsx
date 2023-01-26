import * as React from "react";
import { Box, Paper, Typography } from "@mui/material";

interface CounterValueProps {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const CounterValue: React.FC<CounterValueProps> = (props) => {
  const { counter, } = props;

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

export { CounterValue };
