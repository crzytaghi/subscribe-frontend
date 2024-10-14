import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSubscriptionContext } from "../hooks/useSubscriptionContext";
import { SubscriptionActionTypes } from "../actions/subscriptionActions";
import { Subscription } from "../context/SubscriptionContext";

const AddSubscriptionModal = () => {
  const { dispatch } = useSubscriptionContext();
  const [name, setSubscription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(true);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitForm = async () => {
    const subscription: Subscription = { name, date, amount };
    console.log({ name, date, amount });

    const response = await fetch(`http://localhost:3000/api/v1/subscriptions`, {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.log({ response });
    } else if (response.ok) {
      dispatch({
        type: SubscriptionActionTypes.CREATE_SUBSCRIPTIONS,
        payload: subscription,
      });
      setOpen(false);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 3,
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h4">Add Subscription</Typography>
          <TextField
            error={error}
            label="Subscription Name"
            variant="outlined"
            value={name}
            onChange={(e) => setSubscription(e.target.value)}
            helperText={error ? "Can't be blank" : null}
          />
          <TextField
            type="date"
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            label="amount"
            type="number"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
          <TextField
            type="submit"
            variant="outlined"
            onClick={handleSubmitForm}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default AddSubscriptionModal;
