import { useEffect } from "react";
import { Subscription } from "./context/SubscriptionContext";
import { useSubscriptionContext } from "./hooks/useSubscriptionContext";
import { SubscriptionActionTypes } from "./actions/subscriptionActions";
import SubscriptionCard from "./components/SubscriptionCard";
import AddSubscriptionModal from "./components/AddSubscriptionModal";

function App() {
  const { state, dispatch } = useSubscriptionContext();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/subscriptions"
      );
      const json = await response.json();
      console.log({ response, json });
      dispatch({
        type: SubscriptionActionTypes.GET_SUBSCRIPTIONS,
        payload: json,
      });
    };

    fetchSubscriptions();
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        width: "100%",
      }}
    >
      <h1>Subscription Tracker</h1>
      <div>Total: </div>
      <AddSubscriptionModal />
      <div
        style={{
          height: "75vh",
          overflow: "scroll",
          maxWidth: 720,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {state &&
          state.subscriptions.map((subscription: Subscription) => (
            <SubscriptionCard
              {...subscription}
              key={subscription.id}
              dispatch={dispatch}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
