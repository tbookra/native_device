import { StyleSheet, View, Alert } from "react-native";
import OutlinedButton from "../../UI/OutlinedButton";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { Colors } from "../../constants/colors";

const LocationPicker = () => {
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  const verifyPermissions = async () => {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need the camera to use this app"
      );
      return false;
    }
    return true;
  };
  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    const location = await getCurrentPositionAsync();
    console.log(location);
  };
  const pickOnMapHandler = () => {};
  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
