import { Image, ScrollView, Text, View } from "react-native";
import Button from "./Button";

export default function ProChildInfos({ childInfo }) {
  console.log(childInfo);
  return (
    <View className="flex-grown p-4 bg-white rounded-3xl shadow-sm elevation-3 ">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full flex-row">
          <View className=" w-1/2 gap-10 ">
            <Text className="text-2xl">
              Poids : {childInfo.Poids || "NC"} kg
            </Text>
            <View className="pb-4">
              <Text className="text-2xl">Allergies:</Text>
              {childInfo?.Allergies?.length > 0 ? (
                childInfo.Allergies.map((data, i) => (
                  <Text key={i} className="text-xl">
                    - {data}
                  </Text>
                ))
              ) : (
                <Text className="text-xl">non renseigné</Text>
              )}
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
      </ScrollView>
    </View>
  );
}
