import { StyleSheet, FlatList, View } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
// import restaurants from "../../../assets/data/restaurants.json";
import { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Restaurant } from "../../models";

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);

  // const fetchRestaurants = async () => {
  //   const results = await DataStore.query(Restaurant)
  //   setRestaurants(results)
  // }
  useEffect(() => {
    // fetchRestaurants()
    // DataStore.query(Restaurant).then((results) => setRestaurants(results))
    DataStore.query(Restaurant).then(setRestaurants);
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
    paddingVertical: 30,
  },
});
