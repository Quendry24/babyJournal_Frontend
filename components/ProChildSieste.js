import { Pressable, ScrollView, Text, View } from "react-native";
import Button from "./Button";
import { Frown, Meh, Smile, Square, SquareCheck } from "lucide-react-native";
import { useState } from "react";
import Input from "./Input";

export default function ProChildSieste() {
  return (
    <View className="flex-1 p-4 bg-white rounded-3xl shadow-sm elevation-3 ">
      <View className=" gap-2 ">
        <Text className="text-2xl">Heure du repas : 12:15</Text>
        <View className="flex-row gap-10 items-center">
          <Text className="text-2xl">Humeur : </Text>
        </View>
        <View className="flex-row w-full items-center ">
          <View className="flex-row items-center">
            <Pressable onPress={() => setBiberon(!biberon)}>
              {biberon ? <SquareCheck /> : <Square />}
            </Pressable>
            <Text className="text-2xl">Biberon</Text>
          </View>
          {biberon && (
            <View className="flex-1 ">
              <Input title="ml" fond="sans" />
            </View>
          )}
        </View>
      </View>
      <View className="flex-1 h-15">
        <Input fond="sans" title="Commentaires" nbLignes={4} />
      </View>
      <View className="absolute bottom-4 self-center w-1/2">
        <Button title="Enregistrer" textSize="xl" variant="ter" />
      </View>
    </View>
  );
}
