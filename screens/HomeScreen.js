import { Text, View, ScrollView } from "react-native";
import ChildCard from "../components/ChildCard";
import ProHome from "../components/ProHome";
import ItemDetailCard from "../components/ItemDetailCard";
import { useState } from "react";
import ProChild from "../components/ProChild";

export default function HomeScreen() {
  const [child, setChild] = useState("");

  const setChildName = (name) => {
    setChild(name);
  };

  return (
    <View className="flex-1 p-4 pt-16 bg-back gap-4">
      {/* <ChildCard /> */}
      {/* <ItemDetailcard /> */}
      {child === "" && <ProHome setChildName={setChildName} />}
      {child !== "" && <ProChild childName={child} />}
    </View>
  );
}
