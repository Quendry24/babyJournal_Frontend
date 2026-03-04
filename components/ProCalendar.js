import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function ProCalendar() {
  const [offset, setOffset] = useState(0);
  const [weekDays, setWeekDays] = useState([null]);

  const getWeekDay = () => {
    const today = new Date();

    const day = today.getDay();
    const diffToMonday = (day + 6) % 7;

    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMonday + offset * 7);

    for (let i = 0; i < 7; i++) {
      let newDay = new Date(monday);
      newDay.setDate(newDay.getDate() + i);
      setWeekDays([...weekDays], newDay.toISOString().split("T")[0]);
    }
  };

  return (
    <View className="flex-1">
      <Text>Calendar</Text>
      <Text>{weekDays}</Text>
      <Pressable
        className="h-20 w-20 bg-jaune"
        onPress={() => getWeekDay()}
      ></Pressable>
    </View>
  );
}
