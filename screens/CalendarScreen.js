import { Text, View } from "react-native";
import ProCalendar from "../components/ProCalendar";
import ParentsCalendar from "../components/ParentsCalendar";
import { useSelector } from "react-redux";
export default function CalendarScreen() {
  const user = useSelector((state) => state.user.value.type);

  return (
    <View className="flex-1 p-4 pt-16 bg-back ">
      {user === "Parents" && (
        <View className="flex-1">
          <ParentsCalendar />
        </View>
      )}
      {user === "Pro" && (
        <View className="flex-1">
          <ProCalendar />
        </View>
      )}
    </View>
  );
}
