import { useEffect, useState } from "react";
import ProChild from "../components/ProChild";
import { Text, View, ScrollView, Pressable, TextInput } from "react-native";
import ProHome from "../components/ProHome";
import ParentsHome from "../components/ParentsHome";
import ChildJournee from "../components/ChildJournee";
import { useDispatch, useSelector } from "react-redux";
import { addUserId, setIdFamille } from "../reducers/user";

export default function HomeScreen() {
  const [child, setChild] = useState("");
  const [childId, setChildId] = useState("");
  const [selectedChild, setSelectedChild] = useState(null);
  const user = useSelector((state) => state.user.value.type);
  const userId = useSelector((state) => state.user.value.userId);
  const dispatch = useDispatch();
  console.log("type: ", user, "id: ", userId);
  const setChildName = (name) => {
    setChild(name);
  };

  // const idNounou = "123456"; // viendra de la connexion
  // const idFamille = "123";

  // useEffect(() => {
  //   //fetch pour idNounou ou idparents => idparent => idFamille =>idfamille =>Enfants
  //   dispatch(addUserId(idNounou));
  //   dispatch(setIdFamille(idFamille));
  // }, []);

  return (
    <View className="flex-1 p-4 pt-16 bg-back">
      {user === "nounou" && (
        <View className="flex-1 gap-4">
          {child === "" && (
            <ProHome
              setChildName={setChildName}
              childId={childId}
              setChildId={setChildId}
            />
          )}
          {child !== "" && (
            <ProChild
              childName={child}
              setChildName={setChildName}
              childId={childId}
            />
          )}
        </View>
      )}
      {user === "parents" && (
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
