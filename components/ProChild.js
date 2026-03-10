import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ButtonRetour from "./ButtonRetour";
import Button from "./Button";
import { Send } from "lucide-react-native";
import { useEffect, useState } from "react";
import ProChildInfos from "./ProChildInfos";
import ProChildRepas from "./ProChildRepas";
import ProChildSieste from "./ProChildSieste";
import ProChildChanges from "./ProChildChanges";
import ProChildSante from "./ProChildSante";
import ProChildActivites from "./ProChildActivites";
import ProChildNotes from "./ProChildNotes";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
export default function ProChild({
  childName,
  setChildName,
  childId,
  setChildId,
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const todayChilds = useSelector((state) => state.user.value.today);
  const [childInfo, setChildInfo] = useState({});
  const items = [
    "Repas",
    "Siestes",
    "Changes",
    "Santé",
    "Activités",
    "Notes Nounou",
  ];

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_URL_BACKEND}/enfants/${childId}`)
      .then((res) => res.json())
      .then((data) => {
        setChildInfo(data.data);
      });
  }, []);

  return (
    <View className="flex-1 mb-36">
      <View className="w-full flex-row items-center  justify-between">
        <ButtonRetour variant="ter" onPress={() => setChildName("")} />
        <Send color="gray" />
      </View>
      <View className="mb-4">
        <Text className="text-center text-3xl font-bold">{childName}</Text>
        <Text className="text-center text-lg">
          {dayjs(childInfo.Birthday).format("DD/MM/YYYY")} -{" "}
          {dayjs().diff(dayjs(childInfo.Birthday), "month")} mois
        </Text>
      </View>
      <View className="w-full flex-row flex-wrap justify-center pb-4 ">
        {items.map((data, i) => (
          <View className="w-1/3 h-24 p-2 " key={i}>
            <Button
              variant={selectedItem === data ? "outlineTer" : "ter"}
              title={data}
              onPress={() =>
                setSelectedItem(selectedItem === data ? null : data)
              }
            />
          </View>
        ))}
      </View>
      {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
      <View className="flex-1">
        {selectedItem === null && <ProChildInfos />}
        {selectedItem === "Repas" && <ProChildRepas childInfo={childInfo} />}
        {selectedItem === "Siestes" && <ProChildSieste childInfo={childInfo} />}
        {selectedItem === "Changes" && (
          <ProChildChanges childInfo={childInfo} />
        )}
        {selectedItem === "Santé" && <ProChildSante childInfo={childInfo} />}
        {selectedItem === "Activités" && (
          <ProChildActivites childInfo={childInfo} />
        )}
        {selectedItem === "Notes Nounou" && (
          <ProChildNotes childInfo={childInfo} />
        )}
      </View>
      {/* </TouchableWithoutFeedback> */}
    </View>
  );
}
