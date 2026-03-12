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
import { getWeekDays } from "../utils/getWeekDays";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useDispatch, useSelector } from "react-redux";
import { getTodayChilds } from "../reducers/user";
dayjs.extend(isoWeek);

export default function ProCalendar() {
  const [offset, setOffset] = useState(0);
  const [weekDays, setWeekDays] = useState([]);
  const [affichageJours, setAffichageJours] = useState([]);
  const [semaine, setSemaine] = useState(0);
  const [reglage, setReglage] = useState(false);
  const [localChild, setLocalChild] = useState([]);
  const [monday, setMonday] = useState(null);
  const todayChilds = useSelector((state) => state.user.value.today);

  const idNounou = useSelector((state) => state.user.value.userId); // a mettre dans le store a la connexion
  const allChild = useSelector((state) => state.user.value.all);
  const dispatch = useDispatch();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    const { week, jours, monday } = getWeekDays(offset, options);
    setWeekDays(week);
    setAffichageJours(jours);
    const numSemaine = dayjs(monday).isoWeek();
    setSemaine(numSemaine);
    setMonday(monday);

    chargerSemaine(monday, week);
  }, [offset, allChild]);

  const chargerSemaine = (monday, week) => {
    const tableauVide = allChild.map((child) => ({
      ...child,
      presence: Array(7).fill(false),
    }));
    fetch(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/calendrier/semaine/${idNounou}?monday=${monday.toISOString()}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.result) {
          setLocalChild(tableauVide);
          return;
        }
        const tableauMAJ = tableauVide.map((child) => ({
          ...child,
          presence: [...child.presence],
        }));
        data.planning.forEach((jour) => {
          const indexJour = week.indexOf(jour.Date_Du_Jour);
          if (jour.Date_Du_Jour === new Date().toISOString().split("T")[0]) {
            dispatch(getTodayChilds(jour.Enfants));
          }
          if (indexJour === -1) return;
          jour.Enfants.forEach((enfant) => {
            const index = tableauMAJ.findIndex(
              (c) => c.idBabyJournal === enfant.idBabyJournal,
            );

            if (index !== -1) tableauMAJ[index].presence[indexJour] = true;
          });
        });
        setLocalChild(tableauMAJ);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  };

  const changePresence = (iChild, iDay) => {
    setLocalChild((data) => {
      const updatedChildren = [...data]; //on copie le tableau AllChild + le tableau de presence (localChilds)
      const updatedPresence = [...updatedChildren[iChild].presence]; //on recupere le tableau presence de l'enfant selectioné
      updatedPresence[iDay] = !updatedPresence[iDay]; //on change la valeur du jour sur lequel on a cliqué

      updatedChildren[iChild] = {
        ...updatedChildren[iChild],
        presence: updatedPresence,
      }; //on remplace dans l'objet de l'enfant le tableau presence par le nouveau

      return updatedChildren; // on retourne allChild avec la nouvelle valeur
    });
  };

  const saveWeek = () => {
    fetch(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/calendrier/semaine/${idNounou}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          monday: monday.toISOString(),
          allChild: localChild,
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          chargerSemaine(monday, weekDays);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View className="flex-1 ">
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
          position: "relative",
          paddingBottom: 166,
          marginBottom: 144,
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
                {localChild.map((child, iChild) => {
                  if (child.presence[i]) {
                    return (
                      <View className="items-center" key={iChild}>
                        <View className="border-4 border-jaune rounded-full">
                          <Baby color="gray" size={48} />
                        </View>
                        <Text className="text-xl">{child.Prenom}</Text>
                        <Text className="text-sm">7h00-16h00</Text>
                      </View>
                    );
                  }
                })}
              </View>
            </View>
          ))}
        {reglage && (
          <>
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
                  {localChild.map((data, iChild) => (
                    <View key={iChild} className="flex-row">
                      <View
                        className="items-center w-20"
                        onPress={() => {
                          setModalVisible(true);
                          console.log(data.Prenom, i);
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
                          {data.Prenom}
                        </Text>
                      </View>
                      <View className="flex-row flex-1  w-full items-center justify-around">
                        {affichageJours.map((day, iDay) => (
                          <Pressable
                            key={iDay}
                            onPress={() => {
                              console.log(
                                data.Prenom,
                                iDay,
                                data.presence[iDay],
                              );
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
            <View className="flex-1 w-1/2 self-center">
              <Button
                title="Sauvegarder ma semaine"
                onPress={() => saveWeek()}
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
