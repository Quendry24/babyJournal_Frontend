import { Pressable, Text, View, Image } from "react-native";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { setUserType } from "../reducers/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WelcomeScreen({ navigation }) {
  // AsyncStorage.clear();
  const dispatch = useDispatch();
  return (
    <View className="flex-1 pt-16 px-8 bg-back">
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

      {/* bouton provisoire pour type user */}
      <Pressable
        className="absolute bottom-0 right-0 h-20 p-4 border bg-back"
        onPress={() => {
          dispatch(setUserType("Pro"));
          navigation.navigate("TabNavigator");
        }}
      >
        <Text className=" text-3xl pb-4">Pro</Text>
      </Pressable>
      <Pressable
        className="absolute bottom-0 h-20 p-4 border bg-back"
        onPress={() => {
          dispatch(setUserType("Parents"));
          navigation.navigate("TabNavigator");
        }}
      >
        <Text className="text-3xl pb-4">Parents</Text>
      </Pressable>
    </View>
  );
}
