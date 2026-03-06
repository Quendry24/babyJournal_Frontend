import { View, Text, Pressable } from "react-native";
import ButtonRetour from "../components/ButtonRetour";
export default function SettingsScreen(OnBack) {
  return (
    <View className="flex-1 bg-back">
      <Pressable className="pt-16 pl-4">
        <ButtonRetour onPress={OnBack} />
      </Pressable>
      <View className="flex-1 bg-back items-center ">
        <Text className="pt-4 pb-2 text-center text-black text-4xl font-bold">
          Paramètres
        </Text>
        <Pressable>
          <Text>Partager mon Baby Journal</Text>
        </Pressable>
      </View>
    </View>
  );
}
