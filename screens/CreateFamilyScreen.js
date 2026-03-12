import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import ChildCard from "../components/ChildCard";
import { useEffect, useState } from "react";
import ItemDetailcard from "../components/ItemDetailCard";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import { useDispatch, useSelector } from "react-redux";
import { setUserType, login } from "../reducers/user";

export default function CreateFamilyScreen({ navigation }) {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  // const [userId, setUserId] = useState("");

  const user = useSelector((state) => state.user.value.type);
  const userId = useSelector((state) => state.user.value.userId);

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleRegister = () => {
    if (!EMAIL_REGEX.test(email)) {
      setErrorEmail(true);
      return;
    }

    setErrorEmail(false);

    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/${user}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        Nom: nom,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((dataUser) => {
        console.log(dataUser);
        dispatch(setUserType("parents"));
        dispatch(
          login({
            email,
            Nom: nom,
            idFamille: dataUser.familyId,
            userId: dataUser.idParent,
          }),
        );
        navigation.navigate("Information");
        setEmail("");
        setPassword("");
        setNom("");
      });
  };

  return (
    <>
      {user === "parents" && (
        //************** SignUp parent **************
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

            {errorEmail && (
              <Text className="text-red-500 mt-2">
                Email ou mot de passe incorrect.
              </Text>
            )}

            <Input
              title="Nom de la famille"
              value={nom}
              onChangeText={setNom}
            />

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
              onPress={handleRegister}
            />
          </View>
        </View>
      )}
    </>
  );
}
