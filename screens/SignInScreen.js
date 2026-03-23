import { Text, View } from "react-native";
import Input from "../components/Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import { login, addUserId } from "../reducers/user";

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorAuth, setErrorAuth] = useState(false);

  const user = useSelector((state) => state.user.value.type);

  console.log("type user :", user);

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleConnection = () => {
    if (!EMAIL_REGEX.test(email)) {
      setErrorAuth(true);
      return;
    }
    setErrorAuth(false);

    console.log("fetch type:", typeof fetch);
    console.log("handleConnection déclenché");

    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/${user}/signIn`, {
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
          dispatch(addUserId(dataUser.userId));
          dispatch(
            login({
              userId: dataUser.userId,
              email: dataUser.email,
            }),
          );
          navigation.navigate("TabNavigator");
          setEmail("");
        } else {
          console.log(dataUser.error);
        }
      })
      .catch((error) => {
        console.log("Erreur connexion :", error);
      });
  };

  return (
    <>
      {/* ************** SignIn parent ************** */}
      {user === "parents" && (
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
              Se connecter
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
              title="Se connecter"
              variant="jaune"
              textSize="lg"
              onPress={handleConnection}
            />
          </View>
        </View>
      )}

      {user === "nounou" && (
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

          <Text className="text-4xl font-bold text-center pb-24">
            Se connecter
          </Text>

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
              title="Se connecter"
              variant="ter"
              textSize="lg"
              onPress={handleConnection}
            />
          </View>
        </View>
      )}
    </>
  );
}
