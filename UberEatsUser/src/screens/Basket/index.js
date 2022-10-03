import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
// import restaurants from "../../../assets/data/restaurants.json";
import BasketDishItem from "../../components/BasketDishItem";
import { useNavigation } from "@react-navigation/native"
import { useBasketContext } from "../../contexts/BasketContext";
import { useOrderContext } from "../../contexts/OrderContext";

// const restaurant = restaurants[0];

const Basket = () => {
  const { restaurant, basketDishes, totalPrice } = useBasketContext();
  const { createOrder } = useOrderContext()
  const navigation = useNavigation()

  const onCreateOrder = async () => {
    const newOrder = await createOrder()
    navigation.navigate("OrdersTab", {
      screen: "Order",
      params: { id: newOrder.id }
    })
  }

  return (
    <View style={styles.page}>
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 19 }}>
        Your Items
      </Text>

      <FlatList
        data={basketDishes}
        renderItem={({ item }) => <BasketDishItem basketDish={item} />}
      />

      <View style={styles.separator} />

      <Pressable onPress={onCreateOrder} style={styles.button}>
        <Text style={styles.buttonText}>
          Create Order &#8226; $ {totalPrice.toFixed(2)}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 40,
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  description: {
    color: "gray",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgray",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 25,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  quantityContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});

export default Basket;
