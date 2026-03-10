import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Send, Baby } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChilds, getTodayChilds } from "../reducers/user";
import * as Location from "expo-location";

export default function ProHome({ child, childId, setChildName, setChildId }) {
  const idNounou = useSelector((state) => state.user.value.userId);
  const childs = useSelector((state) => state.user.value.all);
  const todayChilds = useSelector((state) => state.user.value.today);
  const dispatch = useDispatch();
  const date = new Date();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [meteo, setMeteo] = useState(null);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // localisation et  météo
  useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();

      if (result?.status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        fetch(
          `${process.env.EXPO_PUBLIC_URL_BACKEND}/meteo?lat=${latitude}&lon=${longitude}`,
        )
          .then((res) => res.json())
          .then((data) => {
            setMeteo(data);
          });
      }
    })();
  }, []);

  useEffect(() => {
    //recuperation de tous les enfants dont la nounou à cet Id
    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/enfants/${idNounou}`)
      .then((res) => res.json())
      .then((data) => {
        const childs = data.childs.map((child, i) => ({
          idBabyJournal: child.idBabyJournal,
          Prenom: child.Prenom,
          photo: "Baby",
        }));
        dispatch(getAllChilds(childs));
      })
      .catch((err) => console.log(err));

    // recherche dans le calendrier de la nounou les enfants présent ce jour la
    fetch(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/calendrier/jour/${idNounou}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          console.log("edj", data.enfantsDuJour);
          dispatch(getTodayChilds(data.enfantsDuJour));
        }
      })
      .catch((err) => console.log(err));
  }, [idNounou]);

  const childsProfil = todayChilds?.map((data, i) => (
    <Pressable
      key={i}
      className="items-center"
      onPress={() => {
        setChildName(data.Prenom);
        setChildId(data.idBabyJournal);
      }}
    >
      <View className="border-4 border-jaune rounded-full">
        <Baby color="gray" size={48} />
      </View>
      <Text className="text-xl">{data.Prenom}</Text>
      <Text className="text-sm">{data.arrival || "7h00"}</Text>
    </Pressable>
  ));

  return (
    <View className="flex-1 items-center">
      <Text className="py-4 text-3xl font-bold ">
        {date.toLocaleDateString("fr-FR", options).toUpperCase()}
      </Text>
      <View className="border-b-2 w-full border-jaune"></View>

      <View className="w-full items-center py-4 gap-4">
        <Text className="text-2xl">Prévision météo</Text>
        <View className="w-full flex-row justify-around items-center">
          <View className="w-1/5 aspect-square justify-around items-center">
            <Text>8h</Text>
            <Image
              source={{ uri: `https:${meteo?.huitH.condition.icon}` }}
              style={{ width: 50, height: 50 }}
            />
            <Text>{meteo?.huitH.temp_c}°C</Text>
          </View>
          <View className="w-1/5 aspect-square justify-around items-center">
            <Text>11h</Text>
            <Image
              source={{ uri: `https:${meteo?.onzeH.condition.icon}` }}
              style={{ width: 50, height: 50 }}
            />
            <Text>{meteo?.onzeH.temp_c}°C</Text>
          </View>
          <View className="w-1/5 aspect-square  justify-around items-center">
            <Text>14h</Text>
            <Image
              source={{ uri: `https:${meteo?.quatorzeH.condition.icon}` }}
              style={{ width: 50, height: 50 }}
            />
            <Text>{meteo?.quatorzeH.temp_c}°C</Text>
          </View>
          <View className="w-1/5 aspect-square  justify-around items-center">
            <Text>17h</Text>
            <Image
              source={{ uri: `https:${meteo?.dixSeptH.condition.icon}` }}
              style={{ width: 50, height: 50 }}
            />
            <Text>{meteo?.dixSeptH.temp_c}°C</Text>
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
