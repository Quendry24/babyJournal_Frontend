import { Text, View, ScrollView, Pressable } from "react-native";
import { Send } from "lucide-react-native";
import ParentsHome from "../components/ParentsHome";
import ChildJournee from "../components/ChildJournee";

import { useState } from "react";
import { Text, View, ScrollView, TextInput, SafeAreaView } from "react-native";

import Button from "../components/Button";
import ButtonAdd from "../components/ButtonAdd";
import ButtonRetour from "../components/ButtonRetour";

export default function HomeScreen() {
  const [selectedChild, setSelectedChild] = useState(null);

  /* let content;
  if (selectedChild) {
    content = (
      <ChildJournee
        photo={selectedChild.photo}
        name={selectedChild.name}
        birthDate={selectedChild.birthDate}
      />
    );
  } else {
    content = <ParentsHome onSelectedChild={setSelectedChild} />;
  }*/
  return (
    <View className="flex-1 p-4 bg-back">
      <Pressable className="pt-14 mr-5 items-end">
        <Send />
      </Pressable>

      <ChildJournee />
    </View>
  );
}
