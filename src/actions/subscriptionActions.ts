import { Subscription } from "../context/SubscriptionContext";

export enum SubscriptionActionTypes {
  GET_SUBSCRIPTIONS = "GET_SUBSCRIPTIONS",
  CREATE_SUBSCRIPTIONS = "CREATE_SUBSCRIPTIONS",
  UPDATE_SUBSCRIPTIONS = "UPDATE_SUBSCRIPTIONS",
  DELETE_SUBSCRIPTIONS = "DELETE_SUBSCRIPTIONS",
}

export type GetSubscription = {
  type: SubscriptionActionTypes.GET_SUBSCRIPTIONS;
  payload: Subscription[];
};

export type CreateSubscription = {
  type: SubscriptionActionTypes.CREATE_SUBSCRIPTIONS;
  payload: Subscription;
};

export type UpdateSubscription = {
  type: SubscriptionActionTypes.UPDATE_SUBSCRIPTIONS;
  payload: Subscription;
};

export type DeleteSubscription = {
  type: SubscriptionActionTypes.DELETE_SUBSCRIPTIONS;
  payload: Subscription;
};

export type Actions =
  | GetSubscription
  | CreateSubscription
  | UpdateSubscription
  | DeleteSubscription;
