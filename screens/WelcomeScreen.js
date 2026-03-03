import { Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View className="flex-1 p-4 pt-16">
      <Text className="text-red-500 text-3xl pb-4">WelcomeScreen</Text>
      <View className="p-8 border flex-row w-full items-center justify-between">
        <Text>Text</Text>
        <Text>Text</Text>
      </View>

      {/* Bouton pour aller vers l'écran enfant */}
      <TouchableOpacity
        onPress={() => navigation.navigate("AcceuilEnfant")}
        className="mt-6 bg-amber-700 rounded-xl py-4 items-center"
      >
        <Text className="text-white font-bold text-base">
          Voir fiche enfant
        </Text>
      </TouchableOpacity>

      {/* Bouton existant vers TabNavigator */}
      <TouchableOpacity
        onPress={() => navigation.navigate("TabNavigator")}
        className="mt-3 border border-gray-400 rounded-xl py-4 items-center"
      >
        <Text className="text-gray-700 font-bold text-base">
          Aller au TabNavigator
        </Text>
      </TouchableOpacity>
    </View>
  );
}
