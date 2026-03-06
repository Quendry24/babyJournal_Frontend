import { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  Baby,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Settings,
  Square,
  SquareCheck,
} from "lucide-react-native";
import Button from "./Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { getWeekDays } from "../utils/getWeekDays";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useSelector } from "react-redux";
dayjs.extend(isoWeek);

export default function ProCalendar() {
  const [offset, setOffset] = useState(0);
  const [weekDays, setWeekDays] = useState([]);
  const [affichageJours, setAffichageJours] = useState([]);
  const [myWeek, setMyWeek] = useState([]);
  const [semaine, setSemaine] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reglage, setReglage] = useState(false);
  const [allChild, setAllChild] = useState([]);

  const idNounou = useSelector((state) => state.user.value.userId); // a mettre dans le store a la connexion
  // const allChild = useSelector(state=>state.user.value.all)   d'abord modifier le map pour les case a cocher
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    let todayChild = [];
    fetch(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/calendrier/jour/${idNounou}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          today,
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("fetch", data.child);
        todayChild.push(data.child);
        console.log(todayChild[0]);
      })
      .catch((err) => {
        console.log("FETCH ERROR:", err);
      });
  }, []);

  useEffect(() => {
    const { week, jours, monday } = getWeekDays(offset, options);
    setWeekDays(week);
    setAffichageJours(jours);

    fetch(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/calendrier/semaine/${idNounou}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: monday.toISOString(),
          allChild,
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("fetch result:", data);
      })
      .catch((err) => {
        console.log("FETCH ERROR:", err);
      });

    const numSemaine = dayjs(monday).isoWeek();
    setSemaine(numSemaine);
  }, [offset]);

  //   {
  //     name: "Léa",
  //     photo: "Baby",
  //     presence: [false, false, false, false, false, false, false],
  //   },
  //   {
  //     name: "Timothée",
  //     photo: "Baby",
  //     presence: [false, false, false, false, false, false, false],
  //   },
  //   {
  //     name: "Martin",
  //     photo: "Baby",
  //     presence: [false, false, false, false, false, false, false],
  //   },
  //   {
  //     name: "Constance",
  //     photo: "Baby",
  //     presence: [false, false, false, false, false, false, false],
  //   },
  //   {
  //     name: "Yves",
  //     photo: "Baby",
  //     presence: [false, false, false, false, false, false, false],
  //   },
  //   {
  //     name: "Vincent",
  //     photo: "Baby",
  //     presence: [false, false, false, false, false, false, false],
  //   },
  // ]);

  const changePresence = (iChild, iDay) => {
    setAllChild((data) => {
      const updatedChildren = [...data]; //on copie le tableau AllChild
      const updatedPresence = [...updatedChildren[iChild].presence]; //on recupere le tableau presence de l'enfant selectioné
      updatedPresence[iDay] = !updatedPresence[iDay]; //on change la valeur du jour sur lequel on a cliqué

      updatedChildren[iChild] = {
        ...updatedChildren[iChild],
        presence: updatedPresence,
      }; //on remplace dans l'objet de l'enfant le tableau presence par le nouveau

      return updatedChildren; // on retourne allChild avec la nouvelle valeur
    });
  };

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center py-4">
        <View className="w-10 aspect-square">
          <Button
            title={<ChevronLeft color="white" />}
            onPress={() => setOffset(offset - 1)}
          />
        </View>
        <Pressable className="items-center" onPress={() => setOffset(0)}>
          <Text className="text-2xl">Semaine {semaine}</Text>
          <Text className="text-xl">35h </Text>
        </Pressable>
        <View className="w-10 aspect-square">
          <Button
            title={<ChevronRight color="white" />}
            onPress={() => setOffset(offset + 1)}
          />
        </View>
      </View>
      <View className="flex-row gap-4 pb-4">
        <Button
          title={
            <View className="flex-row gap-2 items-center">
              <Text
                className={`${!reglage ? "text-jaune" : "text-white"} text-xl`}
              >
                Vue semaine
              </Text>
              <Calendar color={!reglage ? "#F9BC50" : "white"} />
            </View>
          }
          textSize="xl"
          onPress={() => setReglage(false)}
          variant={reglage ? "jaune" : "outlineJaune"}
        />
        <Button
          title={
            <View className="flex-row gap-2 items-center">
              <Text
                className={`${reglage ? "text-jaune" : "text-white"} text-xl`}
              >
                Réglages
              </Text>
              <Settings color={reglage ? "#F9BC50" : "white"} />
            </View>
          }
          onPress={() => setReglage(true)}
          variant={reglage ? "outlineJaune" : "jaune"}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 125,
          paddingTop: 16,
          backgroundColor: "white",
          borderRadius: 16,
        }}
      >
        {!reglage &&
          affichageJours.map((data, i) => (
            <View key={i} className="w-full">
              <View className="border border-jaune rounded-full relative"></View>
              <Text className="text-xl absolute top-0 -translate-y-1/2 text-jaune font-bold self-center bg-white px-2">
                {data} · 10h
              </Text>
              <View className="flex-row w-full justify-around py-4 ">
                {allChild.map((child, iChild) => {
                  if (child.presence[i]) {
                    return (
                      <View className="items-center">
                        <View className="border-4 border-jaune rounded-full">
                          <Baby color="gray" size={48} />
                        </View>
                        <Text className="text-xl">{child.name}</Text>
                        <Text className="text-sm">7h00-16h00</Text>
                      </View>
                    );
                  }
                })}
              </View>
            </View>
          ))}
        {reglage && (
          <View className="flex-1 ">
            <View className="flex-row  ">
              <View className="w-20 "></View>
              <View className="flex-row flex-1 justify-around">
                <Text className="text-xl">Lun</Text>
                <Text className="text-xl">Mar</Text>
                <Text className="text-xl">Mer</Text>
                <Text className="text-xl">Jeu</Text>
                <Text className="text-xl">Ven</Text>
                <Text className="text-xl">Sam</Text>
                <Text className="text-xl">Dim</Text>
              </View>
            </View>
            <View className="flex-1">
              <View className=" gap-2">
                {allChild.map((data, iChild) => (
                  <View key={iChild} className="flex-row">
                    <View
                      className="items-center w-20"
                      onPress={() => {
                        setModalVisible(true);
                        console.log(data.name, i);
                      }}
                    >
                      <View className="border-4 border-jaune rounded-full">
                        <Baby color="gray" size={36} />
                      </View>
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.5}
                        className="text-xl"
                      >
                        {data.name}
                      </Text>
                    </View>
                    <View className="flex-row flex-1  w-full items-center justify-around">
                      {affichageJours.map((day, iDay) => (
                        <Pressable
                          key={iDay}
                          onPress={() => {
                            console.log(data.name, iDay, data.presence[iDay]);
                            changePresence(iChild, iDay);
                          }}
                        >
                          {data.presence[iDay] ? <SquareCheck /> : <Square />}
                        </Pressable>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
