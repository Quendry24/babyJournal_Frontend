import { Send } from "lucide-react-native";
import { Text, View, Pressable } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getWeekDays } from "../utils/getWeekDays";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";
export default function ParentsCalendar() {
  const [planning, setPlanning] = useState([]);
  const enfants = useSelector((state) => state.user.value.famille || []);
  console.log(enfants, "enfants log");
  const nounouId = enfants?.[0]?.["Nounou"];
  console.log("idnounou calendrier", nounouId);

  useEffect(() => {
    const { monday } = getWeekDays();
    console.log(monday, "monday");

    fetch(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/nounou/calendrier/semaine/${nounouId}?monday=${monday}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "log data");
        //traitement du planning ici
        const marked = {};

        data.planning.forEach((jour) => {
          let present = false;

          for (let enfant of enfants) {
            if (
              jour.Enfants.some((e) => (e.idBabyJournal = enfant.idBabyJournal))
            ) {
              present = true;
              break;
            }
          }
          console.log(present);

          if (jour.Enfants.length > 0) {
            marked[jour.Date_Du_Jour] = {
              selected: present,
              selectedColor: "#F9BC50",
            };
          }
          setPlanning(marked);
        });
      });
  }, []);

  return (
    <View className="flex-1">
      <View className="pr-4 flex-row justify-end ">
        <Pressable>
          <Send />
        </Pressable>
      </View>
      <Text className=" pt-4 pb-10 text-black font-bold text-4xl text-center">
        Calendrier de nounou
      </Text>
      <View
        style={{
          borderRadius: 22,
          overflow: "hidden",
        }}
      >
        <Calendar
          markedDates={planning}
          // markedDates={joursEnfant}
          // firstDay={1}
          // theme={{
          //   borderRadius: 22,
          //   arrowColor: "#F9BC50",
          //   todayTextColor: "#F9BC50",
          // }}
        />
      </View>
      <View className="pt-4 items-start gap-2">
        <Text className="text-xl">🟡 Enfant gardé </Text>
        <Text className="text-xl">🔴 Nounou en vacances</Text>
      </View>
    </View>
  );
}
