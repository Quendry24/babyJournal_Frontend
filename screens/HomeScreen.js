import { Text, View, ScrollView, TextInput, SafeAreaView } from "react-native";
import ProHome from "../components/ProHome";
import { useState } from "react";
import ProChild from "../components/ProChild";

export default function HomeScreen() {
  const [child, setChild] = useState("");

  const setChildName = (name) => {
    setChild(name);
  };

  return (
    <View className="flex-1 p-4 pt-16 bg-back gap-4">
      {child === "" && <ProHome setChildName={setChildName} />}
      {child !== "" && (
        <ProChild childName={child} setChildName={setChildName} />
      )}
    </View>
  );
}
