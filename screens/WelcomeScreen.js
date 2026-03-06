import { Pressable, Text, View } from "react-native";
import Button from "../components/Button";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function WelcomeScreen({ navigation }) {
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

      <View className=" h-64 items-center justify-center my-20">
        <Text>IMAGE</Text>
        {/* Image ici */}
      </View>

      <View className="w-80 h-16 self-center mt-8">
        <Button
          title="Je suis parent"
          variant="jaune"
          textSize="lg"
          onPress={() => navigation.navigate("Login", { role: "parent" })}
        />
      </View>
      <View className="w-80 h-16 self-center mt-8">
        <Button
          title="Je suis assistante maternelle"
          variant="ter"
          textSize="lg"
          onPress={() => navigation.navigate("Login", { role: "nounou" })}
        />
      </View>
      <Pressable
        className="absolute bottom-0 right-0 h-20 p-4 border bg-back"
        onPress={() => navigation.navigate("TabNavigator", { user: "Pro" })}
      >
        <Text className=" text-3xl pb-4">Pro</Text>
      </Pressable>
      <Pressable
        className="absolute bottom-0 h-20 p-4 border bg-back"
        onPress={() => navigation.navigate("TabNavigator", { user: "Parents" })}
      >
        <Text className="text-3xl pb-4">Parents</Text>
      </Pressable>
    </View>
  );
}
