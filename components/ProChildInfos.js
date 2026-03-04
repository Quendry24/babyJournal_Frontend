import { Image, Text, View } from "react-native";
import Button from "./Button";

export default function ProChildInfos() {
  return (
    <View className="flex-1 p-4 bg-white rounded-3xl shadow-sm elevation-3 ">
      <View className="w-full flex-1 flex-row">
        <View className=" w-1/2 gap-10 ">
          <Text className="text-2xl">Poids : 16kg</Text>
          <View>
            <Text className="text-2xl">Allergies:</Text>
            <Text className="text-xl">- Fraises</Text>
            <Text className="text-xl">- Melon</Text>
            <Text className="text-xl">- Huites</Text>
          </View>
        </View>
        <View className=" w-1/2 gap-10 ">
          <Text className="text-2xl">Arrivée : 08:15</Text>
          <Text className="text-2xl">Départ : 18:00</Text>
        </View>
      </View>
      <Text className="text-2xl text-center pb-6">Contact principaux</Text>
      <View className="flex-row h-16 gap-10">
        <Button title="Mere" textSize="xl" variant="outlineTer" />
        <Button title="Pere" textSize="xl" variant="outlineTer" />
      </View>
    </View>
  );
}
