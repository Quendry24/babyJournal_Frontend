import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import ChildCard from "../components/ChildCard";
import { useEffect, useState } from "react";
import ItemDetailcard from "../components/ItemDetailCard";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";

export default function SignInScreen({ navigation, route }) {
  const { role } = route.params;
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    //************** SignIn parent **************
    <>
      {role === "parent" && (
        <View className="flex-1 pt-16 px-8 bg-back">
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
            <Text className=" text-4xl font-bold text-center pb-24">
              Se connecter
            </Text>
          </View>
          <View className="mb-30">
            <Input
              className="color-[#F9BC50]"
              title="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              title="Password"
              value={password}
              onChangeText={setPassword}
              isPassword={true}
            />
          </View>
          {role === "parent" && (
            <View className="w-80 h-16 self-center mt-16">
              <Button
                title="Se connecter"
                variant="jaune"
                textSize="lg"
                onPress={() => navigation.navigate.goBack()}
              />
            </View>
          )}
          //************** SIGNUP ASSITANTE MATERNELLE **************
          {role === "nounou" && (
            //************** SignIn Assistante maternelle **************
            <View className="w-80 h-16 self-center mt-16">
              <Button
                title="Se connecter"
                variant="ter"
                textSize="lg"
                onPress={() => navigation.navigate("Profile")}
              />
            </View>
          )}
        </View>
      )}
    </>
  );
}
