import { Pressable, StyleSheet, Text, View } from "react-native";

const PlaceItem = ({ place,onSelect }) => {
  return (
    <Pressable onPress={onSelect} >
      <View>
        <Image source={{uri:place.imageUri}} />
        <View>
          <Text>title</Text>
          <Text>address</Text>
        </View>
      </View>
    </Pressable>
  );
};
export default PlaceItem;

const styles = StyleSheet.create({
    
});
