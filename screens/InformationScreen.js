import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";
import ChildCard from "../components/ChildCard";
import { useEffect, useState } from "react";
import ItemDetailcard from "../components/ItemDetailCard";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import { setUserType, infos } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

export default function InformationScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value.type);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [role, setRole] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [pajemploi, setPajemploi] = useState("");
  const [agrement, setAgrement] = useState("");

  const handleSaveInfos = () => {
    console.log("type user :", user);
    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/${user}/updateInfos`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom,
        prenom,
        role,
        birthday,
        address,
        contact,
        pajemploi,
        agrement,
      }),
    })
      .then((response) => response.json())
      .then((dataUser) => {
        console.log(dataUser);
        dispatch(setUserType("user"));
        dispatch(
          infos({
            nom,
            prenom,
            role,
            birthday,
            address,
            contact,
            pajemploi,
            agrement,
          }),
        );
        navigation.navigate("TabNavigator");
        setNom("");
        setPrenom("");
        setRole("");
        setBirthday("");
        setAddress("");
        setContact("");
        setPajemploi("");
        setAgrement("");
      });
  };
  return (
    //************** Information parent **************
    <>
      {user === "parents" && (
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
            <Text className="text-4xl font-bold text-center pb-8">
              Informations parents
            </Text>
          </View>

          <View className="mb-30">
            <Input
              className="color-[#F9BC50]"
              title="Nom"
              value={nom}
              onChangeText={setNom}
            />
            <Input
              className="jaune"
              title="Prénom"
              value={prenom}
              onChangeText={setPrenom}
            />
            <Input
              className="jaune"
              title="Rôle"
              value={role}
              onChangeText={setRole}
            />
            <Input
              className="jaune"
              title="Date de naissance"
              value={birthday}
              onChangeText={setBirthday}
            />
            <Input
              className="jaune"
              title="Adresse"
              value={address}
              onChangeText={setAddress}
            />
            <Input
              className="jaune"
              title="N° pajemploi"
              value={pajemploi}
              onChangeText={setPajemploi}
            />
          </View>
          <View className="w-80 h-16 self-center mt-8">
            <Button
              title="Se connecter"
              variant="jaune"
              textSize="lg"
              onPress={handleSaveInfos}
            />
          </View>
        </View>
      )}

      {user === "nounou" && (
        <View className="flex-1 p-16 bg-back">
          <View className="flex-row  justify-between">
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
            <Text className="text-4xl font-bold text-center pb-8">
              Informations Assistante maternelle
            </Text>
          </View>

          <View className="mb-30">
            <Input
              className="ter"
              title="Nom"
              value={nom}
              onChangeText={setNom}
            />
            <Input
              className="ter"
              title="Prénom"
              value={prenom}
              onChangeText={setPrenom}
            />

            <Input
              className="ter"
              title="Date de naissance"
              value={birthday}
              onChangeText={setBirthday}
            />
            <Input
              className="ter"
              title="Adresse"
              value={address}
              onChangeText={setAddress}
            />
            <Input
              className="ter"
              title="Contact"
              value={contact}
              onChangeText={setContact}
            />
            <Input
              className="ter"
              title="Agrément"
              value={agrement}
              onChangeText={setAgrement}
            />
          </View>
          <View className="w-80 h-16 self-center mt-8">
            <Button
              title="Se connecter"
              variant="ter"
              textSize="lg"
              onPress={handleSaveInfos}
            />
          </View>
        </View>
      )}
    </>
  );
}
