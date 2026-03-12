import { View, Text, Pressable } from "react-native";
import ButtonRetour from "../components/ButtonRetour";
import { useSelector, useDispatch } from "react-redux";
import AddChild from "../components/AddChild";
import { Logout, setUserType } from "../reducers/user";
import Button from "../components/Button";

export default function SettingsScreen({ OnBack }) {
  const user = useSelector((state) => state.user.value.type);
  const idNounou = useSelector((state) => state.user.value.idUser);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setUserType(null));
    navigation.navigate("Login");
  };

  return (
    <View className="flex-1 bg-back p-4 pt-16">
      <View className="w-60 h-16 self-center mt-8">
        <Button
          title="Se déconnecter"
          variant="jaune"
          textSize="lg"
          onPress={handleLogout}
        />
      </View>
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
