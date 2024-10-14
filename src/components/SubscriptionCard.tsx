import { Avatar, Button, CardContent, Typography } from "@mui/material";
import {
  Actions,
  SubscriptionActionTypes,
} from "../actions/subscriptionActions";
import { Subscription } from "../context/SubscriptionContext";

type SubscriptionCardProps = Subscription & {
  dispatch: React.Dispatch<Actions>;
};

const SubscriptionCard = ({
  id,
  name,
  date,
  amount,
  dispatch,
}: SubscriptionCardProps) => {
  const formatDateValue = (input: string) => {
    const newDate = new Date(input);
    return newDate.toDateString();
  };

  const handleDelete = async () => {
    const sub = { id, name, date, amount };
    console.log({ sub });

    const response = await fetch(
      `http://localhost:3000/api/v1/subscriptions/${sub.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Error deleting entry");
    } else if (response.ok) {
      dispatch({
        type: SubscriptionActionTypes.DELETE_SUBSCRIPTIONS,
        payload: sub,
      });
    }
  };

  return (
    <CardContent
      sx={{
        display: "flex",
        gap: 10,
        justifyContent: "space-between",
        border: "1px solid gold",
      }}
    >
      <Avatar>H</Avatar>
      <Typography sx={{ width: 100 }}>{name}</Typography>
      <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
        {formatDateValue(date)}
      </Typography>
      <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
        {amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </Typography>
      <Button variant="contained" onClick={handleDelete}>
        Delete
      </Button>
    </CardContent>
  );
};

export default SubscriptionCard;
