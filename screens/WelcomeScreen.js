import { Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";

export default function WelcomeScreen({ navigation }) {
  return (
    <TouchableOpacity className="flex-1  p-4 pt-16 ">
      <Text className="text-green-500 text-3xl pb-4">WelcomeScreen</Text>
      <View className="border ">
        <Input title="Email" />
      </View>
    </TouchableOpacity>
  );
}
