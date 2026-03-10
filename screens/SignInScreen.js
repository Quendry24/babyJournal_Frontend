import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import ChildCard from "../components/ChildCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemDetailcard from "../components/ItemDetailCard";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import { setUserType, login, logout } from "../reducers/user";

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value.type);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  console.log("type user :", user);

  const handleConnection = () => {
    console.log("handleConnection déclenché");

    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/${user}/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        idFamille: idFamille,
      }),
    })
      .then((response) => response.json())
      .then((dataUser) => {
        console.log("réponse backend :", dataUser);

        if (dataUser.result) {
          dispatch(setUserType("user"));
          navigation.navigate("Tabnavigator");
          setEmail("");
          setPassword("");
        } else {
          dispatch(
            login({
              email: user.email,
              idFamille: user.idFamille,
              token: dataUser.token,
            }),
          );

          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.log("Erreur connexion :", error);
      });
  };

  const Logout = () => {
    dispatch(setUserType("user"));
    dispatch(logout());
  };

  // let userSection;
  // if (user.token) {
  //   userSection = (
  //     <div className={styles.logoutSection}>
  //       <button onClick={() => handleLogout()}>Logout</button>
  //       <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(logout())} />
  //     </div>
  //   );
  // }

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
