import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import ChildCard from "../components/ChildCard";

export default function WelcomeScreen({ navigation }) {
  return (
    <View className="flex-1  p-4 pt-16 bg-back">
      <Text className="text-green-500 text-3xl pb-4">Welcome Screen</Text>

      <Pressable>
        <ChildCard />
      </Pressable>
    </View>
  );
}
