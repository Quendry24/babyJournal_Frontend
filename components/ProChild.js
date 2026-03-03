import { Text, View } from "react-native";

export default function ProChild({ childName }) {
  return (
    <View>
      <Text>{childName}</Text>;
    </View>
  );
}
