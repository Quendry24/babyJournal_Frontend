import { View } from "react-native";
import ProCalendar from "../components/ProCalendar";
export default function CalendarScreen() {
  return (
    <View className="flex-1 p-4 pt-16 bg-back ">
      <ProCalendar />
    </View>
  );
}
