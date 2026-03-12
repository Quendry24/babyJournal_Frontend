import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "../components/Input";
import ChildCard from "../components/ChildCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemDetailcard from "../components/ItemDetailCard";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import { login, setIdFamille, setUserType } from "../reducers/user";

export default function JoinFamilyScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value.type);
  const [errorEmail, setErrorEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [idFamily, setIdFamily] = useState("");

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleRegister = () => {
    if (!EMAIL_REGEX.test(email)) {
      setErrorEmail(true);
      return;
    }

    setErrorEmail(false);

    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/${user}/signUp/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        idFamily,
      }),
    })
      .then((response) => response.json())
      .then((dataUser) => {
        if (dataUser.result) {
          console.log(dataUser);
          dispatch(setUserType("parents"));
          dispatch(setIdFamille(dataUser.familyId));
          dispatch(
            login({
              email,
              // Nom: nom,
              idFamille: dataUser.familyId,
              userId: dataUser.idParent,
            }),
          );
          dispatch(addUserId(dataUser.idParent));
          navigation.navigate("Information");
          setEmail("");
          setPassword("");
          setIdFamily("");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    //************** Rejoindre une famille **************

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
      <ScrollView contentContainerStyle={{ paddingBottom: 350 }}>
        <View>
          <Text className="text-4xl font-bold text-center pb-24">
            Rejoindre une famille
          </Text>
          <Text className="text-xl font-bold text-center pb-24">
            Inscription
          </Text>
        </View>

        <View className="mb-30">
          <Input
            className="jaune"
            title="Email"
            value={email}
            onChangeText={setEmail}
          />

          {errorEmail && (
            <Text className="text-red-500 mt-2">
              Email ou mot de passe incorrect.
            </Text>
          )}

          <Input
            className="jaune"
            title="ID de la famille"
            value={idFamily}
            onChangeText={setIdFamily}
          />
          <Input
            title="mot de passe"
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
            onPress={() => handleRegister()}
          />
        </View>
      </ScrollView>
    </View>
  );
}
