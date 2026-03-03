import { Pressable, ScrollView, Text, View } from "react-native";
import Button from "./Button";
import {
  Frown,
  Image,
  Meh,
  Smile,
  Square,
  SquareCheck,
} from "lucide-react-native";
import { useState } from "react";
import Input from "./Input";

export default function ProChildNotes() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [noteTypes, setNoteTypes] = useState(null);

  return (
    <View className="flex-1 p-4 bg-white rounded-3xl shadow-sm elevation-3 ">
      <View className=" ">
        <Input
          title="Types :"
          value={noteTypes}
          onChangeText={setNoteTypes}
          fond="sans"
        />

        <View className="flex-row w-full items-center "></View>
      </View>
      <View className="flex-1 h-15">
        <Input fond="sans" title="Commentaires" nbLignes={8} />
      </View>

      <View className="absolute bottom-4 self-center w-1/2">
        <Button title="Enregistrer" textSize="xl" variant="ter" />
      </View>
    </View>
  );
}
