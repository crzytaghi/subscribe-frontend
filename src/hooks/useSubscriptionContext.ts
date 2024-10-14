import { useContext } from "react";
import { SubscriptionContext } from "../context/SubscriptionContext";

export const useSubscriptionContext = () => {
  const context = useContext(SubscriptionContext);

  if (!context)
    throw new Error(
      "Subscription Context must be used within a SubscriptionContextProvider"
    );

  return context;
};
