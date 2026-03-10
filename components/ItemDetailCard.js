import { Image, Text, View, ScrollView } from "react-native";
import { useState } from "react";

import ChildJournee from "./ChildJournee";

export default function ItemDetailCard({ activityTypes }) {
  const cards = [
    {
      sousTitre: "Sous-titre",
      TextIci: "Text ici",
      infosIci: "Infos ici",
      commentaires: "Com 1",
    },
    {
      sousTitre: "Sous-titre 2",
      TextIci: "Text ici",
      infosIci: "Infos ici",
      commentaires: "Com 2",
    },
  ];

  const allcards = cards.map((data, i) => (
    <View className="my-5" key={i}>
      <Text className="text-3xl">{data.sousTitre}</Text>
      <View
        className={`my-5 ${i % 2 === 0 ? "bg-vert" : "bg-ter"} border rounded-2xl p-4`}
      >
        <Text
          className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
        >
          {data.TextIci}
        </Text>
        <Text
          className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
        >
          {data.infosIci}
        </Text>
        <Text
          className={`${i % 2 === 0 ? "text-black" : "text-white"} text-xl`}
        >
          {data.commentaires}
        </Text>
      </View>
    </View>
  ));

  const IconComponent = activityTypes.icon;
  return (
    <View className="flex-1 p-4 bg-white rounded-3xl shadow-sm elevation-3">
      <View className=" flex-1 p-4 border relative border-jaune  rounded-xl">
        <Text className="text-2xl color-jaune absolute top-0  -translate-y-1/2 translate-x-4 bg-white">
          {activityTypes.label}
        </Text>
        <View className="items-end">
          {IconComponent && <IconComponent size={45} />}
        </View>

        <ScrollView className="">{allcards}</ScrollView>
        <Text className="text-3xl font-bold absolute right-4 bottom-4 ">
          {cards.length}
        </Text>
      </View>
    </View>
  );
}
