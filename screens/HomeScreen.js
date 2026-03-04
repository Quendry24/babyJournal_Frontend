import { Text, View, ScrollView, TextInput, Pressable } from "react-native";
import ChildCard from "../components/ChildCard";
import Button from "../components/Button";
import ButtonAdd from "../components/ButtonAdd";
import ButtonRetour from "../components/ButtonRetour";
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
    <View className="flex-1">
      {user === "Pro" && (
        <View className="flex-1 p-4 pt-16 bg-back gap-4">
          {child === "" && <ProHome setChildName={setChildName} />}
          {child !== "" && (
            <ProChild childName={child} setChildName={setChildName} />
          )}
        </View>
      )}
      {user === "Parents" && (
        <View className="flex-1 p-4 bg-back">
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
