import { createContext, useReducer } from "react";
import {
  Actions,
  SubscriptionActionTypes,
} from "../actions/subscriptionActions";

export type Subscription = {
  id?: number;
  name: string;
  date: string;
  amount: number;
};

export type State = {
  subscriptions: Subscription[];
};

const initialState: State = {
  subscriptions: [],
};

export type SubscriptionContextType = {
  state: State;
  dispatch: React.Dispatch<Actions>;
};

const subscriptionReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case SubscriptionActionTypes.GET_SUBSCRIPTIONS:
      return { subscriptions: action.payload };
    case SubscriptionActionTypes.CREATE_SUBSCRIPTIONS:
      return { subscriptions: [...state.subscriptions, action.payload] };
    case SubscriptionActionTypes.UPDATE_SUBSCRIPTIONS:
      return { subscriptions: [...state.subscriptions, action.payload] };
    case SubscriptionActionTypes.DELETE_SUBSCRIPTIONS:
      return {
        subscriptions: state.subscriptions.filter(
          (subscription) => subscription.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

type Children = {
  children: React.ReactNode;
};

export const SubscriptionContext =
  createContext<SubscriptionContextType | null>(null);

const SubscriptionContextProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(subscriptionReducer, initialState);

  return (
    <SubscriptionContext.Provider value={{ state, dispatch }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionContextProvider;
