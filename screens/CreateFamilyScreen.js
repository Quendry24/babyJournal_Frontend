import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import ChildCard from "../components/ChildCard";
import { useEffect, useState } from "react";
import ItemDetailcard from "../components/ItemDetailCard";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function CreateFamilyScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  return (
    //************** CREER UNE FAMILLE **************
    <View className="flex-1 p-16 bg-back">
      <View className="flex-row  justify-between">
        <ButtonRetour
          title="Retour"
          variant="jaune"
          textSize="sm"
          onPress={() => navigation.goBack()}
        />
        <Text className="text-2xl text-right font-bold pb-16">
          Baby Journal
        </Text>
      </View>
      <View>
        <Text className="text-4xl font-bold text-center pb-24">
          Créer une famille
        </Text>
      </View>

      <View>
        <Input title="Email" value={email} onChangeText={setEmail} />
        <Input
          title="Nom de la famille"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          title="Password"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
        />
      </View>
      <View className="w-80 h-16 self-center mt-8">
        <Button
          title="Se connecter"
          variant="jaune"
          textSize="lg"
          onPress={() => navigation.navigate("Information")}
        />
      </View>
    </View>
  );
}
