import { Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("TabNavigator")}
      className="flex-1  p-4 pt-16 "
    >
      <Text className="text-red-500 text-3xl pb-4">WelcomeScreen</Text>
      <View className="p-8 border flex-row w-full items-center justify-between ">
        <Text>Text</Text>
        <Text>Text</Text>
      </View>
    </TouchableOpacity>
  );
}
