import { Send } from "lucide-react-native";
import { Text, View, Pressable } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

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
  const joursEnfant = {
    "2026-03-09": { selected: true, selectedColor: "#F9BC50" },
    "2026-03-11": { selected: true, selectedColor: "#F9BC50" },
    "2026-03-12": { selected: true, selectedColor: "#F9BC50" },
    "2026-03-13": { selected: true, selectedColor: "#F9BC50" },

    "2026-03-23": { selected: true, selectedColor: "red" },
    "2026-03-24": { selected: true, selectedColor: "red" },
    "2026-03-25": { selected: true, selectedColor: "red" },
    "2026-03-26": { selected: true, selectedColor: "red" },
    "2026-03-27": { selected: true, selectedColor: "red" },
  };
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
          markedDates={joursEnfant}
          firstDay={1}
          theme={{
            borderRadius: 22,
            arrowColor: "#F9BC50",
            todayTextColor: "#F9BC50",
          }}
        />
      </View>
      <View className="pt-4 items-start gap-2">
        <Text className="text-xl">🟡 Enfant gardé </Text>
        <Text className="text-xl">🔴 Nounou en vacances</Text>
      </View>
    </View>
  );
}
