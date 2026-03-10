import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Send } from "lucide-react-native";
import { ArrowLeft } from "lucide-react-native";
import ChildCard from "./ChildCard";
import ItemDetail from "./ItemDetail";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function ParentsHome({ onSelectChild }) {
  //Remplacement tableau dur
  const [child, setChild] = useState([]);
  const idFamille = useSelector((state) => state.user.value.idFamille);

  useEffect(() => {
    if (!idFamille) return;
    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/enfants/famille/${idFamille}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChild(data.enfants);
      })
      .catch((error) => console.log(error));
  }, [idFamille]);

  // ANCIEN TABLEAU EN DUR
  /*const child = [
    {
      name: "Alysée",
      birthDate: "2025-05-09",
      jours: "lundi-mercredi-jeudi",
      activities: [{ type: "Sieste" }],
    },
    {
      name: "Julien",
      birthDate: "2025-11-29",
      jours: "mercredi-vendredi",
    },
    {
      name: "Théo",
      birthDate: "2024-08-02",
      jours: "mercredi-jeudi-vendredi",
    },
  ];*/

  const allChild = child?.map((data, i) => (
    <ChildCard
      key={i}
      name={data.Prenom}
      birthDate={data.Birthday}
      jours={data.jours}
      idBabyJournal={data.idBabyJournal}
      onPress={() => onSelectChild(data)}
    />
  ));
  return (
    <View className="flex-1">
      <View className="pr-4 flex-row justify-end ">
        <Pressable>
          <Send />
        </Pressable>
      </View>
      <Text className=" pt-4 pb-10 text-center text-black text-4xl font-bold">
        Ma Famille
      </Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 240 }}>
        <View className="gap-8">{allChild}</View>

        <Pressable className="items-center pt-4 "></Pressable>
        <View className="w-1/2 self-center h-16 mt-4">
          <Button title="Ajouter un enfant" textSize="xl" />
        </View>
      </ScrollView>
    </View>
  );
}
