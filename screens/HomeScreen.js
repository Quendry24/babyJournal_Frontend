import { Text, View, ScrollView, TextInput, Pressable } from "react-native";
import { useState } from "react";
import ProChild from "../components/ProChild";
import ProHome from "../components/ProHome";
import ParentsHome from "../components/ParentsHome";
import ChildJournee from "../components/ChildJournee";

export default function HomeScreen({ user }) {
  const [child, setChild] = useState("");
  const [selectedChild, setSelectedChild] = useState(null);

  const setChildName = (name) => {
    setChild(name);
  };

  return (
    <View className="flex-1  p-4 pt-16 bg-back">
      {user === "Pro" && (
        <View className="flex-1 gap-4">
          {child === "" && <ProHome setChildName={setChildName} />}
          {child !== "" && (
            <ProChild childName={child} setChildName={setChildName} />
          )}
        </View>
      )}
      {user === "Parents" && (
        <View className="flex-1 ">
          {selectedChild ? (
            <ChildJournee
              child={selectedChild}
              OnBack={() => setSelectedChild(null)}
            />
          ) : (
            <ParentsHome onSelectChild={setSelectedChild} />
          )}
        </View>
      )}
    </View>
  );
}
