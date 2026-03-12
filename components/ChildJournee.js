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
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ItemDetail from "./ItemDetail";
import ButtonRetour from "./ButtonRetour";
import AddChild from "./AddChild";
import Button from "./Button";
import InfosChild from "./InfosChild";

export default function ChildJournee({ photo, child, OnBack }) {
  //console.log("CHILD :", child);
  //console.log("ID BABY JOURNAL:", child.idBabyJournal);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [journee, setJournee] = useState(null);

  const [add, setAdd] = useState(false);
  const [infos, setInfos] = useState(false);
  const activityTypes = [
    {
      id: 1,
      label: "Sieste",
      bdd: "Siestes",
      icon: Bed,
      count: journee?.Siestes?.length || 0,
    },
    {
      id: 2,
      label: "Repas",
      bdd: "Repas",
      icon: Utensils,
      count: journee?.Repas?.length || 0,
    },
    {
      id: 3,
      label: "Activités",
      bdd: "Activites",
      icon: Shapes,
      count: journee?.Activites?.length || 0,
    },
    {
      id: 4,
      label: "Changes",
      bdd: "Changes",
      icon: Shirt,
      count: journee?.Changes?.length || 0,
    },
    {
      id: 5,
      label: "Santé",
      bdd: "Sante",
      icon: HeartPlus,
      count: journee?.Sante?.length || 0,
    },
  ];

  // const notesNounou = [
  //   { type: "Infos", note: "Amenez un maillot de bain pour demain" },
  // ];

  const ageInMonths = dayjs().diff(dayjs(child.Birthday), "month");
  const idBabyJournal = child.idBabyJournal;

  useEffect(() => {
    if (!child?.idBabyJournal) return;

    console.log("ID bbj début fetch", idBabyJournal);
    fetch(
      `${process.env.EXPO_PUBLIC_URL_BACKEND}/enfants/journee/${idBabyJournal}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "fetch enfant journée");
        if (data.data === null) setJournee({});
        if (data.data) {
          setJournee(data.data);
        }
      });
  }, [idBabyJournal]);

  if (selectedActivity) {
    return (
      <ItemDetail
        activityTypes={selectedActivity}
        child={child}
        journee={journee}
        OnBack={() => setSelectedActivity(null)}
      />
    );
  }

  const activities = activityTypes.map((data, i) => {
    let IconComponent = data.icon;
    return (
      <Pressable
        key={data.id}
        onPress={() => setSelectedActivity(data)}
        className={`flex-row ${i % 2 === 0 ? "bg-vert" : "bg-ter"} items-center py-8 px-8 rounded-3xl shadow-sm elevation-3`}
      >
        <View className="w-12 items-start">
          <IconComponent size={40} color={i % 2 === 0 ? "black" : "white"} />
        </View>

        <View className="flex-1 items-center">
          <Text
            className={` ${i % 2 === 0 ? "text-black" : "text-white"} text-2xl`}
          >
            {data.label}
          </Text>
        </View>

        <View className="w-12 items-end">
          <Text
            className={`${i % 2 === 0 ? "text-black" : "text-white"} text-2xl`}
          >
            {data.count}
          </Text>
        </View>
      </Pressable>
    );
  });

  return (
    <View className="flex-1">
      {!add && !infos && (
        <>
          <View className="flex-row items-center justify-between mr-4">
            <Pressable>
              <ButtonRetour onPress={OnBack} />
            </Pressable>
            <Pressable>
              <Send />
            </Pressable>
          </View>
          <Pressable
            className="flex-row items-center justify-center"
            onPress={() => setInfos(true)}
          >
            {photo ? (
              <Image
                source={{ uri: photo }}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <View className="items-center  border-4  border-jaune rounded-full ">
                <Baby color="gray" size={75} />
              </View>
            )}
          </Pressable>
          <Text className=" pt-2 pb-2 text-center text-black text-4xl font-bold">
            {child.Prenom}
          </Text>
          <Text className="text-center italic pb-4">{ageInMonths} mois</Text>
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
        </>
      )}
      {infos && (
        <>
          <View className="flex-row justify-between">
            <ButtonRetour onPress={() => setInfos(false)} />
            <View className="h-10 w-24">
              <Button
                title="Modifier"
                variant="outlineJaune"
                onPress={() => {
                  setInfos(false);
                  setAdd(true);
                }}
              />
            </View>
          </View>

          <InfosChild infos={child} />
        </>
      )}
      {add && (
        <>
          <ButtonRetour
            onPress={() => {
              setAdd(false);
              setInfos(true);
            }}
          />
          <AddChild infos={child} setAdd={setAdd} />
        </>
      )}
    </View>
  );
}
