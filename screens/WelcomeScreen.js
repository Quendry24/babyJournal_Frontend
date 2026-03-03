import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import ChildCard from "../components/ChildCard";
import { useEffect, useState } from "react";
import ItemDetailcard from "../components/ItemDetailCard";

export default function WelcomeScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");

  return (
    <Pressable
      className="flex-1 p-4 pt-16 bg-back"
      onPress={() => navigation.navigate("TabNavigator")}
    >
      <Text className="text-green-500 text-3xl pb-4">WelcomeScreen</Text>
      <View className="border ">
        <Input title="Nom" value={nom} onChangeText={setNom} />
        <Input
          title="Password"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
        />
      </View>
      <ItemDetailcard />
    </Pressable>
  );
}
