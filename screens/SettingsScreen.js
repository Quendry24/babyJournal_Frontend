import { View, Text, Pressable } from "react-native";
import ButtonRetour from "../components/ButtonRetour";
import { useSelector } from "react-redux";
import AddChild from "../components/AddChild";

export default function SettingsScreen({ OnBack }) {
  const user = useSelector((state) => state.user.value.type);
  const idNounou = useSelector((state) => state.user.value.idUser);

  return (
    <View className="flex-1 bg-back p-4 pt-16">
      {user === "Parents" && (
        <View className="flex-1">
          {/* <Pressable className="">
            <ButtonRetour onPress={OnBack} />
          </Pressable> */}
          <View className="flex-1 bg-back items-center ">
            <Text className="pt-4 pb-2 text-center text-black text-4xl font-bold">
              Paramètres
            </Text>
            <Pressable>
              <Text>Partager mon Baby Journal</Text>
              <AddChild />
            </Pressable>
          </View>
        </View>
      )}

      {user === "Pro" && (
        <View className="flex-1">
          {/* <Pressable className="py-4">
            <ButtonRetour onPress={OnBack} />
          </Pressable> */}
          <AddChild />
        </View>
      )}
    </View>
  );
}
