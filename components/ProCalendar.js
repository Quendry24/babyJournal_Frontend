import { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Baby } from "lucide-react-native";
import Button from "./Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

export default function ProCalendar() {
  const [offset, setOffset] = useState(0);
  const [weekDays, setWeekDays] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [myWeek, setMyWeek] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    let semaine = [];
    const today = new Date();
    const day = today.getDay();
    const diffToMonday = (day + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMonday + offset * 7);
    for (let i = 0; i < 3; i++) {
      let newDay = new Date(monday);
      newDay.setDate(newDay.getDate() + i);
      semaine.push(newDay.toLocaleDateString("fr-FR", options));
    }
    setWeekDays(semaine);
  }, [offset]);

  const todayChild = [
    { name: "Léa", arrival: "7h00", photo: "Baby" },
    { name: "Timothée", arrival: "8h00", photo: "Baby" },
    { name: "Martin", arrival: "9h30", photo: "Baby" },
    { name: "Constance", arrival: "7h00", photo: "Baby" },
  ];

  const allChild = [
    { name: "Léa", photo: "Baby" },
    { name: "Timothée", photo: "Baby" },
    { name: "Martin", photo: "Baby" },
    { name: "Constance", photo: "Baby" },
    { name: "Yves", photo: "Baby" },
    { name: "Vincent", photo: "Baby" },
  ];
  console.log(weekDays);
  console.log(myWeek);

  const childsProfil = todayChild.map((data, i) => (
    <Pressable
      key={i}
      className="items-center"
      onPress={() => {
        setModalVisible(true);
        console.log(data.name, i);
      }}
    >
      <View className="border-4 border-jaune rounded-full">
        <Baby color="gray" size={48} />
      </View>
      <Text className="text-xl">{data.name}</Text>
      <Text className="text-sm">{data.arrival}</Text>
    </Pressable>
  ));

  return (
    <View className="flex-1">
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 items-center justify-center ">
          <View className="bg-white p-10 rounded-3xl w-2/3 justify-center gap-2 items-center">
            <Picker
              style={{
                borderWidth: 1,
                height: Platform.OS === "ios" ? 100 : 50,
                width: "100%",
                overflow: "hidden",
                justifyContent: "center",
                borderRadius: 16,
              }}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
            >
              {allChild.map((data, i) => (
                <Picker.Item key={i} label={data.name} value={data.name} />
              ))}
            </Picker>
            <RNDateTimePicker mode="time" value={new Date()} />
            <Pressable
              className="p-4 bg-jaune"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View className="flex-row justify-between items-center py-4">
        <View className="w-10 aspect-square">
          <Button title="<" onPress={() => setOffset(offset - 1)} />
        </View>
        <Text className="text-2xl">Semaine 7 - 2026</Text>
        <View className="w-10">
          <Button title=">" onPress={() => setOffset(offset + 1)} />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 125,
          paddingTop: 16,
          backgroundColor: "white",
          borderRadius: 16,
        }}
      >
        {weekDays.map((data, i) => (
          <View key={i} className="w-full">
            <View className="border border-jaune rounded-full relative"></View>
            <Text className="text-xl absolute top-0 -translate-y-1/2 text-jaune font-bold self-center bg-white px-2">
              {data}
            </Text>
            <View className="flex-row w-full justify-around py-4 ">
              {childsProfil}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
