import { View, Text } from "react-native";

export default function FolderScreen() {
  return (
    <View className="flex-1  p-4 pt-16 bg-back">
      <Text className="pt-4 pb-2 text-center text-black text-4xl font-bold">
        Documents
      </Text>

      <Text className="text-2xl">Fichiers</Text>
      <Text className="text-2xl">Photos</Text>
    </View>
  );
}
