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

export default function ParentsHome({ onSelectChild }) {
  const child = [
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
  ];

  const allChild = child.map((data, i) => (
    <ChildCard
      key={i}
      name={data.name}
      birthDate={data.birthDate}
      jours={data.jours}
      onPress={() => onSelectChild(data)}
    />
  ));
  return (
    <View className="flex-1 pt-4 ">
      <View className="pt-16 pr-4 flex-row justify-end ">
        <Pressable>
          <Send />
        </Pressable>
      </View>
      <Text className=" pt-4 pb-10 text-center text-black text-4xl font-bold">
        Ma Famille
      </Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 240 }}>
        <View className="gap-8">{allChild}</View>

        <Pressable className="items-center pt-4 ">
          <Text>Ajouter un enfant</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
