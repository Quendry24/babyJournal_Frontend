import { Pressable, ScrollView, Text, View } from "react-native";
import Button from "./Button";
import { Frown, Meh, Smile, Square, SquareCheck } from "lucide-react-native";
import { useState } from "react";
import Input from "./Input";

export default function ProChildChanges() {
  const [selectedItems, setSelectedItems] = useState([null]);

  const types = ["URINES", "SELLES", "MIXTE", "CREME"];

  const changeTypes = (change) => {
    if (selectedItems.includes(change)) {
      setSelectedItems(selectedItems.filter((e) => e !== change));
    } else {
      setSelectedItems([...selectedItems, change]);
    }
  };
  return (
    <View className="flex-1 p-4 bg-white rounded-3xl shadow-sm elevation-3 ">
      <View className=" gap-2 ">
        <Text className="text-2xl">Heure du change : 12:15</Text>
        <Text className="text-2xl">Types : </Text>
        <View className="flex-row gap-2 py-4">
          {types.map((data, i) => (
            <Button
              key={i}
              title={data}
              onPress={() => changeTypes(data)}
              variant={selectedItems.includes(data) ? "outlineJaune" : "jaune"}
            />
          ))}
        </View>
        <View className="flex-row w-full items-center ">
          <View className="flex-row items-center"></View>
        </View>
        <View className="flex-1 h-15">
          <Input fond="sans" title="Commentaires" nbLignes={4} />
        </View>
      </View>
      <View className="absolute bottom-4 self-center w-1/2 ">
        <Button title="Enregistrer" textSize="xl" variant="ter" />
      </View>
    </View>
  );
}
