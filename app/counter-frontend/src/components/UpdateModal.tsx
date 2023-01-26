import { Modal, TextField, Box, Grid, Button } from "@mui/material";
import * as React from "react";

interface UpdateModalProps {
  modalState: boolean;
  handleModalClose: () => void;
  input: number | undefined;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: (num: number) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = (props) => {
  //   const [modalState, setModalState] = React.useState(false);
  //   const handleModalOpen = () => setModalState(true);
  //   const handleModalClose = () => setModalState(false);
  //   const [input, setInput] = React.useState<number>();
  //   const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setInput(parseInt(e.target.value));
  //   };
  const { modalState, handleModalClose, input, onInputChange, handleUpdate } =
    props;
  return (
    <Modal
      open={modalState}
      onClose={handleModalClose}
      aria-labelledby="update counter"
      aria-describedby="enter number"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#282c34",
          border: "2px solid aliceblue",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          "@media(max-width: 600px)": {
            width: "75%",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{flexGrow: 1}}>
            <TextField
              id="outlined-basic"
              label="Enter counter value"
              variant="outlined"
              value={input}
              type="number"
              onChange={(e) => {
                onInputChange(e as React.ChangeEvent<HTMLInputElement>);
              }}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            >
            <Button
              variant="outlined"
              onClick={() => {
                handleModalClose();
                handleUpdate(input as number);
              }}
              sx={{ "@media(max-width: 600px)": { right: "-35%" } }}
              >
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export { UpdateModal };
