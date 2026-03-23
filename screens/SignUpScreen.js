import { Text, View } from "react-native";
import Input from "../components/Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import { addUserId, login, setUserType } from "../reducers/user";

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value.type);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log("type user :", user);

  const handleRegister = () => {
    console.log("handleRegister déclenché");
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
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((dataUser) => {
        if (dataUser.result) {
          console.log("réponse backend :", dataUser);
          dispatch(
            login({
              userId: dataUser.idNounou,
              email,
            }),
          );
          dispatch(addUserId(dataUser.idNounou));
          setEmail("");
          setPassword("");
          navigation.navigate("Information");
        }
      })
      .catch((error) => {
        console.log("Erreur fetch :", error);
      });
  };

  return (
    <View className="flex-1 pt-16 p-4 bg-back">
      {user === "parents" && (
        <View className="flex-1">
          <View className=" flex-row  justify-between">
            <ButtonRetour
              title="Retour"
              variant="jaune"
              textSize="sm"
              onPress={() => navigation.goBack()}
            />
            <Text className=" text-2xl text-right font-bold pb-16">
              Baby Journal
            </Text>
          </View>
          <View className="">
            <Text className=" text-4xl font-bold text-center pb-8">
              Inscription
            </Text>
          </View>

          <Text className=" text-xl font-bold text-center ">
            Vous voulez créer une famille ?
          </Text>
          <View className=" w-80 h-16 self-center mt-16">
            <Button
              className="border"
              title="Je créer une famille"
              variant="jaune"
              textSize="lg"
              onPress={() => {
                dispatch(setUserType("parents"));
                navigation.navigate("CreateFamily");
              }}
            />
          </View>

          <View className="border m-16"></View>

          <Text className=" text-xl font-bold text-center">
            Vous voulez rejoindre une famille existante ?
          </Text>
          <View className=" w-80 h-16 self-center mt-16">
            <Button
              title="Rejoindre une famille"
              variant="outlineJaune"
              textSize="lg"
              onPress={() => {
                dispatch(setUserType("parents"));
                navigation.navigate("JoinFamily");
              }}
            />
          </View>
        </View>
      )}

      {user === "nounou" && (
        <View className="flex-1">
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
            {errorEmail && (
              <Text className="text-red-500 mt-2">
                Email ou mot de passe incorrect.
              </Text>
            )}

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
              onPress={() => {
                handleRegister();
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}
