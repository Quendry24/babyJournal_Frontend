import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import ChildCard from "./ChildCard";

export default function ParentsHome() {
  const child = [
    { name: "Léa", birthDate: "09/05/2025", jours: "lundi-mercredi-jeudi" },
    { name: "Julien", birthDate: "29/11/2025", jours: "mercredi-vendredi" },
  ];

  const allChild = child.map((data, i) => (
    <ChildCard
      key={i}
      name={data.name}
      birthDate={data.birthDate}
      jours={data.jours}
    />
  ));
  return (
    <View>
      <Text className=" pt-4 pb-10 text-center text-black text-4xl font-bold">
        Ma Famille
      </Text>
      <View className="gap-8">{allChild}</View>
      <Pressable className="items-center pt-4 ">
        <Text>Ajouter un enfant</Text>
      </Pressable>
    </View>
  );
}
