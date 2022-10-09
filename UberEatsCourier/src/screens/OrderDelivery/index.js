import { View, useWindowDimensions, ActivityIndicator } from "react-native";
import { useRef, useEffect, useState } from "react";
// import orders from "../../../assets/data/orders.json";
import styles from "./styles";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useOrderContext } from "../../contexts/OrderContext";
import BottomSheetDetails from "./BottomSheetDetails";
import CustomMarker from "../../components/CustomMarker";
import { useAuthContext } from "../../contexts/AuthContext";
import { DataStore } from "aws-amplify";
import { Courier } from "../../models";

//user location
//37.322998
//-122.032182

// const order = orders[0];

// const ORDER_STATUSES = {
//   READY_FOR_PICKUP: "READY_FOR_PICKUP",
//   ACCEPTED: "ACCEPTED",
//   PICKED_UP: "PICKED_UP",
// };

const OrderDeliveryScreen = () => {
  const { fetchOrder, order, user } = useOrderContext();
  const { dbCourier } = useAuthContext();

  const mapRef = useRef(null);

  const { width, height } = useWindowDimensions();

  const [driverLocation, setDriverLocation] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalKm, setTotalKm] = useState(0);
  // const [deliveryStatus, setDeliveryStatus] = useState(
  //   ORDER_STATUSES.READY_FOR_PICKUP
  // );

  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  useEffect(() => {
    if (!driverLocation) {
      return;
    }
    DataStore.save(
      Courier.copyOf(dbCourier, (updated) => {
        updated.lat = driverLocation.latitude;
        updated.lng = driverLocation.longitude;
      })
    );
  }, [driverLocation]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (!status === "granted") {
        console.log("Nonono");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setDriverLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();

    const foregroundSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 500,
      },
      (updatedLocation) => {
        setDriverLocation({
          latitude: updatedLocation.coords.latitude,
          longitude: updatedLocation.coords.longitude,
        });
      }
    );
    return foregroundSubscription;
  }, []);

  const zoomInOnDriver = () => {
    mapRef.current.animateToRegion({
      latitude: driverLocation.latitude,
      longitude: driverLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const restaurantLocation = {
    latitude: order?.Restaurant?.lat,
    longitude: order?.Restaurant?.lng,
  };
  const deliveryLocation = {
    latitude: user?.lat,
    longitude: user?.lng,
  };

  if (!order || !user || !driverLocation) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{
          height,
          width,
        }}
        showsUserLocation
        followsUserLocation
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
      >
        <MapViewDirections
          origin={driverLocation}
          destination={
            order.status === "ACCEPTED" ? restaurantLocation : deliveryLocation
          }
          strokeWidth={10}
          waypoints={
            order.status === "READY_FOR_PICKUP" ? [restaurantLocation] : []
          }
          strokeColor="#3FC060"
          apikey={"AIzaSyCzJf6enhqKUD3BQqkAjYZ9mTl7GYRV4q0"}
          onReady={(result) => {
            // setIsDriverClose(result.distance <= 0.1);
            setTotalMinutes(result.duration);
            setTotalKm(result.distance);
          }}
        />
        <CustomMarker data={order.Restaurant} type="RESTAURANT" />
        <CustomMarker data={user} type="USER" />
      </MapView>

      <BottomSheetDetails
        totalKm={totalKm}
        totalMinutes={totalMinutes}
        onAccepted={zoomInOnDriver}
      />

      {order.status === "READY_FOR_PICKUP" && (
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back-circle"
          size={45}
          color="black"
          style={{ top: 40, left: 15, position: "absolute" }}
        />
      )}
    </View>
  );
};

export default OrderDeliveryScreen;
