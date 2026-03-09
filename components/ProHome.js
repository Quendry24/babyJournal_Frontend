import { Pressable, ScrollView, Text, View } from "react-native";
import { Send, Baby } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allChilds, getTodayChilds } from "../reducers/user";

export default function ProHome({ child, setChildName }) {
  const idNounou = useSelector((state) => state.user.value.userId);
  const childs = useSelector((state) => state.user.value.all);
  const todayChilds = useSelector((state) => state.user.value.today);
  // const [todayChild, setTodayChild] = useState([]);
  const dispatch = useDispatch();
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    //recuperation de tous les enfants dont la nounou à cet Id
    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/enfants/${idNounou}`)
      .then((res) => res.json())
      .then((data) => {
        const childs = data.childs.map((child, i) => ({
          idBabyJournal: child.idBabyJournal,
          name: child.Prenom,
          photo: "Baby",
        }));
        dispatch(allChilds(childs));
      })
      .catch((err) => console.log(err));

    // recherche dans le calendrier de la nounou les enfants présent ce jour la
    fetch(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/calendrier/jour/${idNounou}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          console.log(data.enfantsDuJour);
          dispatch(getTodayChilds(data.enfantsDuJour));
        }
      })
      .catch((err) => console.log(err));
  }, [idNounou]);

  const todayChild = [
    { name: "Léa", arrival: "7h00", photo: "Baby" },
    { name: "Timothée", arrival: "8h00", photo: "Baby" },
    { name: "Martin", arrival: "9h30", photo: "Baby" },
    { name: "Constance", arrival: "7h00", photo: "Baby" },
  ];

  const childsProfil = todayChild.map((data, i) => (
    <Pressable
      key={i}
      className="items-center"
      onPress={() => setChildName(data.name)}
    >
      <View className="border-4 border-jaune rounded-full">
        <Baby color="gray" size={48} />
      </View>
      <Text className="text-xl">{data.name}</Text>
      <Text className="text-sm">{data.arrival}</Text>
    </Pressable>
  ));

  return (
    <View className="flex-1 items-center">
      <Text className="py-4 text-3xl font-bold ">
        {date.toLocaleDateString("fr-FR", options).toUpperCase()}
      </Text>
      <View className="border-b-2 w-full border-jaune"></View>

      <View className="w-full items-center py-4 gap-4">
        <Text className="text-2xl">Météo (Connecté à openweather)</Text>
        <View className="w-full flex-row justify-around items-center">
          <View className="w-1/4 aspect-square border justify-end items-center">
            <Text>Matin</Text>
          </View>
          <View className="w-1/4 aspect-square border justify-end items-center">
            <Text>Après-midi</Text>
          </View>
        </View>
      </View>
      <View className="border-b-2 w-full border-jaune my-4"></View>
      <View className="w-full items-center gap-4">
        <Text className="text-2xl ">Mes enfants du jour</Text>
        <View className="w-full flex-row justify-around items-center">
          {childsProfil}
        </View>
      </View>
      <View className="border-b-2 w-full border-jaune my-4"></View>
      <View className=" items-center justify-center gap-4 pt-10">
        <Pressable className="bg-ter py-4 px-6 rounded-2xl w-2/3">
          <Text
            className="text-xl text-white"
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
            ellipsizeMode="tail"
          >
            Ajouter activité commune
          </Text>
        </Pressable>
        <Pressable className="bg-ter py-4 px-6 rounded-2xl w-2/3">
          <Text
            className="text-xl text-white"
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
            ellipsizeMode="tail"
          >
            Envoyer message commun
          </Text>
        </Pressable>
        <Send color="gray" size={40} />
      </View>
    </View>
  );
}
