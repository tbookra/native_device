import { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../../UI/OutlinedButton";

const ImagePicker = () => {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState("");
  const verifyPermissions = async () => {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need the camera to use this app"
      );
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
    // console.log("image",  image.assets[0]);
  };
  console.log("pickedImage", pickedImage);
  return (
    <View>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        ) : (
          <Text>No Image taken yet</Text>
        )}
      </View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
