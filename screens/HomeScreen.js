import { Text, View, ScrollView } from "react-native";
import ChildCard from "../components/ChildCard";

export default function HomeScreen() {
  return (
    <View className="flex-1 px-3 items-center justify-center bg-back">
      <Text className="text-white text-2xl font-bold">
        NativeWind fonctionne ! 🎉
      </Text>
      <ChildCard />
    </View>
  );
}
