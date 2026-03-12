import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Input from "./Input";
import { Baby } from "lucide-react-native";
import Button from "./Button";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { DatePickerInput } from "react-native-paper-dates";
import { getAllChilds } from "../reducers/user";

export default function AddChild({ infos = {}, setAdd, setAddChild }) {
  const user = useSelector((state) => state.user.value.type); // a mettre dans le store a la connexion
  const [date, setDate] = useState(
    infos.Birthday ? new Date(infos.Birthday) : null,
  );
  const [nom, setNom] = useState(infos.Nom || null);
  const [prenom, setPrenom] = useState(infos.Prenom || null);
  const idNounou = useSelector((state) => state.user.value.userId);
  const allChilds = useSelector((state) => state.user.value.all);
  console.log(infos);
  const [poids, setPoids] = useState(infos.Poids || null);
  const [adresse, setAdresse] = useState(infos.Adresse?.[0]?.Rue || null);
  const [codePostal, setCodePostal] = useState(
    infos.Adresse?.[0]?.Code_Postal || null,
  );
  const [ville, setVille] = useState(infos.Adresse?.[0]?.Ville || null);
  const [numContact, setNumContact] = useState(infos.Contacts?.numero || null);
  const [nomContact, setNomContact] = useState(infos.Contacts?.nom || null);
  const [allergies, setAllergies] = useState(infos.Allergies || []);
  const [vaccins, setVaccins] = useState(infos.Vaccins || []);

  const dispatch = useDispatch();

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
        const child = {
          Prenom: data.newChild.Prenom,
          idBabyJournal: data.newChild.idBabyJournal,
        };
        console.log(data.newChild);
        data && dispatch(getAllChilds([...allChilds, child]));
        setNom("");
        setPrenom("");
        setDate(null);
        setAdd(false);
      })
      .catch((err) => console.log(err));
  };

  const updateChild = () => {
    const contact = {
      nom: nomContact,
      numero: numContact,
    };

    fetch(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/enfants/update/${infos.idBabyJournal}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Poids: poids,
          Adresse: [{ Rue: adresse, Ville: ville, Code_Postal: codePostal }],
          Contacts: contact,
          Allergies: allergies.length > 0 ? allergies : [],
          Vaccins: vaccins.length > 0 ? vaccins : [],
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          // mets a jour l'enfant dans le tableau du reducer
          const updatedChilds = allChilds.map((child) =>
            child.idBabyJournal === infos.idBabyJournal
              ? { ...child, ...data.updatedChild }
              : child,
          );
          dispatch(getAllChilds(updatedChilds));
          setAdd(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View className="flex-1 items-center max-w-full">
      <Text className="text-3xl">Profil enfant</Text>
      {user === "parents" && (
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
          {user === "parents" && (
            <Input
              title="Poids"
              inputMode="numeric"
              value={poids}
              onChangeText={setPoids}
            />
          )}
          {user === "parents" && (
            <>
              <Input
                title="Adresse"
                type="fullStreetAddress"
                value={adresse}
                onChangeText={setAdresse}
              />
              <Input
                title="Code Postal"
                type="postalCode"
                value={codePostal}
                onChangeText={setCodePostal}
                inputMode="numeric"
              />
              <Input
                title="Ville"
                type="addressCity"
                value={ville}
                onChangeText={setVille}
              />
              <Text>Contacts :</Text>
              <View className="flex-row w-full gap-2">
                <View className="flex-1">
                  <Input
                    title="Nom"
                    value={nomContact}
                    onChangeText={setNomContact}
                  />
                </View>
                <View className="flex-1">
                  <Input
                    title="Numéro"
                    value={numContact}
                    onChangeText={setNumContact}
                    inputMode="numeric"
                  />
                </View>
              </View>

              <Input
                title="Allergies"
                value={allergies}
                onChangeText={setAllergies}
              />
              <Input
                title="Vaccins"
                value={vaccins}
                onChangeText={setVaccins}
              />
            </>
          )}
        </View>
        {user === "parents" && (
          <View className="h-14 mb-36">
            <Button
              title="Mettre à jour les données de l'enfant"
              onPress={() => updateChild()}
              textSize="xl"
            />
          </View>
        )}
        {user === "nounou" && (
          <View className="h-14 mb-36 w-2/3 self-center">
            <Button
              title="Ajouter un enfant"
              variant="ter"
              onPress={() => addChild()}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
