// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TransportationModes = {
  "DRIVING": "DRIVING",
  "BICYCLING": "BICYCLING"
};

const OrderStatus = {
  "NEW": "NEW",
  "COOKING": "COOKING",
  "ACCEPTED": "ACCEPTED",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "DECLINED_BY_RESTAURANT": "DECLINED_BY_RESTAURANT"
};

const { Courier, Basket, BasketDish, Dish, OrderDish, Order, Restaurant, User } = initSchema(schema);

export {
  Courier,
  Basket,
  BasketDish,
  Dish,
  OrderDish,
  Order,
  Restaurant,
  User,
  TransportationModes,
  OrderStatus
};