import { useEffect, useState } from "react";
import ProChild from "../components/ProChild";
import { Text, View, ScrollView, Pressable, TextInput } from "react-native";
import ProHome from "../components/ProHome";
import ParentsHome from "../components/ParentsHome";
import ChildJournee from "../components/ChildJournee";
import { useDispatch, useSelector } from "react-redux";
import { addUserId } from "../reducers/user";

export default function HomeScreen() {
  const [child, setChild] = useState("");
  const [selectedChild, setSelectedChild] = useState(null);
  const user = useSelector((state) => state.user.value.type);
  const dispatch = useDispatch();
  console.log(user);
  const setChildName = (name) => {
    setChild(name);
  };
  const idNounou = "1234"; // viendra de la connexion

  useEffect(() => {
    dispatch(addUserId(idNounou));
  }, []);

  console.log(idNounou);
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
