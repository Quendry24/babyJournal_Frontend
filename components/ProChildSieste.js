import { Pressable, ScrollView, Text, View } from "react-native";
import Button from "./Button";
import { Frown, Meh, Smile, Square, SquareCheck } from "lucide-react-native";
import { useState } from "react";
import Input from "./Input";

export default function ProChildSieste() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <View className="flex-1 p-4 bg-white rounded-3xl shadow-sm elevation-3 ">
      <View className=" gap-2 ">
        <Text className="text-2xl">Heure du couché : 12:15</Text>
        <Text className="text-2xl">Heure du reveil : 12:15</Text>
        <View className="flex-row gap-10 items-start">
          <Text className="text-2xl">Humeur : </Text>
          <View className="flex-row gap-10 py-4">
            <Pressable
              onPress={() =>
                setSelectedItem(selectedItem === "Smile" ? null : "Smile")
              }
            >
              <Smile
                size={40}
                color={selectedItem === "Smile" ? "green" : "black"}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                setSelectedItem(selectedItem === "Meh" ? null : "Meh")
              }
            >
              <Meh
                size={40}
                color={selectedItem === "Meh" ? "#F9BC50" : "black"}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                setSelectedItem(selectedItem === "frown" ? null : "frown")
              }
            >
              <Frown
                size={40}
                color={selectedItem === "frown" ? "#BE7D61" : "black"}
              />
            </Pressable>
          </View>
        </View>
        <View className="flex-row w-full items-center "></View>
      </View>
      <View className="flex-1 h-15">
        <Input fond="sans" title="Commentaires" nbLignes={5} />
      </View>
      <View className="absolute bottom-4 self-center w-1/2">
        <Button title="Enregistrer" textSize="xl" variant="ter" />
      </View>
    </View>
  );
}
