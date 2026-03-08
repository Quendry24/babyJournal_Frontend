import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Input from "./Input";
import { Baby } from "lucide-react-native";
import Button from "./Button";
import { useState } from "react";

import { useSelector } from "react-redux";
import { DatePickerInput, DatePickerModal } from "react-native-paper-dates";

export default function AddChild() {
  const user = useSelector((state) => state.user.value.type); // a mettre dans le store a la connexion
  const [date, setDate] = useState(null);
  const [nom, setNom] = useState(null);
  const [prenom, setPrenom] = useState(null);
  const [open, setOpen] = useState(false);
  const idNounou = useSelector((state) => state.user.value.userId);

  const addChild = () => {
    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/enfants/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Nom: nom,
        Prenom: prenom,
        Birthday: date,
        idNounou,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const date2 = new Date(data.Birthday).toLocaleDateString("fr-FR");
        data && console.log(data.idBabyJournal, date, date2);
        setNom("");
        setPrenom("");
        setDate("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <View className="flex-1 items-center">
      <Text className="text-3xl">Création profil enfant</Text>
      {user === "Parents" && (
        <View className="my-4 w-20 items-center justify-center aspect-square rounded-full border-2 border-jaune">
          <Baby size={65} color="gray" />
        </View>
      )}
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        <View className="flex-1 h-15">
          <Input
            title="Nom"
            type="familyName"
            value={nom}
            onChangeText={setNom}
          />
          <Input
            title="Prénom"
            type="name"
            value={prenom}
            onChangeText={setPrenom}
          />
          {user === "Parents" && <Input title="Poids" inputMode="numeric" />}
          <View
            style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
          >
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
          </View>
          {user === "Parents" && (
            <>
              <Input title="Adresse" type="fullStreetAddress" />
              <Input title="Code Postal" type="postalCode" />
              <Input title="Ville" type="addressCity" />
              <Input title="Contact" />
              <Input title="Allergies" />
              <Input title="Vaccins" />
            </>
          )}
        </View>
        <View className="h-14 mb-36">
          <Button title="Ajouter un enfants" onPress={() => addChild()} />
        </View>
      </ScrollView>
    </View>
  );
}
