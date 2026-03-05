import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import ChildCard from "../components/ChildCard";
import { useEffect, useState } from "react";
import ItemDetailcard from "../components/ItemDetailCard";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";

export default function JoinFamilyScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [idFamilly, setIdFamily] = useState("");
  return (
    //************** Rejoindre une famille **************
    <View className="flex-1 pt-16 px-8 bg-back">
      <View>
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
            Rejoindre une famille
          </Text>
        </View>

        <View className="mb-30">
          <Input
            className="jaune"
            title="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            className="jaune"
            title="ID de la famille"
            value={idFamilly}
            onChangeText={setIdFamily}
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
            onPress={() => navigation.navigate("Profil")}
          />
        </View>
      </View>
    </View>
  );
}
