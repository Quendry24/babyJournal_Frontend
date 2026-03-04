import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import ButtonRetour from "./ButtonRetour";
import Button from "./Button";
import { Send } from "lucide-react-native";
import { useState } from "react";
import ProChildInfos from "./ProChildInfos";
import ProChildRepas from "./ProChildRepas";
import ProChildSieste from "./ProChildSieste";
import ProChildChanges from "./ProChildChanges";
import ProChildSante from "./ProChildSante";
import ProChildActivites from "./ProChildActivites";
import ProChildNotes from "./ProChildNotes";
export default function ProChild({ childName, setChildName }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    "Repas",
    "Sieste",
    "Changes",
    "Santé",
    "Activités",
    "Notes Nounou",
  ];

  return (
    <View className="flex-1">
      <View className="w-full flex-row items-center  justify-between">
        <ButtonRetour variant="ter" onPress={() => setChildName("")} />
        <Send color="gray" />
      </View>
      <View className="mb-4">
        <Text className="text-center text-3xl font-bold">{childName}</Text>
        <Text className="text-center text-lg">Birthday - 3 ans</Text>
      </View>
      <View className="w-full flex-row flex-wrap justify-center pb-4 ">
        {items.map((data, i) => (
          <View className="w-1/3 h-24 p-2 " key={i}>
            <Button
              variant={selectedItem === data ? "outlineTer" : "ter"}
              title={data}
              onPress={() =>
                setSelectedItem(selectedItem === data ? null : data)
              }
            />
          </View>
        ))}
      </View>

      <View className="flex-grow mb-36">
        {selectedItem === null && <ProChildInfos />}
        {selectedItem === "Repas" && <ProChildRepas />}
        {selectedItem === "Sieste" && <ProChildSieste />}
        {selectedItem === "Changes" && <ProChildChanges />}
        {selectedItem === "Santé" && <ProChildSante />}
        {selectedItem === "Activités" && <ProChildActivites />}
        {selectedItem === "Notes Nounou" && <ProChildNotes />}
      </View>
    </View>
  );
}
