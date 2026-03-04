import { Text, Image, View, Pressable, ScrollView } from "react-native";
import {
  Baby,
  Utensils,
  Bed,
  Shapes,
  HeartPlus,
  Shirt,
  ArrowLeft,
  Send,
} from "lucide-react-native";
import dayjs from "dayjs";
import { useState } from "react";

export default function ChildJournee({ photo, child, OnBack }) {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const activityTypes = [
    { id: 1, label: "Sieste", icon: Bed, count: 4 },
    { id: 2, label: "Repas", icon: Utensils, count: 1 },
    { id: 3, label: "Activités", icon: Shapes, count: 2 },
    { id: 4, label: "Changes", icon: Shirt, count: 3 },
    { id: 5, label: "Santé", icon: HeartPlus, count: 0 },
  ];

  const ageInMonths = dayjs().diff(dayjs(child.birthDate), "month");

  const activities = activityTypes.map((data) => {
    let IconComponent = data.icon;
    return (
      <Pressable
        key={data.id}
        className="flex-row bg-white items-center py-8 px-8 rounded-3xl shadow-sm elevation-3"
      >
        <View className="w-12 items-start">
          <IconComponent size={40} />
        </View>

        <View className="flex-1 items-center">
          <Text className="text-2xl">{data.label} </Text>
        </View>

        <View className="w-12 items-end">
          <Text className="text-2xl">{data.count}</Text>
        </View>
      </Pressable>
    );
  });
  return (
    <View className="flex-1 pt-4">
      <View className="flex-row pt-16 justify-between ml-4 mr-4">
        <Pressable>
          <ArrowLeft onPress={OnBack} />
        </Pressable>
        <Pressable>
          <Send />
        </Pressable>
      </View>
      <View className="flex-row items-center justify-center">
        {photo ? (
          <Image source={{ uri: photo }} className="w-16 h-16 rounded-full" />
        ) : (
          <View className="items-center  border-4  border-jaune rounded-full ">
            <Baby color="gray" size={75} />
          </View>
        )}
      </View>
      <Text className=" pt-2 pb-2 text-center text-black text-4xl font-bold">
        {child.name},
      </Text>
      <Text className="text-center italic">{ageInMonths} mois</Text>
      <View>
        <ScrollView
          className="pt-4"
          contentContainerStyle={{ gap: 16, paddingBottom: 380 }}
        >
          <Pressable className="bg-white items-center py-4 rounded-3xl shadow-sm elevation-3">
            <Text className="text-2xl">Notes de nounou </Text>
          </Pressable>
          {activities}
        </ScrollView>
      </View>
    </View>
  );
}
