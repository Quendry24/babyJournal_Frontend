import { Pressable, ScrollView, Text, View } from "react-native";
import Button from "./Button";
import { Frown, Meh, Smile, Square, SquareCheck } from "lucide-react-native";
import { useState } from "react";
import Input from "./Input";

export default function ProChildSante() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [temperature, setTemperature] = useState(false);
  const [symptome, setSymptome] = useState(null);
  const [traitement, setTraitement] = useState(null);

  return (
    <View className="flex-1 p-4 bg-white rounded-3xl shadow-sm elevation-3 ">
      <ScrollView>
        <View className="">
          <Text className="text-2xl">Heure : 12:15</Text>
          <Input
            title="Symptômes :"
            value={symptome}
            onChangeText={setSymptome}
            fond="sans"
          />
          <Input
            title="Traitements :"
            value={traitement}
            onChangeText={setTraitement}
            fond="sans"
          />
          <View className="flex-row w-full items-center gap-4">
            <View className="flex-row  items-center">
              <Pressable onPress={() => setTemperature(!temperature)}>
                {temperature ? <SquareCheck /> : <Square />}
              </Pressable>
              <Text className="text-2xl">Température : </Text>
            </View>

            <View className="flex-1 ">
              <Input title="°C" fond="sans" />
            </View>
          </View>
        </View>
        <View className="flex-1 ">
          <Input fond="sans" title="Commentaires" nbLignes={4} />
        </View>
        <View className="self-center w-1/2">
          <Button title="Enregistrer" textSize="xl" variant="ter" />
        </View>
      </ScrollView>
    </View>
  );
}
