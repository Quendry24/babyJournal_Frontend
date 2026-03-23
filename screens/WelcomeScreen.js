import { Pressable, Text, View, Image } from "react-native";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setUserType } from "../reducers/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function WelcomeScreen({ navigation }) {
  // AsyncStorage.clear();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.user.value.login);
  const user = useSelector((state) => state.user.value.type);
  console.log(login?.userId, user);

  useEffect(() => {
    if (user && login?.userId) {
      navigation.navigate("TabNavigator");
    }
  }, []);

  console.log(useSelector((state) => state.user.value));

  return (
    <View className="flex-1 pt-16 p-4 bg-back">
      <Text className=" text-3xl text-center font-bold mb-16">
        Baby Journal
      </Text>
      <View className="">
        <Text className="text-2xl text-center">
          Bienvenue dans votre carnet de transmission digital
        </Text>
      </View>

      <View className="items-center justify-center mt-24 mb-16">
        <Image
          source={require("../assets/nounou-baby-sitter-moderne-tenant-bebe-jouant-enfants-disant-au-revoir-mere-occupee-ca.png")}
          style={{ width: 350, height: 250 }}
        />
      </View>
      <View className="w-80 h-16 self-center mt-8">
        <Button
          title="Je suis parent"
          variant="jaune"
          textSize="lg"
          onPress={() => {
            dispatch(setUserType("parents"));
            navigation.navigate("Login");
          }}
        />
      </View>
      <View className="w-80 h-16 self-center mt-8">
        <Button
          title="Je suis assistante maternelle"
          variant="ter"
          textSize="lg"
          onPress={() => {
            dispatch(setUserType("nounou"));
            navigation.navigate("Login");
          }}
        />
      </View>
    </View>
  );
}
