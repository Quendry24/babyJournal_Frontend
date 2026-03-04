import ProHome from "../components/ProHome";
import { useState } from "react";
import ProChild from "../components/ProChild";
import { Text, View, ScrollView, Pressable } from "react-native";
import { Send } from "lucide-react-native";
import ParentsHome from "../components/ParentsHome";
import ChildJournee from "../components/ChildJournee";

export default function HomeScreen() {
  const [child, setChild] = useState("");
  const [selectedChild, setSelectedChild] = useState(null);

  const setChildName = (name) => {
    setChild(name);
  };

  return (
    <>
      <View className="flex-1 p-4 pt-16 bg-back gap-4">
        {child === "" && <ProHome setChildName={setChildName} />}
        {child !== "" && (
          <ProChild childName={child} setChildName={setChildName} />
        )}
      </View>
      {/* <View className="flex-1 p-4 bg-back">
        {selectedChild ? (
          <ChildJournee
            child={selectedChild}
            OnBack={() => setSelectedChild(null)}
          />
        ) : (
          <ParentsHome onSelectChild={setSelectedChild} />
        )}
      </View> */}
    </>
  );
}
