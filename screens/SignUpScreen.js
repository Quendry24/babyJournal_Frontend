import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import ChildCard from "../components/ChildCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemDetailcard from "../components/ItemDetailCard";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function SignUpScreen({ navigation, route }) {
  {
    /* ************** SignUp Parent ************** */
  }
  const dispatch = useDispatch();
  const nounou = useSelector((state) => state.nounou.value);

  const { role } = route.params;

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleNounouRegister = () => {
    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((nounou) => {
        dispatch(SignUp({ email: email, token: nounou.token }));
        console.log("reponse du backend");
        navigation.navigate("Information", { role: "nounou" });
        setEmail("");
        setPassword("");
      });
  };

  return (
    <>
      {role === "parent" && (
        <View className="flex-1 pt-16 px-8 bg-back">
          <View className="flex-row justify-between">
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
              Inscription
            </Text>
          </View>

          <View className="mb-30">
            <Input title="Email" value={email} onChangeText={setEmail} />
            <Input
              title="Password"
              value={password}
              onChangeText={setPassword}
              isPassword={true}
            />
          </View>

          <View className="w-80 h-16 self-center mt-16">
            <Button
              title="Créer mon profil parent"
              variant="jaune"
              textSize="lg"
              onPress={() =>
                navigation.navigate("Information", { role: "parent" })
              }
            />
          </View>
        </View>
      )}

      {/* ************** SignUp Nounou ************** */}
      {role === "nounou" && (
        <View className="flex-1 pt-16 px-8 bg-back">
          <View className="flex-row justify-between">
            <ButtonRetour
              title="Retour"
              variant="ter"
              textSize="sm"
              onPress={() => navigation.goBack()}
            />

            <Text className="text-2xl text-right font-bold pb-16">
              Baby Journal
            </Text>
          </View>

          <View>
            <Text className="text-4xl font-bold text-center pb-24">
              Inscription
            </Text>
          </View>

          <View className="mb-30">
            <Input title="Email" value={email} onChangeText={setEmail} />
            <Input
              title="Password"
              value={password}
              onChangeText={setPassword}
              isPassword={true}
            />
          </View>

          <View className="w-80 h-16 self-center mt-16">
            <Button
              title="Créer mon profil pro"
              variant="ter"
              textSize="lg"
              onPress={() => handleNounouRegister()}
            />
          </View>
        </View>
      )}
    </>
  );
}
