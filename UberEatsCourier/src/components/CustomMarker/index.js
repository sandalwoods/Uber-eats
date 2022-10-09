import { Marker } from "react-native-maps";
import { View } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const CustomMarker = ({ data, type }) => {
  return (
    <Marker
      title={data.name}
      description={data.address}
      coordinate={{
        latitude: data.lat,
        longitude: data.lng,
      }}
    >
      <View style={{ backgroundColor: "green", padding: 5, borderRadius: 20 }}>
        {type === "RESTAURANT" ? (
          <Entypo name="shop" size={24} color="white" />
        ) : (
          <MaterialIcons name="restaurant" size={24} color="white" />
        )}
      </View>
    </Marker>
  );
};

export default CustomMarker;
