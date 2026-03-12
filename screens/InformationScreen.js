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
import ItemDetailcard from "../components/ItemDetailCard";
import Button from "../components/Button";
import ButtonRetour from "../components/ButtonRetour";
import {
  setUserType,
  userId,
  infos,
  idFamille,
  addUserId,
} from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { DatePickerInput } from "react-native-paper-dates";

export default function InformationScreen({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value.type);
  const userId = useSelector((state) => state.user.value.userId);
  const idFamille = useSelector((state) => state.user.value.idFamille);
  const [famille, setFamille] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [role, setRole] = useState("");
  const [adresse, setAdresse] = useState("");
  const [contact, setContact] = useState("");
  const [pajemploi, setPajemploi] = useState("");
  const [agrement, setAgrement] = useState("");
  const [date, setDate] = useState(null);

  const handleSaveInfos = () => {
    console.log("type user :", user);
    console.log("idNounou", userId);

    fetch(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/${user}/updateInfos/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          famille: idFamille,
          nom,
          prenom,
          role,
          date,
          adresse,
          contact,
          pajemploi,
          agrement,
        }),
      },
    )
      .then((response) => response.json())
      .then((dataUser) => {
        console.log(dataUser);
        dispatch(
          infos({
            Famille: dataUser.Famille,
            Nom: dataUser.infos.Nom,
            Prenom: dataUser.infos.Prenom,
            Role: dataUser.infos.Role,
            Birthday: dataUser.infos.Birthday,
            Adresse: dataUser.infos.Adresse,
            Contacts: dataUser.Contact,
            PajEmploi: dataUser.infos.p,
          }),
        );
        setNom("");
        setPrenom("");
        setRole("");
        setDate("");
        setAdresse("");
        setContact("");
        setPajemploi("");
        setAgrement("");
        navigation.navigate("TabNavigator");
      });
  };
  return (
    //************** Information parent **************
    <View className="flex-1 pt-16 bg-back p-4">
      {user === "parents" && (
        <View className="flex-1 ">
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

          <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>
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

            <DatePickerInput
              style={{
                backgroundColor: "transparent",
                borderWidth: 1,
                marginBottom: 16,
              }}
              locale="fr"
              label="Date de naissance"
              value={date}
              onChange={setDate}
              inputMode="start"
            />

            <Input
              className="jaune"
              title="Adresse"
              value={adresse}
              onChangeText={setAdresse}
            />
            <Input
              className="jaune"
              title="N° pajemploi"
              value={pajemploi}
              onChangeText={setPajemploi}
            />
            <View className="w-80 h-16 self-center mt-8">
              <Button
                title="Se connecter"
                variant="jaune"
                textSize="lg"
                onPress={handleSaveInfos}
              />
            </View>
          </ScrollView>
        </View>
      )}

      {user === "nounou" && (
        <View className="flex-1 bg-back">
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

          <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>
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
              title="Adresse"
              value={adresse}
              onChangeText={setAdresse}
            />
            <DatePickerInput
              style={{
                backgroundColor: "transparent",
                borderWidth: 1,
                marginBottom: 16,
              }}
              locale="fr"
              label="Date de naissance"
              value={date}
              onChange={setDate}
              inputMode="start"
            />
            <Input
              className="jaune"
              title="N° pajemploi"
              value={pajemploi}
              onChangeText={setPajemploi}
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
            <View className="w-80 h-16 self-center mt-8">
              <Button
                title="Se connecter"
                variant="ter"
                textSize="lg"
                onPress={handleSaveInfos}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
